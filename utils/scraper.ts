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
    const TableName = process.env.DYNAMODB_TABLE;
    if (!TableName) {
      throw Error('Not found TableName');
    }
    const params = {
      TableName,
      Item: {
        id: uuid.v4(),
        url,
        data,
        active: true,
        created_at: new Date().getTime(),
      }
    };

    dynamoDb.put(params, error => {
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
