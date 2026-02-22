import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("home page visual snapshot", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("home.png");
});
