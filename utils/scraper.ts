import * as AWS from 'aws-sdk';
import * as cheerio from 'cheerio';
import * as request from 'request-promise';

import * as uuid from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

class Scraper {
  getPage(url: string) {
    return request({ method: 'GET', url })
  }

  parsePage(pageHtml: string): Promise<string> {
    try {
      const $ = cheerio.load(pageHtml);
      const scrapedText = $(".entry-content")
        .text()
        .trim();
      return Promise.resolve(scrapedText);
    } catch (e) {
      return Promise.reject(`Error parsing page: ${JSON.stringify(e)}`)
    }
  }

  saveToDb(data: string, url: string): void {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v4(),
        url,
        data,
        active: true,
        created_at: new Date().getTime(),
      }
    };

    dynamoDb.put(params, error => {
      console.log('=====');
      console.log(params);
      console.log('=====');
      if (error) {
        console.error(`Error saving data to DynamoDB: ${JSON.stringify(error)}`)
        return Promise.reject(
          console.error(`Error saving data to DynamoDB: ${JSON.stringify(error)}`)
        );
      } else {
        return Promise.resolve(params.Item);
      }
    });
  }
}

export { Scraper };
