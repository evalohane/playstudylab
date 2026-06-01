import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - Triste',() => {
    test('deve exibir erro com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('email@errado.com', 'senhaerrada');
        await loginPage.verificarErroCredenciais('Credenciais inválidas');
    });
});