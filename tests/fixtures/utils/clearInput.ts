import type { Locator, Page } from "@playwright/test";

export const clearInput = async (locator:Locator,page:Page) => {
  await locator.focus();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Backspace");
}