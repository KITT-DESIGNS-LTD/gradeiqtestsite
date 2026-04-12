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

  test('contact form controls stay compact on mobile', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('contact-section')?.scrollIntoView({ block: 'start' });
    });

    const getMetrics = async (selector: string) =>
      page.locator(selector).evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
          fontSize: parseFloat(style.fontSize),
          height: parseFloat(style.height),
          minHeight: parseFloat(style.minHeight),
          paddingTop: parseFloat(style.paddingTop),
          paddingBottom: parseFloat(style.paddingBottom),
          paddingLeft: parseFloat(style.paddingLeft),
          paddingRight: parseFloat(style.paddingRight),
        };
      });

    for (const selector of [
      '#contact-section input[name="name"]',
      '#contact-section input[name="email"]',
      '#contact-section input[name="company"]',
    ]) {
      const metrics = await getMetrics(selector);
      expect(metrics.fontSize).toBeLessThanOrEqual(16);
      expect(metrics.height).toBeLessThanOrEqual(56);
      expect(metrics.paddingLeft).toBeLessThanOrEqual(16);
      expect(metrics.paddingRight).toBeLessThanOrEqual(16);
    }

    const fieldSpacing = await page.locator('#contact-section input[name="name"]').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        leftGap: rect.left,
        rightGap: window.innerWidth - rect.right,
      };
    });
    expect(fieldSpacing.leftGap).toBeGreaterThanOrEqual(24);
    expect(fieldSpacing.rightGap).toBeGreaterThanOrEqual(24);

    const textareaMetrics = await getMetrics('#contact-section textarea[name="message"]');
    expect(textareaMetrics.fontSize).toBeLessThanOrEqual(16);
    expect(textareaMetrics.minHeight).toBeLessThanOrEqual(128);
    expect(textareaMetrics.paddingTop).toBeLessThanOrEqual(16);
    expect(textareaMetrics.paddingBottom).toBeLessThanOrEqual(16);

    const buttonMetrics = await getMetrics('#contact-section button[type="submit"]');
    expect(buttonMetrics.fontSize).toBeLessThanOrEqual(18);
    expect(buttonMetrics.height).toBeLessThanOrEqual(56);
    expect(buttonMetrics.paddingTop).toBeLessThanOrEqual(16);
    expect(buttonMetrics.paddingBottom).toBeLessThanOrEqual(16);
  });
});
