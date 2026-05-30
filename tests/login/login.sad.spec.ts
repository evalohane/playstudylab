import { test, expect } from '@playwright/test';

test('deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');
    await page.getByRole('link', { name: 'Entrar' }).click();

    await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('email@errado.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('senhaerrada');

    await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

    // verifica se aparece mensagem de erro
    await expect(page.getByText('Credenciais inválidas')).toBeVisible();
});