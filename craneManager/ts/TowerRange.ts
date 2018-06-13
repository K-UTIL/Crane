import * as $ from "jquery";
import * as layer from "layer";
import {Constant} from "./Constant.js";
import {
    MathCircle,
    MathEquation,
    MathEquationHelper,
    MathPointDicard,
    MathPolygon,
    MathSector
} from "./util/MathEquation.js";
import {MapEntity} from "./MapEntity.js";
// import {Polygon} from "BMap";

declare var BMap;
declare var BMAP_DRAWING_POLYGON;


/**
 * 基本类 每个塔机的基本属性
 */
export class TowerRange {
    private static infoContent: string = `<div>
                    <button id="prohibitedArea">添加禁行区</button>
                    <button id ="constructionArea">添加施工区</button>
                </div>`;
    //经纬度和米的换算关系，通过circle.getbounds() 计算比例获得
    public static latRate: number = 0.00000898221914989487;// 单位 lat/m
    public static lngRate: number = 0.00001171122417266209;// 单位 lng/m
    // public static accuracy: number = 24;//360/24=15 15度为单位
    public static accuracy: number = 96;//360/24=15 15度为单位

    // private area:;

    private _center: Point;
    private _range: number;//单位为m

    private _marker: any;//marker对象
    private _circle: any;//范围对象
    private _bounds: any;//范围对象


    //三大区域
    private _prohibitedArea: RangeShip[] = [];
    private _constructionArea: RangeShip[] = [];
    private _queueArea: RangeShip[] = [];

    private rangeMode: RANGE_MODE;

    constructor(center: Point, range: number) {
        this._center = center;
        this._range = range;
    }


    /**
     * 将工地禁行、施工区域转换为塔机的属性
     * @param {any[]} prohibitedAreas BaiduMap的原生polygon
     * @param {any[]} constructionAreaS BaiduMap的原生polygon
     */
    public parse(prohibitedAreas: any[], constructionAreaS: any[]) {

        //转换
        for (let polygon of  prohibitedAreas) {
            let rangeShips = this.parsePolygon2Area(polygon);
            for (let area of rangeShips) {
                this._constructionArea.push(area);
            }
        }

        for (let polygon of constructionAreaS) {
            let rangeShips = this.parsePolygon2Area(polygon);
            for (let area of rangeShips) {
                this._prohibitedArea.push(area);
            }
        }
    }

    /**
     * 将一个多边形转换成扇环区域
     * @beta 忽略内凹的情况
     * @param {Polygon} polygon
     * @returns {RangeShip[]}
     */
    public parsePolygon2Area(polygon: any): RangeShip[] {
        let log: string[] = [];
        let mathPolygon: MathPolygon;
        let mathPoints: MathPointDicard[] = [];

        let path = polygon.getPath();

        let rangeShips: RangeShip[] = [];

        let mathCircle = new MathCircle(this.range, new MathPointDicard(this.center.lng / TowerRange.lngRate, this.center.lat / TowerRange.latRate));

        let sectors: MathSector[] = [];

        for (let i = 0; i < TowerRange.accuracy; i++) {
            let startAngle = 2 * Math.PI * (i / TowerRange.accuracy);
            let endAngle = 2 * Math.PI * ((i + 1) / TowerRange.accuracy);
            sectors.push(new MathSector(mathCircle, startAngle, endAngle));
        }

        //将多边形坐标转换成米
        for (let i = 0; i < path.length; i++) {
            let point1 = new MathPointDicard(path[i].lng / TowerRange.lngRate, path[i].lat / TowerRange.latRate);
            mathPoints.push(point1);
        }

        mathPolygon = new MathPolygon(mathPoints);


        //四种形式 相交/包含/被包含/无关

        for (let sector of sectors) {
            //扇形内的多边形顶点
            let isIntersect = false;
            let intersectPoints: MathPointDicard[] = [];

            for (let segment of mathPolygon.segments) {

                if (sector.intersectWithSegment(segment)) {
                    //一条有交点
                    isIntersect = true;


                    for (let point of mathPolygon.points) {
                        if (sector.containsPoint(point)) intersectPoints.push(point);
                    }
                    //加入扇形与多边形的交点(这里是线段)
                    for (let point of  sector.getPointsIntersectWithSegment(segment)) {
                        intersectPoints.push(point);
                    }

                }
            }


            if (isIntersect) {
                // 如果多边形包含扇形三个顶点 则加入
                let sectorPoint1: MathPointDicard = new MathPointDicard(Math.cos(sector.startAngle) * sector.circle.r + sector.circle.center.x,
                    Math.sin(sector.startAngle) * sector.circle.r + sector.circle.center.y);
                let sectorPoint2: MathPointDicard = new MathPointDicard(Math.cos(sector.endAndle) * sector.circle.r + sector.circle.center.x,
                    Math.sin(sector.endAndle) * sector.circle.r + sector.circle.center.y);
                if (mathPolygon.containPoint(sectorPoint1)) intersectPoints.push(sectorPoint1);
                if (mathPolygon.containPoint(sectorPoint2)) intersectPoints.push(sectorPoint2);
                if (mathPolygon.containPoint(sector.circle.center)) intersectPoints.push(sector.circle.center);

                try {//TODO 查明相交但为空的原因
                    //相交了 此时计算要加上交点
                    let minRange = intersectPoints[0].getRangeWithAnother(sector.circle.center);
                    let maxRange = intersectPoints[0].getRangeWithAnother(sector.circle.center);

                    //取最远点和最近点
                    for (let point of intersectPoints) {
                        let rangeWithAnother = point.getRangeWithAnother(sector.circle.center);
                        if (maxRange < rangeWithAnother) maxRange = rangeWithAnother;
                        if (minRange > rangeWithAnother) minRange = rangeWithAnother;
                    }
                    rangeShips.push(new RangeShip(minRange, maxRange, sector.startAngle, sector.endAndle));
                    log.push('相交');
                } catch (e) {
                    console.error(e);
                }

            } else {
                //判断包含和被包含
                if (sector.containsPoint(mathPolygon.segments[0].point1)) {
                    //扇形包含了多边形 此时取多边形的最远与最近点
                    let fastestRange = mathPolygon.getFarthestRange(sector.circle.center);
                    let nearestRange = mathPolygon.getNearestRange(sector.circle.center);
                    rangeShips.push(new RangeShip(nearestRange, fastestRange, sector.startAngle, sector.endAndle));
                    log.push('扇形包含多边形');
                } else if (mathPolygon.containPoint(sector.circle.center)) {
                    //多边形包含了扇形 此时选区整个扇形
                    rangeShips.push(new RangeShip(0, sector.circle.r, sector.startAngle, sector.endAndle))
                    log.push('多边形包含扇形');
                } else {//无关

                }
            }
            //重置
            isIntersect = false;

        }
        console.log(log);
        return rangeShips;

    }


