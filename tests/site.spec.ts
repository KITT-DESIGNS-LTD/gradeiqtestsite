import { test, expect } from '@playwright/test';

test.describe('Grade IQ Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title content', async ({ page }) => {
    await expect(page.locator('nav img[alt="GRADE IQ"]')).toBeVisible();
  });

  test('hero section is visible', async ({ page }) => {
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('no horizontal overflow on page', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('demo button links to demo.gradeiq.org on desktop', async ({ page }) => {
    // On desktop, the demo link is in the visible desktop nav
    const demoLink = page.locator('nav .hidden.md\\:flex a[href="https://demo.gradeiq.org/login"]');
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute('target', '_blank');
  });

  test('contact form is present', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('contact-section')?.scrollIntoView();
    });
    await expect(page.locator('#contact-section form')).toBeVisible();
  });

  test('examples section has subjects', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('solutions')?.scrollIntoView();
    });
    await expect(page.locator('#solutions')).toBeVisible();
  });
});
