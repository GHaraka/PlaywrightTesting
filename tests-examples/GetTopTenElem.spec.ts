import { test, expect, Locator } from "@playwright/test";

test("Save the first 10 top href elements from the search result", async ({
  page,
}) => {
  await page.goto("https://www.bing.com");
  await page.getByLabel("Search the web").locator("svg").click(); // Not sure if this is needed
  const searchInput = await page.getByRole("textbox", {
    name: "characters out of 2000",
  });
  await searchInput.fill("Burgas");
  await page.waitForTimeout(3000);
  await page.keyboard.press("Enter");

  await page
    .locator('xpath=//ol[@id="b_results"]/li[@class="b_algo"]')
    .last()
    .waitFor({ state: "visible", timeout: 10000 });

  //This is valid only for Bing and their used ids specifically for Bing
  const topHeaderLinks: Locator[] = []; /* await page
    .locator('xpath=//ol[@id="b_topw"]/li[@class="b_ans"]')
    .all(); */
  const resultsHeaderlinks: Locator[] = await page
    .locator(
      'xpath=//ol[@id="b_results"]/li[contains(@class, "b_algo")]/div[contains(@class, "b_tpcn")]/a[contains(@href, "https")]'
    )
    .all();

  const allHeaderLinks: Locator[] = resultsHeaderlinks.concat(topHeaderLinks);
  console.log(allHeaderLinks.length + "\n");

  for (let i = 0; i < Math.min(allHeaderLinks.length, 10); i++) {
    console.log((await allHeaderLinks[i].getAttribute("href")) + "\n");
  }
});
