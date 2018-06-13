/**
 * 数学表达式的解析类
 * @note 未对浮点精度做特殊处理
 */
export class MathEquationHelper {

    /**
     * 两点求线
     * @param {MathPointDicard} point1
     * @param {MathPointDicard} point2
     * @returns {MathEquation}
     */
    public static twoPoint2Equation(point1: MathPointDicard, point2: MathPointDicard): MathEquation {
        if (point1.equals(point2)) {
            // throw new Error("相同的两点");
            return null;
        }
        let k: number = (point2.y - point1.y) / (point2.x - point1.x);
        let b: number = (point1.x * point2.y - point1.y * point2.x) / (point1.x - point2.x);
        return new MathEquation(k, b);
    }

    /**
     * 两线求交点
     */
    public static twoEuation2Ponit(equation1: MathEquation, equation2: MathEquation): MathPointDicard {
        if (equation1.k == equation2.k) return null;
        let x = (-equation1.b + equation2.b) / (equation1.k - equation2.k);
        let y = (equation1.b * equation2.k - equation2.b * equation1.k) / (equation2.k - equation1.k);
        return new MathPointDicard(x, y);
    }

    /**
     * 线与直线的交点
     */
    public static getRangeByPointAndEquation() {

    }

    public static getAngleByCenterAndPoint(center: MathPointDicard, point: MathPointDicard): number {
        let k: number = (point.y - center.y) / (point.x - center.x);
        let angle: number = Math.atan(k);

        //判断是左边还是右边[true:右边 ,false:左边]
        if (point.x - center.x > 0) {
            angle = angle > 0 ? angle : angle + 2 * Math.PI;
        } else {
            angle = angle + Math.PI;
        }
        return angle;
    }


}

/**
 * 等式
 */
export class MathEquation {
    private _k: number;
    private _b: number;

    constructor(k: number, b: number) {
        this._k = k;
        this._b = b;
    }

    public getYByX(x: number) {
        return x * this.k + this.b;
    }

    public getXByY(y: number) {
        return (y - this.b) / this.k;
    }

    get k(): number {
        return this._k;
    }

    set k(value: number) {
        this._k = value;
    }

    get b(): number {
        return this._b;
    }

    set b(value: number) {
        this._b = value;
    }
}

/**
 * 点
 */
export class MathPointDicard {
    private _x: number;
    private _y: number;


    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }


    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    public equals(another: MathPointDicard): boolean {
        return this.x == another.x && this.y == another.y;
    }

    /**
     * 获取与另一点的距离
     * @param {MathPointDicard} another
     * @returns {number}
     */
    public getRangeWithAnother(another: MathPointDicard): number {
        return Math.sqrt(Math.pow(another.x - this.x, 2) + Math.pow(another.y - this.y, 2));
    }
}

/**
 * 数学圆形
 */
export class MathCircle {
    private _r: number;
    private _center: MathPointDicard;

    constructor(r: number, center: MathPointDicard) {
        this._r = r;
        this._center = center;
    }


    get r(): number {
        return this._r;
    }

    set r(value: number) {
        this._r = value;
    }

    get center(): MathPointDicard {
        return this._center;
    }

    set center(value: MathPointDicard) {
        this._center = value;
    }

    /**
     * 切割成n个扇形 返回切割线的坐标
     * 没有完全测试
     * @param {number} amount 必须为整数
     */
    public split(amount: number): MathEquation[] {
        let mathequations: MathEquation[] = [];
        for (let i = 0; i < amount; i++) {
            let k = Math.tan(((i + 1) / amount) * 2 * Math.PI);
            let b = this.center.y - this.center.x * k;
            mathequations.push(new MathEquation(k, b));
        }
        return mathequations;
    }

    /**
     * 判断点是否在圆内
     * @param {MathPointDicard} point
     * @returns {boolean} [true: 园内或圆上,false：圆外]
     * @constructor
     */
    public IsPointIn(point: MathPointDicard): boolean {
        return this.r >= point.getRangeWithAnother(this.center);
    }

