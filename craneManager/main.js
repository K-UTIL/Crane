requirejs.config({
    baseUrl: 'CraneManager',
    paths: {
        "jquery": '/CraneManager/lib/jquery/jquery-1.9.1',
        "layer": '/CraneManager/lib/layer/layer',
        "BMap": "",
        "layui": "/CraneManager/lib/layui/layui.all"
    },
    shim: {
        layer: {
            deps: [
                'jquery'
            ]
        },
        layui: {
            deps: [
                'jquery'
            ]
        }
    }
});
// console.log(333);
// requirejs(['']);
// requirejs(['/CraneManager/ts/gisDemo.js']);