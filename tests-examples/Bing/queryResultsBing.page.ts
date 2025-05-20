import { Locator, Page, expect } from "@playwright/test";

export default class BingQueryResultsPage {
  readonly page: Page;
  readonly firstResultFields: Locator;
  readonly allResultFieldsWithoutAdds: Promise<Locator[]>;

  constructor(page: Page) {
    this.page = page;
    this.firstResultFields = this.page
      .locator('xpath=//ol[@id="b_results"]/li')
      .first();
    this.allResultFieldsWithoutAdds = this.page
      .locator(
        'xpath=//ol[@id="b_results"]/li[contains(@class, "b_algo")]/div[contains(@class, "b_tpcn")]/a[contains(@href, "https")]'
      )
      .all();
  }

  public async goto() {
    await this.page.goto("https://www.bing.com/search?q=Burgas");
  }

  public async getFirstElementContent(): Promise<string | null> {
    await this.firstResultFields.waitFor();
    return await this.firstResultFields.textContent();
  }

  public async getTopTenElem(): Promise<string[]> {
    const allResults = await this.allResultFieldsWithoutAdds;
    const temp: string[] = [];
    for (let i = 0; i < Math.min(allResults.length, 10); i++) {
      const href = await allResults[i].getAttribute("href");
      if (href) {
        console.log(href + "\n");
        temp.push(href);
      }
    }
    return temp;
  }
}
