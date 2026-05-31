import { test, expect } from '@playwright/test';

test('homepage has JSON-LD structured data', async ({ page }) => {
  await page.goto('/');
  const ldJson = await page.$('script[type="application/ld+json"]');
  expect(ldJson).not.toBeNull();
  const content = await ldJson!.textContent();
  const data = JSON.parse(content!);
  expect(data['@type']).toBe('ProfessionalService');
  expect(data.name).toBe('Pandami');
});

test('homepage has global og:site_name and og:image', async ({ page }) => {
  await page.goto('/');
  const siteName = await page.$eval(
    'meta[property="og:site_name"]',
    (el) => el.getAttribute('content')
  );
  expect(siteName).toBe('Pandami');

  const ogImage = await page.$eval(
    'meta[property="og:image"]',
    (el) => el.getAttribute('content')
  );
  expect(ogImage).toBe('https://pandami.net/og.png');
});

test('homepage has canonical URL', async ({ page }) => {
  await page.goto('/');
  const canonical = await page.$eval(
    'link[rel="canonical"]',
    (el) => el.getAttribute('href')
  );
  expect(canonical).toBe('https://pandami.net/');
});

test('services page has canonical URL', async ({ page }) => {
  await page.goto('/services');
  const canonical = await page.$eval(
    'link[rel="canonical"]',
    (el) => el.getAttribute('href')
  );
  expect(canonical).toBe('https://pandami.net/services');
});

test('cookie banner shows on first visit and can be dismissed', async ({ page, context }) => {
  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());

  await page.goto('/');
  const banner = page.locator('[aria-label="Cookie notice"]');
  await expect(banner).toBeVisible();

  await page.click('text=Got it');
  await expect(banner).not.toBeVisible();

  const consent = await page.evaluate(() => localStorage.getItem('pandami-consent'));
  expect(consent).toBe('1');
});

test('cookie banner does not show on repeat visit', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('pandami-consent', '1'));
  await page.goto('/');
  const banner = page.locator('[aria-label="Cookie notice"]');
  await expect(banner).not.toBeVisible();
});

test('404 page shows correct content and back button', async ({ page }) => {
  await page.goto('/this-page-does-not-exist-at-all');
  await expect(page.locator('h1')).toContainText('Page not found');
  const backBtn = page.locator('a[href="/"]');
  await expect(backBtn).toBeVisible();
});

test('privacy page loads with correct title', async ({ page }) => {
  const response = await page.goto('/privacy');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Privacy Policy/);
});

test('terms page loads with correct title', async ({ page }) => {
  const response = await page.goto('/terms');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Terms of Service/);
});
