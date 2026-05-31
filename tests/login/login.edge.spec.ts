import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// para este teste eu criei um usuario novo, cuja senha foi registrada com espacos no inicio e no final. Supostamente o sistema deveria aplicar um TRIM na senha para ser possivel entrar sem os espacos, mas isso nao acontece e eu so consigo entrar quando os espacos sao colocados

test.describe('Login - Borda', () => {
    test('não deve logar quando senha cadastrada com espaços é digitada sem espaços', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await page.locator('#togglePwd').click();
        await loginPage.login('teste0225@gmail.com', 'Lielsonli123!'); // note que a senha esta sem os espacos, e dessa forma DEVERIA funcionar, mas nao vai redirecionar para o dashboard e sim dar erro
        await loginPage.verificarErroCredenciais();
    });

    test('deve logar quando senha cadastrada com espaços é digitada com espaços', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await page.locator('#togglePwd').click();
        await loginPage.login('teste0225@gmail.com', '   Lielsonli123!   '); // com espaços, vai funcionar e entrar no dashboard
    });
});