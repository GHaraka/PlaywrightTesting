import { Locator, Page, expect } from "@playwright/test";

export default class LoginForm {
  readonly page: Page;
  readonly usernameTextField: Locator;
  readonly passwordtextField: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly logOutButton: Locator;
  readonly postHeader: Locator;
  readonly postContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextField = this.page.getByRole("textbox", {
      name: "Username",
    });

    this.passwordtextField = this.page.getByRole("textbox", {
      name: "Password",
    });
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.errorMessage = this.page.locator("#error");
    this.logOutButton = this.page.getByRole("link", { name: "Log out" });
    this.postHeader = this.page.getByRole("heading", {
      name: "Logged In Successfully",
    });
    this.postContent = this.page.getByText("Congratulations student. You");
  }

  public async goto(url: string): Promise<void> {
    await console.log("Navigating to Practise Test Login Form...");
    await this.page.goto(`${url}/practice-test-login/`, {
      timeout: 15000,
      waitUntil: "domcontentloaded",
    });
    await console.log("Navigation complete.");
  }

  public async enterLoginCredentials(
    username: string,
    password: string,
    expectError: boolean = false
  ): Promise<void> {
    await this.usernameTextField.fill(username);
    await this.passwordtextField.fill(password);
    await this.submitButton.click();

    if (expectError) {
      await expect(this.errorMessage).toBeVisible();
      // I still need to test if the issue is either in the username or password,
      // in creating it this way, I'm not able to distinguuish if the error is either in the username or password, only that that there is an error
      //Currently I'm doing this directly in the tests
    } else {
      await console.log("does this work");
      await this.verifySuccessfulLogin();
    }
  }

  public async verifySuccessfulLogin(): Promise<void> {
    await this.page.waitForURL(/.*logged-in-successfully\//, {
      timeout: 10000,
    });
    await expect(this.postHeader).toHaveText("Logged In Successfully");
    await expect(this.postHeader).toHaveText("Logged In Successfully", {
      timeout: 15000,
    });
    await expect(this.postContent).toContainText(
      "Congratulations student. You successfully logged in!"
    );
    await this.logOutButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(this.logOutButton).toBeEnabled();
    await Promise.all([
      this.page.waitForURL(
        /.*practicetestautomation\.com\/practice-test-login\//
      ),
      this.logOutButton.click(),
    ]);
    //await console.log("Alles is sehr shon mine libliengs freunde!");
  }
}
