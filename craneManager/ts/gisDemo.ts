import *  as  $ from "jquery";
import {TowerRange} from "./TowerRange.js";
import {MapEntity} from "./MapEntity.js";
// import * as layer from 'layer';
declare var BMap;
declare var BMapLib;

$(function () {

    var mapEntity = new MapEntity(new BMap.Point(116.400591, 39.916959), "container", true);
    let towerRange = new TowerRange(new BMap.Point(116.400591, 39.916959), 75);
    towerRange.draw2Map(mapEntity);
});