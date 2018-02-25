"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scraper_1 = require("../utils/scraper");
var scrape = function (event, context, callback) {
    // "https://seolhun.github.io/about/"
    var sc = new scraper_1.Scraper();
    sc.getPage(event)
        .then(function (page) { return sc.parsePage(page); })
        .then(function (data) { return sc.saveToDb(data, event); });
    var response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Success Scrape",
            input: event
        })
    };
    callback(null, response);
};
exports.scrape = scrape;
//# sourceMappingURL=handler.js.map