    /**
     * 判断是否与直线相交
     * @param {MathEquation} equation
     * @returns {boolean} [true:相交&相切，false:不相交]
     * @constructor
     */
    public IsEquationIntersect(equation: MathEquation): boolean {
        return Math.abs(equation.k * this.center.x - this.center.y + equation.b)
            / Math.sqrt(equation.k * equation.k + 1)
            <= this.r;
    }
}

/**
 * 扇形 基于圆形的
 */
export class MathSector {

    private _circle: MathCircle;
    //弧度制
    private _startAngle: number;
    private _endAndle: number;

    private startSegment: MathSegments;
    private endSegment: MathSegments;


    constructor(circle: MathCircle, startAngle: number, endAngle: number) {
        this._circle = circle;
        this._startAngle = startAngle;
        this._endAndle = endAngle;

        this.startSegment = new MathSegments(circle.center,
            new MathPointDicard(Math.cos(startAngle) * circle.r + circle.center.x, Math.sin(startAngle) * circle.r + circle.center.y
            ));
        this.endSegment = new MathSegments(circle.center,
            new MathPointDicard(Math.cos(endAngle) * circle.r + circle.center.x, Math.sin(endAngle) * circle.r + circle.center.y
            ));
    }


    get circle(): MathCircle {
        return this._circle;
    }

    set circle(value: MathCircle) {
        this._circle = value;
    }

    get startAngle(): number {
        return this._startAngle;
    }

    set startAngle(value: number) {
        this._startAngle = value;
    }

    get endAndle(): number {
        return this._endAndle;
    }

    set endAndle(value: number) {
        this._endAndle = value;
    }

    /**
     * 扇形内是否包含点
     * 思路是先判断半径再判断角度
     * @param {MathPointDicard} point
     * @returns {boolean}
     */
    public containsPoint(point: MathPointDicard): boolean {
        if (!this.circle.IsPointIn(point)) return false;
        //点换算角度
        let k: number = (point.y - this.circle.center.y) / (point.x - this.circle.center.x);
        let angle: number = Math.atan(k);

        //判断是左边还是右边[true:右边 ,false:左边]
        if (point.x - this.circle.center.x > 0) {
            angle = angle > 0 ? angle : angle + 2 * Math.PI;
        } else {
            angle = angle + Math.PI;
        }

        return angle >= this.startAngle && angle <= this.endAndle;
    }

