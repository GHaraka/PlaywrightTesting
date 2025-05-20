import { Locator, Page, expect } from "@playwright/test";

export default class BingSearchPage {
  readonly page: Page;
  readonly searchTextField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTextField = this.page.locator(
      'xpath = //textarea [@id="sb_form_q"]'
    );
  }

  public async goto() {
    console.log("Navigating to Bing...");
    await this.page.goto(`https://www.bing.com/`, {
      timeout: 150000,
      waitUntil: "domcontentloaded",
    });
    console.log("Navigation complete.");
  }

  public async sendSearchQuery(search_query: string) {
    await this.searchTextField.type(search_query);
    await this.page.keyboard.press("Enter");
  }
}
