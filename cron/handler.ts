import { Handler, Context, Callback } from 'aws-lambda';

const cron: Handler = (event: any, context: Context, callback: Callback) => {
  const now = new Date();

  const message = `The time is ${now}`;

  console.log(message);
  callback(null, message);
};

export { cron };
