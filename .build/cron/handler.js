"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron = function (event, context, callback) {
    var now = new Date();
    var message = "The time is " + now;
    console.log(message);
    callback(null, message);
};
exports.cron = cron;
//# sourceMappingURL=handler.js.map