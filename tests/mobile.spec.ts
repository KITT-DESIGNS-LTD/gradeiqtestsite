import { test, expect } from '@playwright/test';

test.describe('Mobile responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('hamburger menu is visible on mobile', async ({ page }) => {
    const hamburger = page.locator('nav button.md\\:hidden');
    await expect(hamburger).toBeVisible();
  });

  test('mobile menu opens and shows demo link', async ({ page }) => {
    const hamburger = page.locator('nav button.md\\:hidden');
    await hamburger.click();
    // Select the demo link visible in the mobile overlay
    const demoLinks = page.locator('a[href="https://demo.gradeiq.org/login"]');
    const count = await demoLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
    // At least one should be visible
    let foundVisible = false;
    for (let i = 0; i < count; i++) {
      if (await demoLinks.nth(i).isVisible()) {
        foundVisible = true;
        break;
      }
    }
    expect(foundVisible).toBe(true);
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    const desktopNav = page.locator('nav .hidden.md\\:flex');
    await expect(desktopNav).toBeHidden();
  });
});
