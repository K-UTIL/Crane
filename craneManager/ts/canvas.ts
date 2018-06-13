import * as $ from "jquery"
import "layui"
import {RangeShip} from "./TowerRange.js";
import {JsDrawing} from "./util/JsDrawing.js";
import {MathCircle, MathPolygon} from "./util/MathEquation.js";

$(function () {
    let pro: RangeShip[] = window.top.pro;
    let con: RangeShip[] = window.top.con;
    let circle: MathCircle = window.top.mathCircle;
    // let polygon:MathPolygon = window.top.mathPolygon;

    let jsDrawing = new JsDrawing("container");
    jsDrawing.color = "#0d00ff";

    jsDrawing.draingCircleShips(pro);
    jsDrawing.color = "#ff1500";

    jsDrawing.draingCircleShips(con);
    jsDrawing.color = "#111";
    jsDrawing.drawingCircle(circle);
    for (let polygon of window.top.mathPolygon) {
        jsDrawing.drawingPolygon(polygon);
    }

});