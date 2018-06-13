define(["require", "exports", "./Constant.js", "./util/MathEquation.js"], function (require, exports, Constant_js_1, MathEquation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    /**
     * 基本类 每个塔机的基本属性
     */
    var TowerRange = /** @class */ (function () {
        function TowerRange(center, range) {
            //三大区域
            this._prohibitedArea = [];
            this._constructionArea = [];
            this._queueArea = [];
            this._center = center;
            this._range = range;
        }

        /**
         * 将工地禁行、施工区域转换为塔机的属性
         * @param {any[]} prohibitedAreas BaiduMap的原生polygon
         * @param {any[]} constructionAreaS BaiduMap的原生polygon
         */
        TowerRange.prototype.parse = function (prohibitedAreas, constructionAreaS) {
            //转换
            for (var _i = 0, prohibitedAreas_1 = prohibitedAreas; _i < prohibitedAreas_1.length; _i++) {
                var polygon = prohibitedAreas_1[_i];
                var rangeShips = this.parsePolygon2Area(polygon);
                for (var _a = 0, rangeShips_1 = rangeShips; _a < rangeShips_1.length; _a++) {
                    var area = rangeShips_1[_a];
                    this._constructionArea.push(area);
                }
            }
            for (var _b = 0, constructionAreaS_1 = constructionAreaS; _b < constructionAreaS_1.length; _b++) {
                var polygon = constructionAreaS_1[_b];
                var rangeShips = this.parsePolygon2Area(polygon);
                for (var _c = 0, rangeShips_2 = rangeShips; _c < rangeShips_2.length; _c++) {
                    var area = rangeShips_2[_c];
                    this._prohibitedArea.push(area);
                }
            }
        };
        /**
         * 将一个多边形转换成扇环区域
         * @beta 忽略内凹的情况
         * @param {Polygon} polygon
         * @returns {RangeShip[]}
         */
        TowerRange.prototype.parsePolygon2Area = function (polygon) {
            var log = [];
            var mathPolygon;
            var mathPoints = [];
            var path = polygon.getPath();
            var rangeShips = [];
            var mathCircle = new MathEquation_js_1.MathCircle(this.range, new MathEquation_js_1.MathPointDicard(this.center.lng / TowerRange.lngRate, this.center.lat / TowerRange.latRate));
            var sectors = [];
            for (var i = 0; i < TowerRange.accuracy; i++) {
                var startAngle = 2 * Math.PI * (i / TowerRange.accuracy);
                var endAngle = 2 * Math.PI * ((i + 1) / TowerRange.accuracy);
                sectors.push(new MathEquation_js_1.MathSector(mathCircle, startAngle, endAngle));
            }
            //将多边形坐标转换成米
            for (var i = 0; i < path.length; i++) {
                var point1 = new MathEquation_js_1.MathPointDicard(path[i].lng / TowerRange.lngRate, path[i].lat / TowerRange.latRate);
                mathPoints.push(point1);
            }
            mathPolygon = new MathEquation_js_1.MathPolygon(mathPoints);
            //四种形式 相交/包含/被包含/无关
            for (var _i = 0, sectors_1 = sectors; _i < sectors_1.length; _i++) {
                var sector = sectors_1[_i];
                //扇形内的多边形顶点
                var isIntersect = false;
                var intersectPoints = [];
                for (var _a = 0, _b = mathPolygon.segments; _a < _b.length; _a++) {
                    var segment = _b[_a];
                    if (sector.intersectWithSegment(segment)) {
                        //一条有交点
                        isIntersect = true;
                        for (var _c = 0, _d = mathPolygon.points; _c < _d.length; _c++) {
                            var point = _d[_c];
                            if (sector.containsPoint(point))
                                intersectPoints.push(point);
                        }
                        //加入扇形与多边形的交点(这里是线段)
                        for (var _e = 0, _f = sector.getPointsIntersectWithSegment(segment); _e < _f.length; _e++) {
                            var point = _f[_e];
                            intersectPoints.push(point);
                        }
                    }
                }
                if (isIntersect) {
                    // 如果多边形包含扇形三个顶点 则加入
                    var sectorPoint1 = new MathEquation_js_1.MathPointDicard(Math.cos(sector.startAngle) * sector.circle.r + sector.circle.center.x, Math.sin(sector.startAngle) * sector.circle.r + sector.circle.center.y);
                    var sectorPoint2 = new MathEquation_js_1.MathPointDicard(Math.cos(sector.endAndle) * sector.circle.r + sector.circle.center.x, Math.sin(sector.endAndle) * sector.circle.r + sector.circle.center.y);
                    if (mathPolygon.containPoint(sectorPoint1))
                        intersectPoints.push(sectorPoint1);
                    if (mathPolygon.containPoint(sectorPoint2))
                        intersectPoints.push(sectorPoint2);
                    if (mathPolygon.containPoint(sector.circle.center))
                        intersectPoints.push(sector.circle.center);
                    try { //TODO 查明相交但为空的原因
                        //相交了 此时计算要加上交点
                        var minRange = intersectPoints[0].getRangeWithAnother(sector.circle.center);
                        var maxRange = intersectPoints[0].getRangeWithAnother(sector.circle.center);
                        //取最远点和最近点
                        for (var _g = 0, intersectPoints_1 = intersectPoints; _g < intersectPoints_1.length; _g++) {
                            var point = intersectPoints_1[_g];
                            var rangeWithAnother = point.getRangeWithAnother(sector.circle.center);
                            if (maxRange < rangeWithAnother)
                                maxRange = rangeWithAnother;
                            if (minRange > rangeWithAnother)
                                minRange = rangeWithAnother;
                        }
                        rangeShips.push(new RangeShip(minRange, maxRange, sector.startAngle, sector.endAndle));
                        log.push('相交');
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else {
                    //判断包含和被包含
                    if (sector.containsPoint(mathPolygon.segments[0].point1)) {
                        //扇形包含了多边形 此时取多边形的最远与最近点
                        var fastestRange = mathPolygon.getFarthestRange(sector.circle.center);
                        var nearestRange = mathPolygon.getNearestRange(sector.circle.center);
                        rangeShips.push(new RangeShip(nearestRange, fastestRange, sector.startAngle, sector.endAndle));
                        log.push('扇形包含多边形');
                    }
                    else if (mathPolygon.containPoint(sector.circle.center)) {
                        //多边形包含了扇形 此时选区整个扇形
                        rangeShips.push(new RangeShip(0, sector.circle.r, sector.startAngle, sector.endAndle));
                        log.push('多边形包含扇形');
                    }
                    else { //无关
                    }
                }
                //重置
                isIntersect = false;
            }
            console.log(log);
            return rangeShips;
        };
        //在地图上显示 并且绑定一堆事件
        TowerRange.prototype.draw2Map = function (map) {
            var newVar = this;
            var icon1 = new BMap.Icon(Constant_js_1.Constant.IMG_TOWER_CRANE, new BMap.Size(this._range, this._range));
            var marker = new BMap.Marker(this._center, {icon: icon1});
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
        };
        TowerRange.prototype.addCircle = function () {
            this.circle = new BMap.Circle(this.center, this.range, {
                fillOpacity: 0,
                strokeColor: "#000000",
                fillColor: "",
                strokeWeight: 2
            });
        };
        /**
         * 画出转换后的扇形
         */
        TowerRange.prototype.drawSector = function () {
        };
        Object.defineProperty(TowerRange.prototype, "center", {
            get: function () {
                return this._center;
            },
            set: function (value) {
                this._center = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "range", {
            get: function () {
                return this._range;
            },
            set: function (value) {
                this._range = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "prohibitedArea", {
            get: function () {
                return this._prohibitedArea;
            },
            set: function (value) {
                this._prohibitedArea = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "constructionArea", {
            get: function () {
                return this._constructionArea;
            },
            set: function (value) {
                this._constructionArea = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "queueArea", {
            get: function () {
                return this._queueArea;
            },
            set: function (value) {
                this._queueArea = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "marker", {
            get: function () {
                return this._marker;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerRange.prototype, "circle", {
            get: function () {
                return this._circle;
            },
            set: function (value) {
                this._circle = value;
            },
            enumerable: true,
            configurable: true
        });
        TowerRange.infoContent = "<div>\n                    <button id=\"prohibitedArea\">\u6DFB\u52A0\u7981\u884C\u533A</button>\n                    <button id =\"constructionArea\">\u6DFB\u52A0\u65BD\u5DE5\u533A</button>\n                </div>";
        //经纬度和米的换算关系，通过circle.getbounds() 计算比例获得
        TowerRange.latRate = 0.00000898221914989487; // 单位 lat/m
        TowerRange.lngRate = 0.00001171122417266209; // 单位 lng/m
        // public static accuracy: number = 24;//360/24=15 15度为单位
        TowerRange.accuracy = 96; //360/24=15 15度为单位
        return TowerRange;
    }());
    exports.TowerRange = TowerRange;
    /**
     * 扇形环的属性
     */
    var RangeShip = /** @class */ (function () {
        function RangeShip(r1, r2, a1, a2) {
            this._r1 = r1;
            this._r2 = r2;
            this._a1 = a1;
            this._a2 = a2;
        }

        Object.defineProperty(RangeShip.prototype, "r1", {
            get: function () {
                return this._r1;
            },
            set: function (value) {
                this._r1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeShip.prototype, "r2", {
            get: function () {
                return this._r2;
            },
            set: function (value) {
                this._r2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeShip.prototype, "a1", {
            get: function () {
                return this._a1;
            },
            set: function (value) {
                this._a1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeShip.prototype, "a2", {
            get: function () {
                return this._a2;
            },
            set: function (value) {
                this._a2 = value;
            },
            enumerable: true,
            configurable: true
        });
        return RangeShip;
    }());
    exports.RangeShip = RangeShip;
    var RANGE_MODE;
    (function (RANGE_MODE) {
        RANGE_MODE[RANGE_MODE["DISPLAY"] = 0] = "DISPLAY";
        RANGE_MODE[RANGE_MODE["HIDDEN"] = 1] = "HIDDEN";
    })(RANGE_MODE || (RANGE_MODE = {}));
});
//# sourceMappingURL=TowerRange.js.map