/**
 * 地图类
 */
import {Point, TowerRange} from "./TowerRange.js";
import * as layer from "layer";
import {MathCircle, MathPointDicard, MathPolygon} from "./util/MathEquation.js";

declare var BMapLib;
declare var BMap;
declare var BMAP_ANCHOR_TOP_LEFT;
declare var BMAP_DRAWING_POLYGON;
declare var BMAP_ANCHOR_TOP_RIGHT;
declare var BMAP_ANCHOR_BOTTOM_RIGHT;

export class MapEntity {
    //Baidu Map 原始实例
    private _map: any;
    //地图绘制工具
    private _prohibitedDrawingManager: any;
    private _ConstructorDrawingManager: any;

    //map中原始的多边形
    private _prohibitedPolygonMap: any[] = [];
    private _constructorPolygonMap: any[] = [];

    private _towerRanges: TowerRange[] = [];

    //状态
    private mode: MapMode;

    constructor(center: Point, container: string, test = false) {
        this.map = new BMap.Map(container);
        this.map.disableDoubleClickZoom();
        this.map.centerAndZoom(center, 19);
        // map.enableScrollWheelZoom(true);
        this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
        this.initDrawingManager();
        this.initDrawingController();
        if (test) {
            this.initTest();
        }
    }

    private initDrawingManager() {
        var mapEntity = this;
        var styleOptions1 = {
            strokeColor: "red",    //边线颜色。
            fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };
        //实例化鼠标绘制工具
        this.prohibitedDrawingManager = new BMapLib.DrawingManager(this.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            // circleOptions: styleOptions, //圆的样式
            // polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions1, //多边形的样式
            // rectangleOptions: styleOptions //矩形的样式
        });

