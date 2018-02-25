import { Handler, Context, Callback } from 'aws-lambda'

interface HelloResponse {
  statusCode: number;
  body: string;
}

const hello: Handler = (event: any, context: Context, callback: Callback) => {
  let message = 'Hello, Everyone'
  if (event.pathParameters) {
    message = `Hello ${event.pathParameters.name}`
  }

  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.stringify(message)
    })
  };

  callback(null, response);
};

export { hello };
