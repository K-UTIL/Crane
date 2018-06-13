import * as $ from "jquery"
import "layui"
import {ParamHelper} from "../util/ParamHelper.js";

$(function () {
    let paramHelper: ParamHelper = new ParamHelper(window.location.toString());
    let id = paramHelper.get("id");


    console.log(id);
});