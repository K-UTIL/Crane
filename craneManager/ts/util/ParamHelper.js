define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    /**
     * 参数工具类 解析?后的参数
     */
    var ParamHelper = /** @class */ (function () {
        function ParamHelper(source) {
            this.params = {};
            this.source = source;
            if (source.indexOf("?") != -1 && source.indexOf("?") != source.length - 1) {
                var params = source.substring(source.indexOf("?") + 1);
                var strings = params.split("&");
                for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
                    var paramMap = strings_1[_i];
                    var paramKeyAndValue = paramMap.split("=");
                    if (paramKeyAndValue.length == 2) {
                        this.params[paramKeyAndValue[0]] = paramKeyAndValue[1];
                    }
                }
            }
        }

        ParamHelper.prototype.get = function (key) {
            return this.params[key] !== undefined ? this.params[key] : "";
        };
        ParamHelper.prototype.getAll = function () {
            return this.params;
        };
        return ParamHelper;
    }());
    exports.ParamHelper = ParamHelper;
});
//# sourceMappingURL=ParamHelper.js.map