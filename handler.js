'use strict';

module.exports.hello = (event, context, callback) => {
  let message = 'Hello, Everyone'
  if (event.pathParameters) {
    message = `Hello ${event.pathParameters.name}`
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.stringify(message)
    }),
  };

  callback(null, response);
};
