import type { Page, TestFixture } from "@playwright/test";
import type { NavigatorHelper } from "./navigator";
import type { ConfigPageHelper } from "./configPage";

export class ActionsHelper{

  constructor(
    private page: Page,
    private navigator: NavigatorHelper,
    private configPage: ConfigPageHelper
  ) { }
  

  async setConfig(config: { minutes?: number, maxUnits?: number,goBack?:boolean, resetData?:boolean }) {
    await this.navigator.goToConfig()
    
    config.minutes && await this.configPage.setMinutesInBetween(config.minutes)

    config.maxUnits && await this.configPage.setMaxCigarsPerDay(config.maxUnits)

    if(config.resetData === undefined || config.resetData) await this.configPage.clearData()
    
    if(config.goBack === undefined || config.goBack) await this.navigator.goBack()
  }
  
}

export const ActionsFixture: TestFixture<ActionsHelper, {
  page:Page,navigator:NavigatorHelper,configPage:ConfigPageHelper
}> = (
  {page,navigator,configPage},use
) => {
  
  use(new ActionsHelper(page,navigator,configPage))
}