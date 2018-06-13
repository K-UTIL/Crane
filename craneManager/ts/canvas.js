define(["require", "exports", "jquery", "./util/JsDrawing.js", "layui"], function (require, exports, $, JsDrawing_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    $(function () {
        var pro = window.top.pro;
        var con = window.top.con;
        var circle = window.top.mathCircle;
        // let polygon:MathPolygon = window.top.mathPolygon;
        var jsDrawing = new JsDrawing_js_1.JsDrawing("container");
        jsDrawing.color = "#0d00ff";
        jsDrawing.draingCircleShips(pro);
        jsDrawing.color = "#ff1500";
        jsDrawing.draingCircleShips(con);
        jsDrawing.color = "#111";
        jsDrawing.drawingCircle(circle);
        for (var _i = 0, _a = window.top.mathPolygon; _i < _a.length; _i++) {
            var polygon = _a[_i];
            jsDrawing.drawingPolygon(polygon);
        }
    });
});
//# sourceMappingURL=canvas.js.map