import { test, expect, Locator } from "@playwright/test";
import LoginForm from "../pages-pom/PractiseTestAuto/loginForm.page";
import "../scripts/load_validateEnv";

const username = `${process.env.LOGIN_USER}`;
const password = `${process.env.LOGIN_PASS}`;
const base_url = `${process.env.BASE_URL}`;

test.describe("Positive Login Test Cases", () => {
  test("Positive Login test", async ({ page }) => {
    const loginPage = new LoginForm(page);
    await loginPage.goto(base_url);
    await loginPage.enterLoginCredentials(username, password);
    await loginPage.verifySuccessfulLogin();
  });
});

test.describe("Negative Login Test Cases", () => {
  test("Negative Username test", async ({ page }) => {
    const loginPage = new LoginForm(page);
    await loginPage.goto(base_url);
    await loginPage.enterLoginCredentials("incorrectUser", password, true);
    await expect(loginPage.errorMessage).toContainText(
      "Your username is invalid!"
    );
  });

  test("Negative Password test", async ({ page }) => {
    const loginPage = new LoginForm(page);
    await loginPage.goto(base_url);
    await loginPage.enterLoginCredentials(username, "incorrectPassword", true);
    await expect(loginPage.errorMessage).toContainText(
      "Your password is invalid!"
    );
  });
});
