import * as $ from "jquery";
import {
    MathCircle,
    MathEquation,
    MathEquationHelper,
    MathPointDicard,
    MathPolygon,
    MathSector
} from "./util/MathEquation.js";

$(function () {
    // test1();
    // test2();
    // test3();
    // test4();
    // test5();
    test6();
});


function test1() {
    let mathPointDicard = new MathPointDicard(1, 1);
    let mathPointDicard1 = new MathPointDicard(6, 5);

    let mathEquation = MathEquationHelper.twoPoint2Equation(mathPointDicard1, mathPointDicard);
    console.log(mathEquation);
}

function test2() {
    let mathEquation = new MathEquation(1, 2);
    let mathEquation1 = new MathEquation(2, 1);
    console.log(MathEquationHelper.twoEuation2Ponit(mathEquation, mathEquation1));
}

function test3() {
    let mathCircle = new MathCircle(10, new MathPointDicard(1, 2));
    let mathEquations = mathCircle.split(36);
    console.log(mathEquations);
}

//测试相交
function test4() {
    let date = new Date();
    let mathCircle = new MathCircle(1, new MathPointDicard(1, 1));
    let mathEquation = new MathEquation(1, 1);
    console.log(mathCircle.IsEquationIntersect(mathEquation));
    let date1 = new Date();
    console.log(date1.getMilliseconds() - date.getMilliseconds())
}

function test5() {
    let mathCircle: MathCircle = new MathCircle(1, new MathPointDicard(0, 0));
    let mathSector = new MathSector(mathCircle, 0, Math.PI / 4);
    console.log(mathSector.containsPoint(new MathPointDicard(0.5, 0.5)));
    console.log(mathSector.containsPoint(new MathPointDicard(-0.5, 0.5)));
    console.log(mathSector.containsPoint(new MathPointDicard(1, 1)));
}

function test6() {
    let mathPolygon = new MathPolygon([
        new MathPointDicard(0, 0),
        new MathPointDicard(1, 0),
        new MathPointDicard(2, 1),
        new MathPointDicard(1, 3)
    ]);

    console.log(mathPolygon.containPoint(new MathPointDicard(1, 1)));
    console.log(mathPolygon.containPoint(new MathPointDicard(0, 1)));
    console.log(mathPolygon.containPoint(new MathPointDicard(2, 1)));
    console.log(mathPolygon.containPoint(new MathPointDicard(-1, 1)));
}