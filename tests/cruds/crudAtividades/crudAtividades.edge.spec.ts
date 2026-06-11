import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AtividadesPage } from '../../../pages/AtividadesPage';

test.describe('CRUD Atividades - Borda', () => {
    test('deve exibir erro ao tentar cadastrar atividade com data no passado', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const atividadesPage = new AtividadesPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await atividadesPage.goto();
        await atividadesPage.cadastrarAtividadeComDataPassada('Trabalho de mobile', '501', '2026-05-30', 'pending');
        await atividadesPage.verificarErroCampo('A data não pode estar no passado.');
    });
});