        var styleOptions2 = {
            strokeColor: "blue",    //边线颜色。
            fillColor: "blue",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };
        //实例化鼠标绘制工具
        this.ConstructorDrawingManager = new BMapLib.DrawingManager(this.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            // circleOptions: styleOptions, //圆的样式
            // polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions2, //多边形的样式
            // rectangleOptions: styleOptions //矩形的样式
        });

        this._prohibitedDrawingManager.addEventListener('polygoncomplete', function (e, overlay) {
            //保存到缓冲区
            mapEntity.save2ProhibitedArea(e, overlay);
        });
        this._ConstructorDrawingManager.addEventListener('polygoncomplete', function (e, overlay) {
            //保存到缓冲区
            mapEntity.save2ConstructionArea(e, overlay);
        });
    }

    public save2ProhibitedArea(e, overlay) {
        console.log("准备添加到禁行区");
        console.log(overlay.getPath());
        // this._prohibitedPolygon.push(overlay.getPath());
        this._prohibitedPolygonMap.push(overlay);
    }

    public save2ConstructionArea(e, overlay) {
        console.log("准备添加到施工区");
        console.log(overlay.getPath());
        // this._constructorPolygon.push(overlay.getPath());
        this._constructorPolygonMap.push(overlay);
    }

    private static controlNode = `<div style="border: 1px solid gray;background: #96bbe9;cursor: pointer">
                                    <button id="JXBtn">禁行区域绘制</button>
                                    <button id="SGBtn">施工区域绘制</button>
                                    <button id="ClearBtn">清除区域</button>
                                </div>`;

    private static parseDom(node: string) {
        let element = document.createElement("div");
        element.innerHTML = node;
        return element.childNodes[0];
    }

    //绘制的控件 可以提取出来
    //好了 现在提取不出来了
    private initDrawingController() {
        let mapEntity = this;

        function alownController() {
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(10, 10);
        }

        alownController.prototype = new BMap.Control();
        alownController.prototype.initialize = function (map) {
            var parseDom = MapEntity.parseDom(MapEntity.controlNode);
            map.getContainer().appendChild(parseDom);
            $("#JXBtn").on("click", function () {
                layer.msg("区域选择最后一下请双击完成");
                map.closeInfoWindow();
                mapEntity._prohibitedDrawingManager.open();
                mapEntity._prohibitedDrawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
            });
            $("#SGBtn").on("click", function () {
                layer.msg("区域选择最后一下请双击完成");
                map.closeInfoWindow();
                mapEntity._ConstructorDrawingManager.open();
                mapEntity._ConstructorDrawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
            });
            $("#ClearBtn").on("click", function () {
                layer.msg("请双击要删除的区域");
                mapEntity.mode = MapMode.CLEAR;
            });

            map.addEventListener("dblclick", function (map) {
                if (mapEntity.mode == MapMode.CLEAR) {
                    mapEntity._constructorPolygonMap.forEach(function (value, index) {
                        console.log(111);
                        if ((<any>value).getBounds().containsPoint(map.point)) {
                            // mapEntity._constructorPolygon.
                            mapEntity._constructorPolygonMap.splice(index);
                            mapEntity.map.removeOverlay(value);
                        }
                    });
                    mapEntity.prohibitedPolygonMap.forEach(function (value, index) {
                        if ((<any>value).getBounds().containsPoint(map.point)) {
                            // mapEntity._constructorPolygon.
                            mapEntity.prohibitedPolygonMap.splice(index);
                            mapEntity.map.removeOverlay(value);
                        }
                    });
                }
                mapEntity.mode = MapMode.NULL;
            });
            return parseDom;
        };

        let alownController1 = new alownController();
        this.map.addControl(alownController1);
    }

    //初始化测试模式
    public initTest() {
        //测试按钮
        this.initTestControl();
        //点击地图打印坐标点位
        this.map.addEventListener("click", function (type) {
            console.log(type);
            console.log({
                lat: type.point.lat / TowerRange.latRate,
                lng: type.point.lng / TowerRange.lngRate
            });
        });

    }

    private static TestControlNode = `<div style="border: 1px solid gray;background: #96bbe9;cursor: pointer">
                                    <button id="testControl">测试按钮</button>
                                </div>`;

    private initTestControl(func?: Function) {
        let mapEntity = this;
        func = func ? func : mapEntity.print;

        function testController() {
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(10, 10);
        }

        testController.prototype = new BMap.Control();
        testController.prototype.initialize = function (map) {
            var parseDom = MapEntity.parseDom(MapEntity.TestControlNode);
            map.getContainer().appendChild(parseDom);

            $("#testControl").on("click", function () {
                mapEntity.print();
            });

            return parseDom;
        };

        let testController1 = new testController();
        mapEntity.map.addControl(testController1);

    }


    public print() {
        console.log(this.prohibitedPolygonMap);
        console.log(this.constructorPolygonMap);
        for (let towerRange of this.towerRanges) {
            towerRange.parse(this.prohibitedPolygonMap, this.constructorPolygonMap);
            console.log(towerRange.prohibitedArea);
            console.log(towerRange.constructionArea);

            window.top.pro = towerRange.prohibitedArea;
            window.top.con = towerRange.constructionArea;
            window.top.mathCircle = new MathCircle(towerRange.range, new MathPointDicard(0, 0));

            window.top.mathPolygon = [];
            for (let proMap of this.prohibitedPolygonMap) {
                let mathPoints: MathPointDicard[] = [];
                for (let point of proMap.getPath()) {
                    let point1 = new MathPointDicard((point.lng - towerRange.center.lng) / TowerRange.lngRate, (point.lat - towerRange.center.lat) / TowerRange.latRate);
                    mathPoints.push(point1);
                }
                window.top.mathPolygon.push(new MathPolygon(mathPoints));
            }

            for (let conMap of this.constructorPolygonMap) {
                let mathPoints: MathPointDicard[] = [];
                for (let point of conMap.getPath()) {
                    let point1 = new MathPointDicard((point.lng - towerRange.center.lng) / TowerRange.lngRate, (point.lat - towerRange.center.lat) / TowerRange.latRate);
                    mathPoints.push(point1);
                }
                window.top.mathPolygon.push(new MathPolygon(mathPoints));
            }

            //作为演示 只展示一个
            layer.open({
                type: 2,
                content: '/CraneManager/html/canvas.html',
                area: ['800px', '800px']
            });

        }
    }

    get map(): any {
        return this._map;
    }

    set map(value: any) {
        this._map = value;
    }


    get prohibitedDrawingManager(): any {
        return this._prohibitedDrawingManager;
    }

    set prohibitedDrawingManager(value: any) {
        this._prohibitedDrawingManager = value;
    }

    get ConstructorDrawingManager(): any {
        return this._ConstructorDrawingManager;
    }

    set ConstructorDrawingManager(value: any) {
        this._ConstructorDrawingManager = value;
    }


    get prohibitedPolygonMap(): any[] {
        return this._prohibitedPolygonMap;
    }

    set prohibitedPolygonMap(value: any[]) {
        this._prohibitedPolygonMap = value;
    }

    get constructorPolygonMap(): any[] {
        return this._constructorPolygonMap;
    }

    set constructorPolygonMap(value: any[]) {
        this._constructorPolygonMap = value;
    }


    get towerRanges(): TowerRange[] {
        return this._towerRanges;
    }

    set towerRanges(value: TowerRange[]) {
        this._towerRanges = value;
    }
}

enum MapMode {
    CLEAR,
    DRAWING_PROHIBITE,
    DRAWING_CONTRUCTOR,
    NULL
}