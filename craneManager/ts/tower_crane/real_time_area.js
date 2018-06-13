define(["require", "exports", "jquery", "../util/ParamHelper.js", "layui"], function (require, exports, $, ParamHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    $(function () {
        var paramHelper = new ParamHelper_js_1.ParamHelper(window.location.toString());
        var id = paramHelper.get("id");
        console.log(id);
    });
});
//# sourceMappingURL=real_time_area.js.map