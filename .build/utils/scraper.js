"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var cheerio = require("cheerio");
var request = require("request-promise");
var uuid = require("uuid");
var dynamoDb = new AWS.DynamoDB.DocumentClient();
var Scraper = /** @class */ (function () {
    function Scraper() {
    }
    Scraper.prototype.getPage = function (url) {
        return request({ method: 'GET', url: url });
    };
    Scraper.prototype.parsePage = function (pageHtml) {
        try {
            var $ = cheerio.load(pageHtml);
            var scrapedText = $(".entry-content")
                .text()
                .trim();
            return Promise.resolve(scrapedText);
        }
        catch (e) {
            return Promise.reject("Error parsing page: " + JSON.stringify(e));
        }
    };
    Scraper.prototype.saveToDb = function (data, url) {
        var params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: uuid.v4(),
                url: url,
                data: data,
                active: true,
                created_at: new Date().getTime(),
            }
        };
        dynamoDb.put(params, function (error) {
            console.log('=====');
            console.log(params);
            console.log('=====');
            if (error) {
                console.error("Error saving data to DynamoDB: " + JSON.stringify(error));
                return Promise.reject(console.error("Error saving data to DynamoDB: " + JSON.stringify(error)));
            }
            else {
                return Promise.resolve(params.Item);
            }
        });
    };
    return Scraper;
}());
exports.Scraper = Scraper;
//# sourceMappingURL=scraper.js.map