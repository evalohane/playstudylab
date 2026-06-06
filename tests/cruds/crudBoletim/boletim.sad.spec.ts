import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe('CRUD Boletim - Triste', () => {
    test.describe.configure({ mode: 'serial' });

    test('deve exibir erro ao tentar cadastrar nota parcial vazia', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const boletinsPage = new BoletinsPage(page);

        await loginPage.goto();
        await loginPage.login('m4rimolima@gmail.com', 'Seinao04');
        await loginPage.verificarLogin();

        await boletinsPage.goto();
        await boletinsPage.cadastrarNotaComNotaInvalida('246', '1', '', '7');
        await boletinsPage.verificarErroCampo('Nota entre 0 e 10.');
    });

    test('deve exibir erro ao tentar cadastrar nota final vazia', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const boletinsPage = new BoletinsPage(page);

        await loginPage.goto();
        await loginPage.login('m4rimolima@gmail.com', 'Seinao04');
        await loginPage.verificarLogin();

        await boletinsPage.goto();
        await boletinsPage.cadastrarNotaComNotaInvalida('246', '1', '7', '');
        await boletinsPage.verificarErroCampo('Nota entre 0 e 10.');
    });
});