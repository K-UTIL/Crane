define(["require", "exports", "./TowerRange.js", "layer", "./util/MathEquation.js"], function (require, exports, TowerRange_js_1, layer, MathEquation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var MapEntity = /** @class */ (function () {
        function MapEntity(center, container, test) {
            if (test === void 0) {
                test = false;
            }
            //map中原始的多边形
            this._prohibitedPolygonMap = [];
            this._constructorPolygonMap = [];
            this._towerRanges = [];
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

        MapEntity.prototype.initDrawingManager = function () {
            var mapEntity = this;
            var styleOptions1 = {
                strokeColor: "red",
                fillColor: "red",
                strokeWeight: 3,
                strokeOpacity: 0.8,
                fillOpacity: 0.6,
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            };
            //实例化鼠标绘制工具
            this.prohibitedDrawingManager = new BMapLib.DrawingManager(this.map, {
                isOpen: false,
                enableDrawingTool: false,
                // circleOptions: styleOptions, //圆的样式
                // polylineOptions: styleOptions, //线的样式
                polygonOptions: styleOptions1,
            });
            var styleOptions2 = {
                strokeColor: "blue",
                fillColor: "blue",
                strokeWeight: 3,
                strokeOpacity: 0.8,
                fillOpacity: 0.6,
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            };
            //实例化鼠标绘制工具
            this.ConstructorDrawingManager = new BMapLib.DrawingManager(this.map, {
                isOpen: false,
                enableDrawingTool: false,
                // circleOptions: styleOptions, //圆的样式
                // polylineOptions: styleOptions, //线的样式
                polygonOptions: styleOptions2,
            });
            this._prohibitedDrawingManager.addEventListener('polygoncomplete', function (e, overlay) {
                //保存到缓冲区
                mapEntity.save2ProhibitedArea(e, overlay);
            });
            this._ConstructorDrawingManager.addEventListener('polygoncomplete', function (e, overlay) {
                //保存到缓冲区
                mapEntity.save2ConstructionArea(e, overlay);
            });
        };
        MapEntity.prototype.save2ProhibitedArea = function (e, overlay) {
            console.log("准备添加到禁行区");
            console.log(overlay.getPath());
            // this._prohibitedPolygon.push(overlay.getPath());
            this._prohibitedPolygonMap.push(overlay);
        };
        MapEntity.prototype.save2ConstructionArea = function (e, overlay) {
            console.log("准备添加到施工区");
            console.log(overlay.getPath());
            // this._constructorPolygon.push(overlay.getPath());
            this._constructorPolygonMap.push(overlay);
        };
        MapEntity.parseDom = function (node) {
            var element = document.createElement("div");
            element.innerHTML = node;
            return element.childNodes[0];
        };
        //绘制的控件 可以提取出来
        //好了 现在提取不出来了
        MapEntity.prototype.initDrawingController = function () {
            var mapEntity = this;

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
                            if (value.getBounds().containsPoint(map.point)) {
                                // mapEntity._constructorPolygon.
                                mapEntity._constructorPolygonMap.splice(index);
                                mapEntity.map.removeOverlay(value);
                            }
                        });
                        mapEntity.prohibitedPolygonMap.forEach(function (value, index) {
                            if (value.getBounds().containsPoint(map.point)) {
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
            var alownController1 = new alownController();
            this.map.addControl(alownController1);
        };
        //初始化测试模式
        MapEntity.prototype.initTest = function () {
            //测试按钮
            this.initTestControl();
            //点击地图打印坐标点位
            this.map.addEventListener("click", function (type) {
                console.log(type);
                console.log({
                    lat: type.point.lat / TowerRange_js_1.TowerRange.latRate,
                    lng: type.point.lng / TowerRange_js_1.TowerRange.lngRate
                });
            });
        };
        MapEntity.prototype.initTestControl = function (func) {
            var mapEntity = this;
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
            var testController1 = new testController();
            mapEntity.map.addControl(testController1);
        };
        MapEntity.prototype.print = function () {
            console.log(this.prohibitedPolygonMap);
            console.log(this.constructorPolygonMap);
            for (var _i = 0, _a = this.towerRanges; _i < _a.length; _i++) {
                var towerRange = _a[_i];
                towerRange.parse(this.prohibitedPolygonMap, this.constructorPolygonMap);
                console.log(towerRange.prohibitedArea);
                console.log(towerRange.constructionArea);
                window.top.pro = towerRange.prohibitedArea;
                window.top.con = towerRange.constructionArea;
                window.top.mathCircle = new MathEquation_js_1.MathCircle(towerRange.range, new MathEquation_js_1.MathPointDicard(0, 0));
                window.top.mathPolygon = [];
                for (var _b = 0, _c = this.prohibitedPolygonMap; _b < _c.length; _b++) {
                    var proMap = _c[_b];
                    var mathPoints = [];
                    for (var _d = 0, _e = proMap.getPath(); _d < _e.length; _d++) {
                        var point = _e[_d];
                        var point1 = new MathEquation_js_1.MathPointDicard((point.lng - towerRange.center.lng) / TowerRange_js_1.TowerRange.lngRate, (point.lat - towerRange.center.lat) / TowerRange_js_1.TowerRange.latRate);
                        mathPoints.push(point1);
                    }
                    window.top.mathPolygon.push(new MathEquation_js_1.MathPolygon(mathPoints));
                }
                for (var _f = 0, _g = this.constructorPolygonMap; _f < _g.length; _f++) {
                    var conMap = _g[_f];
                    var mathPoints = [];
                    for (var _h = 0, _j = conMap.getPath(); _h < _j.length; _h++) {
                        var point = _j[_h];
                        var point1 = new MathEquation_js_1.MathPointDicard((point.lng - towerRange.center.lng) / TowerRange_js_1.TowerRange.lngRate, (point.lat - towerRange.center.lat) / TowerRange_js_1.TowerRange.latRate);
                        mathPoints.push(point1);
                    }
                    window.top.mathPolygon.push(new MathEquation_js_1.MathPolygon(mathPoints));
                }
                //作为演示 只展示一个
                layer.open({
                    type: 2,
                    content: '/CraneManager/html/canvas.html',
                    area: ['800px', '800px']
                });
            }
        };
        Object.defineProperty(MapEntity.prototype, "map", {
            get: function () {
                return this._map;
            },
            set: function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntity.prototype, "prohibitedDrawingManager", {
            get: function () {
                return this._prohibitedDrawingManager;
            },
            set: function (value) {
                this._prohibitedDrawingManager = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntity.prototype, "ConstructorDrawingManager", {
            get: function () {
                return this._ConstructorDrawingManager;
            },
            set: function (value) {
                this._ConstructorDrawingManager = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntity.prototype, "prohibitedPolygonMap", {
            get: function () {
                return this._prohibitedPolygonMap;
            },
            set: function (value) {
                this._prohibitedPolygonMap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntity.prototype, "constructorPolygonMap", {
            get: function () {
                return this._constructorPolygonMap;
            },
            set: function (value) {
                this._constructorPolygonMap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntity.prototype, "towerRanges", {
            get: function () {
                return this._towerRanges;
            },
            set: function (value) {
                this._towerRanges = value;
            },
            enumerable: true,
            configurable: true
        });
        MapEntity.controlNode = "<div style=\"border: 1px solid gray;background: #96bbe9;cursor: pointer\">\n                                    <button id=\"JXBtn\">\u7981\u884C\u533A\u57DF\u7ED8\u5236</button>\n                                    <button id=\"SGBtn\">\u65BD\u5DE5\u533A\u57DF\u7ED8\u5236</button>\n                                    <button id=\"ClearBtn\">\u6E05\u9664\u533A\u57DF</button>\n                                </div>";
        MapEntity.TestControlNode = "<div style=\"border: 1px solid gray;background: #96bbe9;cursor: pointer\">\n                                    <button id=\"testControl\">\u6D4B\u8BD5\u6309\u94AE</button>\n                                </div>";
        return MapEntity;
    }());
    exports.MapEntity = MapEntity;
    var MapMode;
    (function (MapMode) {
        MapMode[MapMode["CLEAR"] = 0] = "CLEAR";
        MapMode[MapMode["DRAWING_PROHIBITE"] = 1] = "DRAWING_PROHIBITE";
        MapMode[MapMode["DRAWING_CONTRUCTOR"] = 2] = "DRAWING_CONTRUCTOR";
        MapMode[MapMode["NULL"] = 3] = "NULL";
    })(MapMode || (MapMode = {}));
});
//# sourceMappingURL=MapEntity.js.map