    //在地图上显示 并且绑定一堆事件
    public draw2Map(map: MapEntity) {
        let newVar = this;
        var icon1 = new BMap.Icon(Constant.IMG_TOWER_CRANE, new BMap.Size(
            this._range, this._range
        ));
        let marker = new BMap.Marker(this._center, {icon: icon1});
        map.map.addOverlay(marker);
        this._marker = marker;
        this.addCircle();
        this.rangeMode = RANGE_MODE.HIDDEN;
        this.marker.addEventListener("dblclick", function (e) {
            switch (newVar.rangeMode) {
                case RANGE_MODE.DISPLAY:
                    newVar.rangeMode = RANGE_MODE.HIDDEN;
                    map.map.removeOverlay(newVar.circle);
                    break;
                case RANGE_MODE.HIDDEN:
                    newVar.rangeMode = RANGE_MODE.DISPLAY;
                    map.map.addOverlay(newVar.circle);
                    newVar._bounds = newVar.circle.getBounds();
                    console.log("lat : " + (newVar._bounds.Ol.lat - newVar._bounds.xl.lat) / newVar._range / 2);
                    console.log("lng : " + (newVar._bounds.Ol.lng - newVar._bounds.xl.lng) / newVar.range / 2);
                    break;
            }
        });
        map.towerRanges.push(this);
        return marker;
    }

    public addCircle() {
        this.circle = new BMap.Circle(this.center, this.range, {
            fillOpacity: 0,
            strokeColor: "#000000",
            fillColor: "",
            strokeWeight: 2
        });

    }

    /**
     * 画出转换后的扇形
     */
    public drawSector() {

    }

    get center(): Point {
        return this._center;
    }

    set center(value: Point) {
        this._center = value;
    }

    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }


    get prohibitedArea(): RangeShip[] {
        return this._prohibitedArea;
    }

    set prohibitedArea(value: RangeShip[]) {
        this._prohibitedArea = value;
    }

    get constructionArea(): RangeShip[] {
        return this._constructionArea;
    }

    set constructionArea(value: RangeShip[]) {
        this._constructionArea = value;
    }

    get queueArea(): RangeShip[] {
        return this._queueArea;
    }

    set queueArea(value: RangeShip[]) {
        this._queueArea = value;
    }

    get marker(): any {
        return this._marker;
    }

    get circle() {
        return this._circle;
    }

    set circle(value) {
        this._circle = value;
    }
}

/**
 * 点 map中的概念
 */
export interface Point {
    lng: number;
    lat: number;
}


/**
 * 扇形环的属性
 */
export class RangeShip {
    private _r1: number;
    private _r2: number;
    private _a1: number;
    private _a2: number;


    constructor(r1: number, r2: number, a1: number, a2: number) {
        this._r1 = r1;
        this._r2 = r2;
        this._a1 = a1;
        this._a2 = a2;
    }

    get r1(): number {
        return this._r1;
    }

    set r1(value: number) {
        this._r1 = value;
    }

    get r2(): number {
        return this._r2;
    }

    set r2(value: number) {
        this._r2 = value;
    }

    get a1(): number {
        return this._a1;
    }

    set a1(value: number) {
        this._a1 = value;
    }

    get a2(): number {
        return this._a2;
    }

    set a2(value: number) {
        this._a2 = value;
    }
}

enum RANGE_MODE {
    DISPLAY, HIDDEN
}
