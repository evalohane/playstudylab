import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AtividadesPage } from '../../../pages/AtividadesPage';

test.describe('CRUD Atividades - Feliz', () => {
    test('deve cadastrar, ver, editar e excluir atividade com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const atividadesPage = new AtividadesPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await atividadesPage.goto();
        await atividadesPage.cadastrarAtividade('Fazer roteiro do teatro', '136', '1mes', 'pending');
        await atividadesPage.verificarCadastro('Fazer roteiro do teatro');

        await atividadesPage.editarAtividade('Fazer roteiro do teatro para o Sao Joao da EEEP 2026');
        await atividadesPage.verificarEdicao('Fazer roteiro do teatro para o Sao Joao da EEEP 2026');

        await atividadesPage.excluirAtividade();
        await atividadesPage.verificarExclusao('Fazer roteiro do teatro para o Sao Joao da EEEP 2026');
    });
});