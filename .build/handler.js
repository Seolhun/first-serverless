"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello = function (event, context, callback) {
    var message = 'Hello, Everyone';
    if (event.pathParameters) {
        message = "Hello " + event.pathParameters.name;
    }
    var response = {
        statusCode: 200,
        body: JSON.stringify({
            message: JSON.stringify(message)
        })
    };
    callback(undefined, response);
};
exports.hello = hello;
//# sourceMappingURL=handler.js.map