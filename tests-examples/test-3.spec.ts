import { test, expect, defineConfig } from "@playwright/test";

test("human like behaviour", async ({ page }) => {
  await page.goto("https://www.google.com");
  await page.waitForTimeout(1150);
  // Accept cookies if required
  try {
    //await page.getByText("Accept all").click();
    await page.getByRole("button", { name: "Отхвърляне на всички" }).click();
  } catch (e) {
    console.log("No cookie popup detected");
  }

  await page.getByRole("combobox", { name: "Търс" }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("combobox", { name: "Търс" })
    .fill("Yellow", { timeout: 1200 });
  await page.keyboard.press("Enter");

  /*
// Navigate to Google
  

  

  // Fill search box and add a realistic typing delay
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright automation', { delay: 100 });

  // Simulate pressing Enter
  await page.keyboard.press('Enter');

  // Wait for results
  await page.waitForSelector('h3');
  const firstResult = await page.locator('h3').first();
  await firstResult.click();

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // Optional: Screenshot the result
  await page.screenshot({ path: 'google_search_result.png' });
  */
});
