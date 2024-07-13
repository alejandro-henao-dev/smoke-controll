import type { Page, TestFixture } from "@playwright/test";

export class NavigatorHelper{
   
  constructor(private page: Page) { }
  
  async waitUntilReady() {
    await this.page.waitForLoadState('networkidle')
    await this.page.locator("#__nuxt")
  }

  async goToHome() {
    await this.page.goto(".")
    await this.waitUntilReady()
  }

  async goToConfig() {
    await this.page.goto("/config")
    await this.waitUntilReady()
  }

  async goBack() {
    await this.page.goBack()
    await this.waitUntilReady()
  }
}


export const NavigatorFixture: TestFixture<NavigatorHelper, { page: Page }> = async ({ page }, use) => {
  const helper = new NavigatorHelper(page);
  await use(helper);
};