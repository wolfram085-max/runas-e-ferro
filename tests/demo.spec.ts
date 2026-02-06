import { test, expect } from "@playwright/test";

test("fluxo demo abre páginas principais", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Runas e Ferro Studio" })).toBeVisible();

  await page.getByRole("link", { name: "Ver Demo guiada" }).click();
  await expect(page.getByRole("heading", { name: "Fluxo Demo Completo" })).toBeVisible();

  await page.getByRole("link", { name: "Sala em tempo real" }).click();
  await expect(page.getByRole("heading", { name: "Sala em tempo real" })).toBeVisible();
});
