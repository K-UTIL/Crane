define(["require", "exports", "jquery", "./util/MathEquation.js"], function (require, exports, $, MathEquation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    $(function () {
        // test1();
        // test2();
        // test3();
        // test4();
        // test5();
        test6();
    });

    function test1() {
        var mathPointDicard = new MathEquation_js_1.MathPointDicard(1, 1);
        var mathPointDicard1 = new MathEquation_js_1.MathPointDicard(6, 5);
        var mathEquation = MathEquation_js_1.MathEquationHelper.twoPoint2Equation(mathPointDicard1, mathPointDicard);
        console.log(mathEquation);
    }

    function test2() {
        var mathEquation = new MathEquation_js_1.MathEquation(1, 2);
        var mathEquation1 = new MathEquation_js_1.MathEquation(2, 1);
        console.log(MathEquation_js_1.MathEquationHelper.twoEuation2Ponit(mathEquation, mathEquation1));
    }

    function test3() {
        var mathCircle = new MathEquation_js_1.MathCircle(10, new MathEquation_js_1.MathPointDicard(1, 2));
        var mathEquations = mathCircle.split(36);
        console.log(mathEquations);
    }

    //测试相交
    function test4() {
        var date = new Date();
        var mathCircle = new MathEquation_js_1.MathCircle(1, new MathEquation_js_1.MathPointDicard(1, 1));
        var mathEquation = new MathEquation_js_1.MathEquation(1, 1);
        console.log(mathCircle.IsEquationIntersect(mathEquation));
        var date1 = new Date();
        console.log(date1.getMilliseconds() - date.getMilliseconds());
    }

    function test5() {
        var mathCircle = new MathEquation_js_1.MathCircle(1, new MathEquation_js_1.MathPointDicard(0, 0));
        var mathSector = new MathEquation_js_1.MathSector(mathCircle, 0, Math.PI / 4);
        console.log(mathSector.containsPoint(new MathEquation_js_1.MathPointDicard(0.5, 0.5)));
        console.log(mathSector.containsPoint(new MathEquation_js_1.MathPointDicard(-0.5, 0.5)));
        console.log(mathSector.containsPoint(new MathEquation_js_1.MathPointDicard(1, 1)));
    }

    function test6() {
        var mathPolygon = new MathEquation_js_1.MathPolygon([
            new MathEquation_js_1.MathPointDicard(0, 0),
            new MathEquation_js_1.MathPointDicard(1, 0),
            new MathEquation_js_1.MathPointDicard(2, 1),
            new MathEquation_js_1.MathPointDicard(1, 3)
        ]);
        console.log(mathPolygon.containPoint(new MathEquation_js_1.MathPointDicard(1, 1)));
        console.log(mathPolygon.containPoint(new MathEquation_js_1.MathPointDicard(0, 1)));
        console.log(mathPolygon.containPoint(new MathEquation_js_1.MathPointDicard(2, 1)));
        console.log(mathPolygon.containPoint(new MathEquation_js_1.MathPointDicard(-1, 1)));
    }
});
//# sourceMappingURL=test.js.map