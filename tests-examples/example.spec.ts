import { test, expect, Locator } from "@playwright/test";
import BingSearchPage from "../pages-pom/Bing/mainBing.page";
import BingQueryResultsPage from "../pages-pom/Bing/queryResultsBing.page";

test("Get the first element ", async ({ page }) => {
  const mainBingPage = new BingSearchPage(page);
  await mainBingPage.goto();
  await mainBingPage.sendSearchQuery("Burgas"); //sends search query

  const resultsBingPage = new BingQueryResultsPage(page);
  await resultsBingPage.goto();
  await console.log(resultsBingPage.getFirstElementContent());
  //returns the first element
  // await console.log(resultsBingPage.getFirstElementContent());
});

/*
test("Save the first 10 top href elements from the search result", async ({
  page,
}) => {
  const mainBingPage = new BingSearchPage(page);
  const resultsBingPage = new BingQueryResutsPage(page);

  //completes
  mainBingPage.sendSearchQuery("Burgas");
  console.log(resultsBingPage.getTopTenElem());
});
*/
