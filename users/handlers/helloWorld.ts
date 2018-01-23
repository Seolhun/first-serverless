import { Context, Callback } from 'aws-lambda';

export function helloWorld(event: any, context: Context, callback: Callback) {
  callback(null, 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!');
}

