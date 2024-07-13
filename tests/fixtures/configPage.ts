import type { Page, TestFixture } from "@playwright/test";
import type { NavigatorHelper } from "./navigator";
import { clearInput } from "./utils/clearInput";

export class ConfigPageHelper{
  constructor(private page: Page, private navigator:NavigatorHelper) { }
  

  async getMinutesInBetween() {
    return await (await this.page.getByLabel('Minutes in between')).inputValue()
  }

  async getMaxPerDay() {
    await (await this.page.getByLabel('Max per day')).inputValue()
  }

  async setMinutesInBetween(minutes: number){
    const minInput = await this.page.getByLabel('Minutes in between')
    await clearInput(minInput,this.page)
    await minInput.pressSequentially(minutes.toString(), {
      delay:50
    })
  }

  async setMaxCigarsPerDay(units:number) {
    const maxInput = await this.page.getByLabel('Max per day')
    await clearInput(maxInput, this.page)
    await maxInput.pressSequentially(units.toString(), {
      delay:50
    })
  }

  async clearData() {
    await this.page.getByRole('button', { name: 'Reset Data' }).click(); 
  }

}

export const ConfigPageFixture: TestFixture<ConfigPageHelper, { page: Page,navigator:NavigatorHelper }> = async ({ page,navigator }, use) => {
  const helper = new ConfigPageHelper(page,navigator);
  await use(helper);
};