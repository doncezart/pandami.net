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