    /**
     * 判断扇形是否和线段相交
     * @param {MathSegments} segment
     */
    public intersectWithSegment(segment: MathSegments): boolean {
        //判断两边
        if (segment.getPointIntersectWithAnother(this.startSegment) || segment.getPointIntersectWithAnother(this.endSegment)) {
            return true;
        }
        //判断圆弧
        let a: number = Math.pow(segment.equation.k, 2) + 1;
        let b: number = 2 * segment.equation.b * segment.equation.k - 2 * (this.circle.center.y * segment.equation.k + this.circle.center.x);
        let c: number = Math.pow(segment.equation.b - this.circle.center.y, 2) + Math.pow(this.circle.center.x, 2) - Math.pow(this.circle.r, 2);
        let discriminat: number = b * b - 4 * a * c;
        if (discriminat < 0) return false;
        //与圆相交的两点横坐标
        let x1: number = (-b - Math.sqrt(discriminat)) / (2 * a);
        let x2: number = (-b + Math.sqrt(discriminat)) / (2 * a);
        //与圆相交的纵坐标
        let y1 = segment.equation.k * x1 + segment.equation.b;
        let y2 = segment.equation.getYByX(x2);
        //
        let angle1 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x1, y1));
        let angle2 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x2, y2));

        return ((segment.point1.x <= x1 && segment.point2.x >= x1) || (segment.point1.x <= x2 && segment.point2.x >= x2)) && (
            (angle1 > this.startAngle && angle1 < this.endAndle) || (angle2 > this.startAngle && angle2 < this.endAndle)
        );
    }

    /**
     * 获取与线段相交的所有点
     * @param {MathSegments} segment
     * @returns {MathPointDicard[]}
     */
    public getPointsIntersectWithSegment(segment: MathSegments): MathPointDicard[] {
        let intersectPoints: MathPointDicard[] = [];
        let startPonit = segment.getPointIntersectWithAnother(this.startSegment);
        let endPoint = segment.getPointIntersectWithAnother(this.endSegment);
        if (startPonit != null) intersectPoints.push(startPonit);
        if (endPoint != null) intersectPoints.push(endPoint);


        //判断圆弧
        let a: number = Math.pow(segment.equation.k, 2) + 1;
        let b: number = 2 * segment.equation.b * segment.equation.k - 2 * (this.circle.center.y * segment.equation.k + this.circle.center.x);
        let c: number = Math.pow(segment.equation.b - this.circle.center.y, 2) + Math.pow(this.circle.center.x, 2) - Math.pow(this.circle.r, 2);
        let discriminat: number = b * b - 4 * a * c;
        if (discriminat >= 0) {
            //与愿相交的两点横坐标
            let x1: number = (-b - Math.sqrt(discriminat)) / (2 * a);
            let x2: number = (-b + Math.sqrt(discriminat)) / (2 * a);

            let y1 = segment.equation.k * x1 + segment.equation.b;
            let y2 = segment.equation.getYByX(x2);
            //
            let angle1 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x1, y1));
            let angle2 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x2, y2));

            if (((segment.point1.x <= x1 && segment.point2.x >= x1)) && (
                (angle1 > this.startAngle && angle1 < this.endAndle))) {
                intersectPoints.push(new MathPointDicard(x1, y1));
            }

            if (((segment.point1.x <= x2 && segment.point2.x >= x2)) && ((angle2 > this.startAngle && angle2 < this.endAndle))) {
                intersectPoints.push(new MathPointDicard(x2, y2));
            }

        }

        return intersectPoints;
    }


}

/**
 * 多边形
 */
export class MathPolygon {
    private _points: MathPointDicard[] = [];
    private _segments: MathSegments[] = [];

    constructor(points: MathPointDicard[]) {
        this._points = points;
        for (let i = 0; i < points.length - 1; i++) {
            this._segments.push(new MathSegments(points[i], points[i + 1]));
        }
        this._segments.push(new MathSegments(points[points.length - 1], points[0]));
    }

    /**
     * 是否包含点
     * 使用了点x平行边的奇数校验法
     * @param {MathPointDicard} point
     * @returns {boolean}
     */
    public containPoint(point: MathPointDicard): boolean {
        //判断点是否在顶点上
        for (let thisPoint of this.points) {
            if (point.equals(thisPoint)) return true;
        }

        let equations: MathEquation[] = [];
        let intersectPoints: MathPointDicard[] = [];

        //取出所有和point所在平行线的交点
        for (let i = 0; i < this._points.length - 1; i++) {
            //异号
            if (((this._points[i].y - point.y) >= 0 && (this._points[i + 1].y - point.y) <= 0) ||
                ((this._points[i].y - point.y) <= 0 && (this._points[i + 1].y - point.y) >= 0)) {
                let items = MathEquationHelper.twoPoint2Equation(this._points[i], this._points[i + 1]);
                if (items != null && items != undefined) equations.push(items);
            }
        }
        if (((this._points[0].y - point.y) >= 0 && (this._points[this._points.length - 1].y - point.y) <= 0) ||
            ((this._points[0].y - point.y) <= 0 && (this._points[this._points.length - 1].y - point.y) >= 0)) {
            let items = MathEquationHelper.twoPoint2Equation(this._points[0], this._points[this._points.length - 1]);
            if (items != null && items != undefined) equations.push(items);
        }

        let levelEquation = new MathEquation(0, point.y);
        for (let equation of equations) {
            let equation2Ponit: MathPointDicard = MathEquationHelper.twoEuation2Ponit(levelEquation, equation);
            intersectPoints.push(equation2Ponit);
        }
        //排序这些点
        intersectPoints.sort(function (a, b) {
            if (a.x > b.x) return 1;
            else if (a.x < b.x) return -1;
            else if (a.x == b.x) {
                if (a.y > b.y) return 1;
                else if (a.y == b.y) return 0;
                else return 0;
            }
        });
        //去重
        let distinctPoints: MathPointDicard[] = [];
        for (let i = 0; i < intersectPoints.length - 1; i++) {
            if (!intersectPoints[i].equals(intersectPoints[i + 1])) {
                distinctPoints.push(intersectPoints[i]);
            }
        }
        distinctPoints.push(intersectPoints[intersectPoints.length - 1]);

        //输入点在这些交点中的位置
        let pointPosition: number = distinctPoints.length;
        for (let i = 0; i < distinctPoints.length; i++) {
            if (distinctPoints[i] != null && point.x <= distinctPoints[i].x) {
                pointPosition = i;
                break;
            }
        }

        let leftNumber: number = pointPosition;
        let rightNumber: number = distinctPoints.length - pointPosition;

        return (leftNumber % 2 == 1 && rightNumber % 2 == 1);
    }

