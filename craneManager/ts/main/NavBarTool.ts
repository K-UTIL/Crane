/**
 * 头部导航初始化
 */
export class NavBarTool {
    static navbarSelector: string = "#head-nav";
    static iframeSelector: string = "#main_iframe";

    constructor() {
        this.init();
    }

    private init() {
        this.loadRealtimeArea();
        this.bindClick();
    }

    private loadRealtimeArea() {//实时工地加载
        let $realTimeArea = $("#real_time_area");
        $realTimeArea.empty();
        //此处模拟读取后台数据
        let ids = [
            new Site(5, "河北工地"),
            new Site(6, "浙江工地")
        ];
        for (let site of ids) {
            $realTimeArea.append(`<dd><a site-id="${site.id}" site='site' href="javascript:void 0" >${site.name}</a></dd>`)
        }
    }

    private bindClick() {
        $(NavBarTool.navbarSelector).on("click", function (e) {
            let src = "";
            switch ($(e.target).attr("site")) {
                case "realTimeData":
                    src = "/CraneManager/html/tower_crane/real_time_data.html";
                    break;
                case "realtimeArea":
                    src = "/CraneManager/html/tower_crane/real_time_area.html";
                    break;
                case "site":
                    src = `/CraneManager/html/tower_crane/real_time_area.html?id=${$(e.target).attr("site-id")}`;
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
            if (src != "") $(NavBarTool.iframeSelector).attr("src", src);
        })
    }

}

/**
 * 工地属性
 */
class Site {
    private _id: number;
    private _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}


