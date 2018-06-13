define(["require", "exports", "jquery", "./TowerRange.js", "./MapEntity.js"], function (require, exports, $, TowerRange_js_1, MapEntity_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    $(function () {
        var mapEntity = new MapEntity_js_1.MapEntity(new BMap.Point(116.400591, 39.916959), "container", true);
        var towerRange = new TowerRange_js_1.TowerRange(new BMap.Point(116.400591, 39.916959), 75);
        towerRange.draw2Map(mapEntity);
    });
});
//# sourceMappingURL=gisDemo.js.map