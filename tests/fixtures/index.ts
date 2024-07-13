import { test as base } from '@playwright/test';
import {  TimerHelper,TimerFixture } from './Timer';
import { NavigatorFixture, type NavigatorHelper } from './navigator';
import { ConfigPageFixture, type ConfigPageHelper } from './configPage';
import { ActionsFixture, ActionsHelper } from './actions';

// Declare the types of your fixtures.
type MyFixtures = {
  timer: TimerHelper;
  navigator: NavigatorHelper
  configPage: ConfigPageHelper,
  actions: ActionsHelper
};


export const test = base.extend<MyFixtures>({
  timer: TimerFixture,
  navigator: NavigatorFixture,
  configPage: ConfigPageFixture,
  actions:ActionsFixture
});


export { expect } from '@playwright/test';