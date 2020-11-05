(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.appConfig = factory());
}(this, function() {
    'use strict';


    var appConfig = {
        port: 8082,
        style: {
            titleHeight: 56, //标题栏高度
            footerHeight: 64, //页脚高度
        },
    }
    return appConfig;
}))