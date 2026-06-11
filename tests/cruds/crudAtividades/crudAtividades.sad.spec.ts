import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AtividadesPage } from '../../../pages/AtividadesPage';

test.describe('CRUD Atividades - Triste', () => {
    test('deve exibir erro ao tentar cadastrar atividade sem descricao', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const atividadesPage = new AtividadesPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await atividadesPage.goto();
        await atividadesPage.cadastrarAtividade('', '501', '1mes', 'pending');
        await atividadesPage.verificarErroCampo('Informe a descrição.');
    });
});