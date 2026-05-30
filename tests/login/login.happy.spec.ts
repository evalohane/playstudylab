import { test, expect } from '@playwright/test';

test('deve realizar login com sucesso', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Entrar' }).click();

    await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('evaomnibus@oisaulo.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Lielsonli123!');

    await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

    // verifica se redereciona para dashboard
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
});