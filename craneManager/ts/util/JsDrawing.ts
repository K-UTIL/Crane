import {RangeShip} from "../TowerRange.js";
import {MathCircle, MathPointDicard, MathPolygon} from "./MathEquation.js";

export class JsDrawing {
    //canvas标签id
    private container;

    private _drawing;
    private center: MathPointDicard = new MathPointDicard(100, 100);
    private _color: string = "#000";
    public static k: number = 10;


    constructor(container) {
        this.container = container;
        let dom = document.getElementById(container);
        this._drawing = dom.getContext("2d");
        this._drawing.translate(this.center.x * JsDrawing.k, this.center.y * JsDrawing.k)
        // ctx.translate(canvas_width, 0);
        this._drawing.scale(1, -1);
    }

    public drawingCircleShip(rangeShip: RangeShip) {
        this._drawing.beginPath();


        let point1 = new MathPointDicard(rangeShip.r1 * Math.cos(rangeShip.a1)
            , rangeShip.r1 * Math.sin(rangeShip.a1));
        let point2 = new MathPointDicard(rangeShip.r2 * Math.cos(rangeShip.a1)
            , rangeShip.r2 * Math.sin(rangeShip.a1));
        let point3 = new MathPointDicard(rangeShip.r1 * Math.cos(rangeShip.a2)
            , rangeShip.r1 * Math.sin(rangeShip.a2));
        let point4 = new MathPointDicard(rangeShip.r2 * Math.cos(rangeShip.a2)
            , rangeShip.r2 * Math.sin(rangeShip.a2));

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
    }

    public draingCircleShips(rangeShips: RangeShip[]) {
        for (let rangeShip of rangeShips) {
            this.drawingCircleShip(rangeShip);
        }
    }

    public drawingCircle(circle: MathCircle) {
        this._drawing.beginPath();
        this._drawing.arc(0, 0, circle.r * JsDrawing.k, 0, 2 * Math.PI);
        this._drawing.stroke();
        this._drawing.closePath();
    }

    public drawingPolygon(polygon: MathPolygon) {
        this._drawing.beginPath();
        this._drawing.moveTo(polygon.points[0].x * JsDrawing.k, polygon.points[0].y * JsDrawing.k);
        for (let point of polygon.points) {
            this._drawing.lineTo(point.x * JsDrawing.k, point.y * JsDrawing.k);
        }
        this._drawing.lineTo(polygon.points[0].x * JsDrawing.k, polygon.points[0].y * JsDrawing.k);
        this._drawing.stroke();
        this._drawing.closePath();
    }


    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
        this._drawing.strokeStyle = value;
    }
}