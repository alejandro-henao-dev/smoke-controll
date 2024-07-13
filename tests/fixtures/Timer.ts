import { test as base } from '@playwright/test';
import type { Fixtures, Page, PlaywrightTestArgs, TestFixture } from "@playwright/test";
import { relativeTimeByMin } from './utils/time';

export class TimerHelper{

  private staticDate?:Date
  constructor(private page:Page) { }
  
  async staticTime(date: Date = new Date()) {
    this.staticDate=date
    this.page.clock.setFixedTime(date)
  }
  async clickOnSmoke() {
    await this.page.getByLabel('smoke',{exact:true}).click()
    let timer = await this.page.getByLabel('timer on')
    await timer.waitFor({ state: "visible" })
    return timer
  }

  async clickOnNoSmoke() {
    await this.page.getByLabel('no smoke',{exact:true}).click()
    let timer = await this.page.getByLabel('timer on')
    await timer.waitFor({ state: "visible" })
    return timer
  }

  async runTimer(minutes: number, { waitTimerUpdate  = true, waitForState = "off" }: { waitTimerUpdate?: boolean, waitForState?: "on" | "off" } = {}) {
    if (this.staticDate) {
      this.staticDate = relativeTimeByMin(this.staticDate, minutes)
      await this.page.clock.setFixedTime(this.staticDate)
    } else {
      await this.page.clock.fastForward(minutes * 60 * 1000);  
    }
    
    if (waitTimerUpdate) {
      let timer = await this.page.getByLabel(`timer ${waitForState}`)
      await timer.waitFor({ state: "visible" })  
    }
    
  }
}

export const TimerFixture: TestFixture<TimerHelper, { page: Page }> = async ({ page }, use) => {
  await page.clock.install();
  const timerHelper = new TimerHelper(page);
  await use(timerHelper);
};