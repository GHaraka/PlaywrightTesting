import { test, expect, Locator } from "@playwright/test";

test("Get First Result Element", async ({ page }) => {
  await page.goto("https://www.bing.com");
  const searchInput = await page.getByRole("textbox");
  await searchInput.type("El Salvador");
  await page.keyboard.press("Enter");

  //await page.waitForSelector('xpath=//ol[@id="b_results"]/li[1]');
  const resultLinks = await page
    .locator('xpath=//ol[@id="b_results"]/li')
    .first()
    .textContent();
  console.log(resultLinks);
});
