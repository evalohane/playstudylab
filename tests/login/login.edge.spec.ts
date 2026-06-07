import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - Borda', () => {
    test('não deve logar com email e senha vazios', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('', '');
        await expect(page).toHaveURL(/login/);
    });
});