define(["require", "exports", "./MathEquation.js"], function (require, exports, MathEquation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var JsDrawing = /** @class */ (function () {
        function JsDrawing(container) {
            this.center = new MathEquation_js_1.MathPointDicard(100, 100);
            this._color = "#000";
            this.container = container;
            var dom = document.getElementById(container);
            this._drawing = dom.getContext("2d");
            this._drawing.translate(this.center.x * JsDrawing.k, this.center.y * JsDrawing.k);
            // ctx.translate(canvas_width, 0);
            this._drawing.scale(1, -1);
        }

        JsDrawing.prototype.drawingCircleShip = function (rangeShip) {
            this._drawing.beginPath();
            var point1 = new MathEquation_js_1.MathPointDicard(rangeShip.r1 * Math.cos(rangeShip.a1), rangeShip.r1 * Math.sin(rangeShip.a1));
            var point2 = new MathEquation_js_1.MathPointDicard(rangeShip.r2 * Math.cos(rangeShip.a1), rangeShip.r2 * Math.sin(rangeShip.a1));
            var point3 = new MathEquation_js_1.MathPointDicard(rangeShip.r1 * Math.cos(rangeShip.a2), rangeShip.r1 * Math.sin(rangeShip.a2));
            var point4 = new MathEquation_js_1.MathPointDicard(rangeShip.r2 * Math.cos(rangeShip.a2), rangeShip.r2 * Math.sin(rangeShip.a2));
            this._drawing.moveTo(point1.x * JsDrawing.k, point1.y * JsDrawing.k);
            this._drawing.lineTo(point2.x * JsDrawing.k, point2.y * JsDrawing.k);
            this._drawing.stroke();
            this._drawing.closePath();
            this._drawing.beginPath();
            this._drawing.moveTo(point3.x * JsDrawing.k, point3.y * JsDrawing.k);
            this._drawing.lineTo(point4.x * JsDrawing.k, point4.y * JsDrawing.k);
            this._drawing.stroke();
            this._drawing.closePath();
            this._drawing.beginPath();
            this._drawing.arc(0, 0, rangeShip.r1 * JsDrawing.k, rangeShip.a1, rangeShip.a2);
            this._drawing.stroke();
            this._drawing.closePath();
            this._drawing.beginPath();
            this._drawing.arc(0, 0, rangeShip.r2 * JsDrawing.k, rangeShip.a1, rangeShip.a2);
            this._drawing.stroke();
            this._drawing.closePath();
        };
        JsDrawing.prototype.draingCircleShips = function (rangeShips) {
            for (var _i = 0, rangeShips_1 = rangeShips; _i < rangeShips_1.length; _i++) {
                var rangeShip = rangeShips_1[_i];
                this.drawingCircleShip(rangeShip);
            }
        };
        JsDrawing.prototype.drawingCircle = function (circle) {
            this._drawing.beginPath();
            this._drawing.arc(0, 0, circle.r * JsDrawing.k, 0, 2 * Math.PI);
            this._drawing.stroke();
            this._drawing.closePath();
        };
        JsDrawing.prototype.drawingPolygon = function (polygon) {
            this._drawing.beginPath();
            this._drawing.moveTo(polygon.points[0].x * JsDrawing.k, polygon.points[0].y * JsDrawing.k);
            for (var _i = 0, _a = polygon.points; _i < _a.length; _i++) {
                var point = _a[_i];
                this._drawing.lineTo(point.x * JsDrawing.k, point.y * JsDrawing.k);
            }
            this._drawing.lineTo(polygon.points[0].x * JsDrawing.k, polygon.points[0].y * JsDrawing.k);
            this._drawing.stroke();
            this._drawing.closePath();
        };
        Object.defineProperty(JsDrawing.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
                this._drawing.strokeStyle = value;
            },
            enumerable: true,
            configurable: true
        });
        JsDrawing.k = 10;
        return JsDrawing;
    }());
    exports.JsDrawing = JsDrawing;
});
//# sourceMappingURL=JsDrawing.js.map