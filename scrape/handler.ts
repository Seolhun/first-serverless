import { Handler, Context, Callback } from 'aws-lambda';
import { Scraper } from '../utils/scraper';

interface ScraperResponse {
  statusCode: number;
  body: string;
}

const scrape: Handler = (event: any, context: Context, callback: Callback) => {
  // "https://seolhun.github.io/about/"
  const sc = new Scraper();
  sc.getPage(event)
    .then(page => sc.parsePage(page))
    .then(data => sc.saveToDb(data, event))

  const response: ScraperResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success Scrape",
      input: event
    })
  };

  callback(null, response);
};

export { scrape }
