import { test, expect } from './fixtures';


test.beforeEach(async ({ page,navigator, baseURL }) => {
  await navigator.goToHome()
});


test.describe('timer', () => {
  test('Should have a "can smoke" initial state', async ({ page }) => {
    await expect(page.getByLabel('smoke')).toBeVisible();
    await expect(page.getByText('--:--:--')).toBeVisible();
  });

  test('Timer should start counting after clicking on smoke button', async ({ page,timer,actions }) => {
    
    await actions.setConfig({ minutes: 10, maxUnits: 10 })
    await timer.staticTime()
    
    await timer.clickOnSmoke()
    
    await expect(page.getByText("1 / 10")).toBeVisible()
    await expect(page.getByText('00:10:00')).toBeVisible()

    await timer.runTimer(1,{waitTimerUpdate:false});
    
    await expect(page.getByLabel('timer on')).toHaveText("00:09:00")
    
  });

  test("Timer run out and button gets enabled", async ({ page,timer,actions }) => {
    const config = { minutes: 90, maxUnits: 10 }
    
    await actions.setConfig(config)
    await timer.staticTime()
    
    await timer.clickOnSmoke()
    
    await expect(await page.getByLabel('no smoke')).toBeVisible()
    await expect(page.getByText('01:30:00')).toBeVisible()
    await timer.runTimer(config.minutes)
    
    await expect(page.getByText('--:--:--')).toBeVisible();

  })
})

test.describe("smoking", () => {
  test("Smoking multiple times after waiting time resets the timer to config value", async ({ page,  timer,actions }) => {
    const config = { minutes: 90, maxUnits: 10 }
    
    await actions.setConfig(config)
    await timer.staticTime()
    
    await timer.clickOnSmoke()
    await timer.runTimer(config.minutes)
    await expect(page.getByText('--:--:--')).toBeVisible();
    await expect(page.getByText("1 / 10")).toBeVisible()
   
   
    await timer.clickOnSmoke()
    await timer.runTimer(config.minutes)
    await expect(page.getByText('--:--:--')).toBeVisible();
    await expect(page.getByText("2 / 10")).toBeVisible()
  })

  test("smoking pass waiting time does not reduce next waiting time", async ({
    actions,page,timer
  }) => {
    const config = { minutes: 90, maxUnits: 10 }
    
    await actions.setConfig(config)
    await timer.staticTime(new Date(2024, 7, 7, 10, 0))
    
    await timer.clickOnSmoke()
    await timer.runTimer(config.minutes * 2)
    await expect(page.getByText('--:--:--')).toBeVisible();
    await expect(page.getByText("1 / 10")).toBeVisible()
   
    
    await timer.clickOnSmoke()
    await expect(page.getByText("2 / 10")).toBeVisible()
    await expect(page.getByText('01:30:00')).toBeVisible();
    await timer.runTimer(config.minutes)
    await expect(page.getByText('--:--:--')).toBeVisible();
    
  })

  test("smoking before waiting time ends, accumulate waiting time", async ({
    page,actions,timer
  }) => {
    const config = { minutes: 90, maxUnits: 10 }
    await actions.setConfig(config)
    await timer.staticTime(new Date(2024, 7, 7, 10, 0))
    
    await timer.clickOnSmoke()
    await expect(page.getByText("1 / 10")).toBeVisible()
    await expect(page.getByText('01:30:00')).toBeVisible();
    
    await timer.runTimer(45, { waitTimerUpdate: false })
    await expect(page.getByText('00:45:00')).toBeVisible();
    
    await timer.clickOnNoSmoke()
    await expect(page.getByText("2 / 10")).toBeVisible()
    await expect(page.getByText('02:15:00')).toBeVisible();
    

    await timer.runTimer(120, { waitTimerUpdate: false })
    await expect(page.getByText('00:15:00')).toBeVisible();

    await timer.clickOnNoSmoke()
    await expect(page.getByText("3 / 10")).toBeVisible()
    await expect(page.getByText('01:45:00')).toBeVisible();

    await timer.runTimer(120, { waitForState: "off" })
    
    await timer.clickOnSmoke()
    await expect(page.getByText("4 / 10")).toBeVisible()
    await expect(page.getByText('01:30:00')).toBeVisible();

  })
})