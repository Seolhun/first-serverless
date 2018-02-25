import * as cheerio from 'cheerio';
import * as uuid from 'uuid';
import * as request from 'request-promise';

class Scraper {
  getPage(url: string) {
    return request({ method: 'GET', url })
  }

  parsePage(pageHtml: string) {
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

  saveToDb(data: string) {
    console.log(`In the save to db : ${data}`);
  }
}

export { Scraper };
