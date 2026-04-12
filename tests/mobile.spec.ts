import { test, expect } from '@playwright/test';

const BARREL_END_RATIO = 1524.37 / 1710.36;

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

  test('hero pen stays smaller and offset left on mobile', async ({ page }) => {
    const penMetrics = await page
      .locator('section')
      .first()
      .locator('svg[viewBox="0 0 1710.36 149.808"]')
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const visibleLeft = Math.max(rect.left, 0);
        const visibleRight = Math.min(rect.right, window.innerWidth);

        return {
          right: rect.right,
          visibleWidth: Math.max(visibleRight - visibleLeft, 0),
          rightGap: Math.max(window.innerWidth - rect.right, 0),
          viewportWidth: window.innerWidth,
        };
      });

    expect(penMetrics.visibleWidth).toBeGreaterThanOrEqual(penMetrics.viewportWidth - 30);
    expect(penMetrics.rightGap).toBeLessThanOrEqual(30);
    expect(penMetrics.visibleWidth).toBeLessThanOrEqual(penMetrics.viewportWidth - 2);
    expect(penMetrics.rightGap).toBeGreaterThanOrEqual(2);
  });

  test('hero pen keeps its proportions on mobile', async ({ page }) => {
    const penMetrics = await page
      .locator('section')
      .first()
      .locator('svg[viewBox="0 0 1710.36 149.808"]')
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          aspectRatio: rect.width / rect.height,
        };
      });

    expect(penMetrics.aspectRatio).toBeGreaterThanOrEqual(8.5);
  });

  test('hero pen body is thicker without enlarging the tip on mobile', async ({ page }) => {
    const penMetrics = await page
      .locator('section')
      .first()
      .locator('svg[viewBox="0 0 1710.36 149.808"]')
      .evaluate((element) => {
        const [body, connector, tip] = Array.from(element.querySelectorAll('path'));
        const bodyRect = body.getBoundingClientRect();
        const connectorRect = connector.getBoundingClientRect();
        const tipRect = tip.getBoundingClientRect();

        return {
          bodyToTipHeightRatio: bodyRect.height / tipRect.height,
          connectorToTipHeightRatio: connectorRect.height / tipRect.height,
          tipHeight: tipRect.height,
        };
      });

    expect(penMetrics.bodyToTipHeightRatio).toBeGreaterThanOrEqual(0.9);
    expect(penMetrics.connectorToTipHeightRatio).toBeGreaterThanOrEqual(0.58);
    expect(penMetrics.tipHeight).toBeLessThanOrEqual(48.5);
  });

  test('hero word stays inside the purple bar on mobile', async ({ page }) => {
    const metrics = await page
      .locator('section')
      .first()
      .locator('svg[viewBox="0 0 1710.36 149.808"]')
      .evaluate((element, barrelEndRatio) => {
        const svgRect = element.getBoundingClientRect();
        const barrelRight = svgRect.left + svgRect.width * barrelEndRatio;
        const container = element.parentElement?.parentElement?.parentElement;
        const containerRect = container?.getBoundingClientRect();
        const spans = Array.from(container?.querySelectorAll('span') ?? []);
        const visibleWord = spans.find((span) => {
          const style = window.getComputedStyle(span);
          return style.visibility !== 'hidden' && span.getBoundingClientRect().width > 0;
        });

        if (!visibleWord || !containerRect) {
          throw new Error('Visible hero word not found');
        }

        const wordRect = visibleWord.getBoundingClientRect();
        const visibleWordCenterShift =
          wordRect.left + wordRect.width / 2 - (containerRect.left + containerRect.width / 2);
        const maxWordWidth = spans.reduce((maxWidth, span) => {
          return Math.max(maxWidth, span.getBoundingClientRect().width);
        }, 0);

        return {
          barrelRight,
          maxWordWidth,
          maxWordRight:
            containerRect.left +
            containerRect.width / 2 +
            visibleWordCenterShift +
          maxWordWidth / 2,
        };
      }, BARREL_END_RATIO);

    expect(metrics.maxWordRight).toBeLessThanOrEqual(metrics.barrelRight - 8);
  });

  test('hero word stays centered on mobile', async ({ page }) => {
    const metrics = await page
      .evaluate(() => {
        const generate = Array.from(document.querySelectorAll('h1')).find((el) =>
          el.textContent?.includes('GENERATE'),
        );
        const instantly = Array.from(document.querySelectorAll('h1')).find((el) =>
          el.textContent?.includes('INSTANTLY'),
        );
        const svg = document.querySelector('svg[viewBox="0 0 1710.36 149.808"]');
        const container = svg?.parentElement?.parentElement?.parentElement;
        const containerRect = container?.getBoundingClientRect();
        const visibleWord = Array.from(container?.querySelectorAll('span') ?? []).find((span) => {
          const style = window.getComputedStyle(span);
          return style.visibility !== 'hidden' && span.getBoundingClientRect().width > 0;
        });

        if (!generate || !instantly || !svg || !visibleWord || !containerRect) {
          throw new Error('Visible hero nodes not found');
        }

        const generateRect = generate.getBoundingClientRect();
        const instantlyRect = instantly.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        const wordRect = visibleWord.getBoundingClientRect();
        const [body] = Array.from(svg.querySelectorAll('path'));
        const bodyRect = body.getBoundingClientRect();

        return {
          containerCenter: containerRect.left + containerRect.width / 2,
          wordCenter: wordRect.left + wordRect.width / 2,
          generateToPen: svgRect.top - generateRect.bottom,
          penToInstantly: instantlyRect.top - svgRect.bottom,
          wordTopInset: wordRect.top - svgRect.top,
          wordBottomInset: svgRect.bottom - wordRect.bottom,
          bodyInsetDelta:
            (bodyRect.bottom - wordRect.bottom) - (wordRect.top - bodyRect.top),
        };
      });

    expect(Math.abs(metrics.wordCenter - metrics.containerCenter)).toBeLessThanOrEqual(6);
    expect(metrics.generateToPen).toBeGreaterThanOrEqual(22);
    expect(metrics.generateToPen).toBeLessThanOrEqual(24);
    expect(metrics.penToInstantly).toBeLessThanOrEqual(18.5);
    expect(metrics.wordBottomInset - metrics.wordTopInset).toBeLessThanOrEqual(2.5);
    expect(Math.abs(metrics.bodyInsetDelta)).toBeLessThanOrEqual(1.1);
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
