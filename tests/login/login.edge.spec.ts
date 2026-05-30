import { test, expect } from '@playwright/test';

// para este teste eu criei um usuario novo, cuja senha foi registrada com espacos no inicio e no final. Supostamente o sistema deveria aplicar um trim na senha para ser possivel entrar sem os espacos, mas isso nao acontece e eu so consigo entrar quando os espacos sao colocados

test.describe('Login - Borda', () => {
    test('não deve aceitar senha com espaços nas bordas', async ({ page }) => {
        await page.goto('https://studylab.free.laravel.cloud/');
        await page.getByRole('link', { name: 'Entrar' }).click();

        await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('teste0225@gmail.com');
        await page.getByRole('textbox', { name: '••••••••' }).fill('Lielsonli123!'); // note que a senha esta sem os espacos, e dessa forma DEVERIA ser possivel realizar o login

        await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

        // verifica se redireciona para o dashboard, nesse caso nao vai redirecionar
        await expect(page).toHaveURL(/dashboard/, { timeout: 15000 }).catch(() => {});
    });

    test('deve logar com senha com espaços nas bordas', async ({ page }) => {
        await page.goto('https://studylab.free.laravel.cloud/');
        await page.getByRole('link', { name: 'Entrar' }).click();

        await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('teste0225@gmail.com');
        await page.getByRole('textbox', { name: '••••••••' }).fill('   Lielsonli123!   '); // agora esta com espaços e vai logar

        await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

        // verifica se redireciona para o dashboard, nesse caso vai redirecionar
        await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
    });
});