    public getFarthestRange(point: MathPointDicard) {
        let farestRange: number = this.points[0].getRangeWithAnother(point);
        for (let thisPoint of this.points) {
            let rangeWithAnother = thisPoint.getRangeWithAnother(point);
            if (rangeWithAnother > farestRange) farestRange = rangeWithAnother;
        }
        return farestRange;
    }

    public getNearestRange(point: MathPointDicard) {
        let nearestRange: number = this.points[0].getRangeWithAnother(point);
        for (let thisPoint of this.points) {
            let rangeWithAnother = thisPoint.getRangeWithAnother(point);
            if (rangeWithAnother < nearestRange) nearestRange = rangeWithAnother;
        }
        return nearestRange;
    }


    get points(): MathPointDicard[] {
        return this._points;
    }

    set points(value: MathPointDicard[]) {
        this._points = value;
    }

    get segments(): MathSegments[] {
        return this._segments;
    }

    set segments(value: MathSegments[]) {
        this._segments = value;
    }
}

/**
 * 线段
 */
export class MathSegments {
    //x小的点
    private _point1: MathPointDicard;
    private _point2: MathPointDicard;

    private _equation: MathEquation;

    constructor(point1: MathPointDicard, point2: MathPointDicard) {
        if (point1.x <= point2.x) {
            this._point1 = point1;
            this._point2 = point2;
        } else {
            this._point1 = point2;
            this._point2 = point1;
        }


        this._equation = MathEquationHelper.twoPoint2Equation(point1, point2);
    }

    /**
     * 获取两线段交点
     * @param {MathSegments} another
     * @returns {MathPointDicard}
     */
    public getPointIntersectWithAnother(another: MathSegments): MathPointDicard {
        let mathPointDicard = MathEquationHelper.twoEuation2Ponit(this._equation, another._equation);
        if (mathPointDicard == null || mathPointDicard == undefined) return null;

        if (((mathPointDicard.x >= this._point1.x && mathPointDicard.x <= this._point2.x) &&
            (mathPointDicard.x >= another._point1.x && mathPointDicard.x <= another._point2.x))) {
            return mathPointDicard;
        } else return null;
    }

    get point1(): MathPointDicard {
        return this._point1;
    }

    set point1(value: MathPointDicard) {
        this._point1 = value;
    }

    get point2(): MathPointDicard {
        return this._point2;
    }

    set point2(value: MathPointDicard) {
        this._point2 = value;
    }

    get equation(): MathEquation {
        return this._equation;
    }

    set equation(value: MathEquation) {
        this._equation = value;
    }
}
