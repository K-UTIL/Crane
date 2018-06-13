define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    /**
     * 头部导航初始化
     */
    var NavBarTool = /** @class */ (function () {
        function NavBarTool() {
            this.init();
        }

        NavBarTool.prototype.init = function () {
            this.loadRealtimeArea();
            this.bindClick();
        };
        NavBarTool.prototype.loadRealtimeArea = function () {
            var $realTimeArea = $("#real_time_area");
            $realTimeArea.empty();
            //此处模拟读取后台数据
            var ids = [
                new Site(5, "河北工地"),
                new Site(6, "浙江工地")
            ];
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var site = ids_1[_i];
                $realTimeArea.append("<dd><a site-id=\"" + site.id + "\" site='site' href=\"javascript:void 0\" >" + site.name + "</a></dd>");
            }
        };
        NavBarTool.prototype.bindClick = function () {
            $(NavBarTool.navbarSelector).on("click", function (e) {
                var src = "";
                switch ($(e.target).attr("site")) {
                    case "realTimeData":
                        src = "/CraneManager/html/tower_crane/real_time_data.html";
                        break;
                    case "realtimeArea":
                        src = "/CraneManager/html/tower_crane/real_time_area.html";
                        break;
                    case "site":
                        src = "/CraneManager/html/tower_crane/real_time_area.html?id=" + $(e.target).attr("site-id");
                        break;
                    case "history":
                        src = "/CraneManager/html/tower_crane/history_data.html";
                        break;
                    case "plan":
                        src = "/CraneManager/html/tower_crane/site_plan.html";
                        break;
                    case "community":
                        src = "/CraneManager/html/tower_crane/community.html";
                        break;
                    case "test":
                        src = "/CraneManager/html/gisDemo.html";
                }
                if (src != "")
                    $(NavBarTool.iframeSelector).attr("src", src);
            });
        };
        NavBarTool.navbarSelector = "#head-nav";
        NavBarTool.iframeSelector = "#main_iframe";
        return NavBarTool;
    }());
    exports.NavBarTool = NavBarTool;
    /**
     * 工地属性
     */
    var Site = /** @class */ (function () {
        function Site(id, name) {
            this._id = id;
            this._name = name;
        }

        Object.defineProperty(Site.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Site.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        return Site;
    }());
});
//# sourceMappingURL=NavBarTool.js.map