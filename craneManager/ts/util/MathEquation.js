define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    /**
     * 数学表达式的解析类
     * @note 未对浮点精度做特殊处理
     */
    var MathEquationHelper = /** @class */ (function () {
        function MathEquationHelper() {
        }

        /**
         * 两点求线
         * @param {MathPointDicard} point1
         * @param {MathPointDicard} point2
         * @returns {MathEquation}
         */
        MathEquationHelper.twoPoint2Equation = function (point1, point2) {
            if (point1.equals(point2)) {
                // throw new Error("相同的两点");
                return null;
            }
            var k = (point2.y - point1.y) / (point2.x - point1.x);
            var b = (point1.x * point2.y - point1.y * point2.x) / (point1.x - point2.x);
            return new MathEquation(k, b);
        };
        /**
         * 两线求交点
         */
        MathEquationHelper.twoEuation2Ponit = function (equation1, equation2) {
            if (equation1.k == equation2.k)
                return null;
            var x = (-equation1.b + equation2.b) / (equation1.k - equation2.k);
            var y = (equation1.b * equation2.k - equation2.b * equation1.k) / (equation2.k - equation1.k);
            return new MathPointDicard(x, y);
        };
        /**
         * 线与直线的交点
         */
        MathEquationHelper.getRangeByPointAndEquation = function () {
        };
        MathEquationHelper.getAngleByCenterAndPoint = function (center, point) {
            var k = (point.y - center.y) / (point.x - center.x);
            var angle = Math.atan(k);
            //判断是左边还是右边[true:右边 ,false:左边]
            if (point.x - center.x > 0) {
                angle = angle > 0 ? angle : angle + 2 * Math.PI;
            }
            else {
                angle = angle + Math.PI;
            }
            return angle;
        };
        return MathEquationHelper;
    }());
    exports.MathEquationHelper = MathEquationHelper;
    /**
     * 等式
     */
    var MathEquation = /** @class */ (function () {
        function MathEquation(k, b) {
            this._k = k;
            this._b = b;
        }

        MathEquation.prototype.getYByX = function (x) {
            return x * this.k + this.b;
        };
        MathEquation.prototype.getXByY = function (y) {
            return (y - this.b) / this.k;
        };
        Object.defineProperty(MathEquation.prototype, "k", {
            get: function () {
                return this._k;
            },
            set: function (value) {
                this._k = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathEquation.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (value) {
                this._b = value;
            },
            enumerable: true,
            configurable: true
        });
        return MathEquation;
    }());
    exports.MathEquation = MathEquation;
    /**
     * 点
     */
    var MathPointDicard = /** @class */ (function () {
        function MathPointDicard(x, y) {
            this._x = x;
            this._y = y;
        }

        Object.defineProperty(MathPointDicard.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathPointDicard.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        MathPointDicard.prototype.equals = function (another) {
            return this.x == another.x && this.y == another.y;
        };
        /**
         * 获取与另一点的距离
         * @param {MathPointDicard} another
         * @returns {number}
         */
        MathPointDicard.prototype.getRangeWithAnother = function (another) {
            return Math.sqrt(Math.pow(another.x - this.x, 2) + Math.pow(another.y - this.y, 2));
        };
        return MathPointDicard;
    }());
    exports.MathPointDicard = MathPointDicard;
    /**
     * 数学圆形
     */
    var MathCircle = /** @class */ (function () {
        function MathCircle(r, center) {
            this._r = r;
            this._center = center;
        }

        Object.defineProperty(MathCircle.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (value) {
                this._r = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathCircle.prototype, "center", {
            get: function () {
                return this._center;
            },
            set: function (value) {
                this._center = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 切割成n个扇形 返回切割线的坐标
         * 没有完全测试
         * @param {number} amount 必须为整数
         */
        MathCircle.prototype.split = function (amount) {
            var mathequations = [];
            for (var i = 0; i < amount; i++) {
                var k = Math.tan(((i + 1) / amount) * 2 * Math.PI);
                var b = this.center.y - this.center.x * k;
                mathequations.push(new MathEquation(k, b));
            }
            return mathequations;
        };
        /**
         * 判断点是否在圆内
         * @param {MathPointDicard} point
         * @returns {boolean} [true: 园内或圆上,false：圆外]
         * @constructor
         */
        MathCircle.prototype.IsPointIn = function (point) {
            return this.r >= point.getRangeWithAnother(this.center);
        };
        /**
         * 判断是否与直线相交
         * @param {MathEquation} equation
         * @returns {boolean} [true:相交&相切，false:不相交]
         * @constructor
         */
        MathCircle.prototype.IsEquationIntersect = function (equation) {
            return Math.abs(equation.k * this.center.x - this.center.y + equation.b)
                / Math.sqrt(equation.k * equation.k + 1)
                <= this.r;
        };
        return MathCircle;
    }());
    exports.MathCircle = MathCircle;
    /**
     * 扇形 基于圆形的
     */
    var MathSector = /** @class */ (function () {
        function MathSector(circle, startAngle, endAngle) {
            this._circle = circle;
            this._startAngle = startAngle;
            this._endAndle = endAngle;
            this.startSegment = new MathSegments(circle.center, new MathPointDicard(Math.cos(startAngle) * circle.r + circle.center.x, Math.sin(startAngle) * circle.r + circle.center.y));
            this.endSegment = new MathSegments(circle.center, new MathPointDicard(Math.cos(endAngle) * circle.r + circle.center.x, Math.sin(endAngle) * circle.r + circle.center.y));
        }

        Object.defineProperty(MathSector.prototype, "circle", {
            get: function () {
                return this._circle;
            },
            set: function (value) {
                this._circle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathSector.prototype, "startAngle", {
            get: function () {
                return this._startAngle;
            },
            set: function (value) {
                this._startAngle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathSector.prototype, "endAndle", {
            get: function () {
                return this._endAndle;
            },
            set: function (value) {
                this._endAndle = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 扇形内是否包含点
         * 思路是先判断半径再判断角度
         * @param {MathPointDicard} point
         * @returns {boolean}
         */
        MathSector.prototype.containsPoint = function (point) {
            if (!this.circle.IsPointIn(point))
                return false;
            //点换算角度
            var k = (point.y - this.circle.center.y) / (point.x - this.circle.center.x);
            var angle = Math.atan(k);
            //判断是左边还是右边[true:右边 ,false:左边]
            if (point.x - this.circle.center.x > 0) {
                angle = angle > 0 ? angle : angle + 2 * Math.PI;
            }
            else {
                angle = angle + Math.PI;
            }
            return angle >= this.startAngle && angle <= this.endAndle;
        };
        /**
         * 判断扇形是否和线段相交
         * @param {MathSegments} segment
         */
        MathSector.prototype.intersectWithSegment = function (segment) {
            //判断两边
            if (segment.getPointIntersectWithAnother(this.startSegment) || segment.getPointIntersectWithAnother(this.endSegment)) {
                return true;
            }
            //判断圆弧
            var a = Math.pow(segment.equation.k, 2) + 1;
            var b = 2 * segment.equation.b * segment.equation.k - 2 * (this.circle.center.y * segment.equation.k + this.circle.center.x);
            var c = Math.pow(segment.equation.b - this.circle.center.y, 2) + Math.pow(this.circle.center.x, 2) - Math.pow(this.circle.r, 2);
            var discriminat = b * b - 4 * a * c;
            if (discriminat < 0)
                return false;
            //与圆相交的两点横坐标
            var x1 = (-b - Math.sqrt(discriminat)) / (2 * a);
            var x2 = (-b + Math.sqrt(discriminat)) / (2 * a);
            //与圆相交的纵坐标
            var y1 = segment.equation.k * x1 + segment.equation.b;
            var y2 = segment.equation.getYByX(x2);
            //
            var angle1 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x1, y1));
            var angle2 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x2, y2));
            return ((segment.point1.x <= x1 && segment.point2.x >= x1) || (segment.point1.x <= x2 && segment.point2.x >= x2)) && ((angle1 > this.startAngle && angle1 < this.endAndle) || (angle2 > this.startAngle && angle2 < this.endAndle));
        };
        /**
         * 获取与线段相交的所有点
         * @param {MathSegments} segment
         * @returns {MathPointDicard[]}
         */
        MathSector.prototype.getPointsIntersectWithSegment = function (segment) {
            var intersectPoints = [];
            var startPonit = segment.getPointIntersectWithAnother(this.startSegment);
            var endPoint = segment.getPointIntersectWithAnother(this.endSegment);
            if (startPonit != null)
                intersectPoints.push(startPonit);
            if (endPoint != null)
                intersectPoints.push(endPoint);
            //判断圆弧
            var a = Math.pow(segment.equation.k, 2) + 1;
            var b = 2 * segment.equation.b * segment.equation.k - 2 * (this.circle.center.y * segment.equation.k + this.circle.center.x);
            var c = Math.pow(segment.equation.b - this.circle.center.y, 2) + Math.pow(this.circle.center.x, 2) - Math.pow(this.circle.r, 2);
            var discriminat = b * b - 4 * a * c;
            if (discriminat >= 0) {
                //与愿相交的两点横坐标
                var x1 = (-b - Math.sqrt(discriminat)) / (2 * a);
                var x2 = (-b + Math.sqrt(discriminat)) / (2 * a);
                var y1 = segment.equation.k * x1 + segment.equation.b;
                var y2 = segment.equation.getYByX(x2);
                //
                var angle1 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x1, y1));
                var angle2 = MathEquationHelper.getAngleByCenterAndPoint(this.circle.center, new MathPointDicard(x2, y2));
                if (((segment.point1.x <= x1 && segment.point2.x >= x1)) && ((angle1 > this.startAngle && angle1 < this.endAndle))) {
                    intersectPoints.push(new MathPointDicard(x1, y1));
                }
                if (((segment.point1.x <= x2 && segment.point2.x >= x2)) && ((angle2 > this.startAngle && angle2 < this.endAndle))) {
                    intersectPoints.push(new MathPointDicard(x2, y2));
                }
            }
            return intersectPoints;
        };
        return MathSector;
    }());
    exports.MathSector = MathSector;
    /**
     * 多边形
     */
    var MathPolygon = /** @class */ (function () {
        function MathPolygon(points) {
            this._points = [];
            this._segments = [];
            this._points = points;
            for (var i = 0; i < points.length - 1; i++) {
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
        MathPolygon.prototype.containPoint = function (point) {
            //判断点是否在顶点上
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var thisPoint = _a[_i];
                if (point.equals(thisPoint))
                    return true;
            }
            var equations = [];
            var intersectPoints = [];
            //取出所有和point所在平行线的交点
            for (var i = 0; i < this._points.length - 1; i++) {
                //异号
                if (((this._points[i].y - point.y) >= 0 && (this._points[i + 1].y - point.y) <= 0) ||
                    ((this._points[i].y - point.y) <= 0 && (this._points[i + 1].y - point.y) >= 0)) {
                    var items = MathEquationHelper.twoPoint2Equation(this._points[i], this._points[i + 1]);
                    if (items != null && items != undefined)
                        equations.push(items);
                }
            }
            if (((this._points[0].y - point.y) >= 0 && (this._points[this._points.length - 1].y - point.y) <= 0) ||
                ((this._points[0].y - point.y) <= 0 && (this._points[this._points.length - 1].y - point.y) >= 0)) {
                var items = MathEquationHelper.twoPoint2Equation(this._points[0], this._points[this._points.length - 1]);
                if (items != null && items != undefined)
                    equations.push(items);
            }
            var levelEquation = new MathEquation(0, point.y);
            for (var _c = 0, equations_1 = equations; _c < equations_1.length; _c++) {
                var equation = equations_1[_c];
                var equation2Ponit = MathEquationHelper.twoEuation2Ponit(levelEquation, equation);
                intersectPoints.push(equation2Ponit);
            }
            //排序这些点
            intersectPoints.sort(function (a, b) {
                if (a.x > b.x)
                    return 1;
                else if (a.x < b.x)
                    return -1;
                else if (a.x == b.x) {
                    if (a.y > b.y)
                        return 1;
                    else if (a.y == b.y)
                        return 0;
                    else
                        return 0;
                }
            });
            //去重
            var distinctPoints = [];
            for (var i = 0; i < intersectPoints.length - 1; i++) {
                if (!intersectPoints[i].equals(intersectPoints[i + 1])) {
                    distinctPoints.push(intersectPoints[i]);
                }
            }
            distinctPoints.push(intersectPoints[intersectPoints.length - 1]);
            //输入点在这些交点中的位置
            var pointPosition = distinctPoints.length;
            for (var i = 0; i < distinctPoints.length; i++) {
                if (distinctPoints[i] != null && point.x <= distinctPoints[i].x) {
                    pointPosition = i;
                    break;
                }
            }
            var leftNumber = pointPosition;
            var rightNumber = distinctPoints.length - pointPosition;
            return (leftNumber % 2 == 1 && rightNumber % 2 == 1);
        };
        MathPolygon.prototype.getFarthestRange = function (point) {
            var farestRange = this.points[0].getRangeWithAnother(point);
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var thisPoint = _a[_i];
                var rangeWithAnother = thisPoint.getRangeWithAnother(point);
                if (rangeWithAnother > farestRange)
                    farestRange = rangeWithAnother;
            }
            return farestRange;
        };
        MathPolygon.prototype.getNearestRange = function (point) {
            var nearestRange = this.points[0].getRangeWithAnother(point);
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var thisPoint = _a[_i];
                var rangeWithAnother = thisPoint.getRangeWithAnother(point);
                if (rangeWithAnother < nearestRange)
                    nearestRange = rangeWithAnother;
            }
            return nearestRange;
        };
        Object.defineProperty(MathPolygon.prototype, "points", {
            get: function () {
                return this._points;
            },
            set: function (value) {
                this._points = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathPolygon.prototype, "segments", {
            get: function () {
                return this._segments;
            },
            set: function (value) {
                this._segments = value;
            },
            enumerable: true,
            configurable: true
        });
        return MathPolygon;
    }());
    exports.MathPolygon = MathPolygon;
    /**
     * 线段
     */
    var MathSegments = /** @class */ (function () {
        function MathSegments(point1, point2) {
            if (point1.x <= point2.x) {
                this._point1 = point1;
                this._point2 = point2;
            }
            else {
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
        MathSegments.prototype.getPointIntersectWithAnother = function (another) {
            var mathPointDicard = MathEquationHelper.twoEuation2Ponit(this._equation, another._equation);
            if (mathPointDicard == null || mathPointDicard == undefined)
                return null;
            if (((mathPointDicard.x >= this._point1.x && mathPointDicard.x <= this._point2.x) &&
                (mathPointDicard.x >= another._point1.x && mathPointDicard.x <= another._point2.x))) {
                return mathPointDicard;
            }
            else
                return null;
        };
        Object.defineProperty(MathSegments.prototype, "point1", {
            get: function () {
                return this._point1;
            },
            set: function (value) {
                this._point1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathSegments.prototype, "point2", {
            get: function () {
                return this._point2;
            },
            set: function (value) {
                this._point2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathSegments.prototype, "equation", {
            get: function () {
                return this._equation;
            },
            set: function (value) {
                this._equation = value;
            },
            enumerable: true,
            configurable: true
        });
        return MathSegments;
    }());
    exports.MathSegments = MathSegments;
});
//# sourceMappingURL=MathEquation.js.map