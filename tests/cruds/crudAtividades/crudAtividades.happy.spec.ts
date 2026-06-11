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
        await atividadesPage.cadastrarAtividade('Fazer modelo entidade relacionamento', '501', '1mes', 'pending');
        await atividadesPage.verificarCadastro('Fazer modelo entidade relacionamento');

        await atividadesPage.editarAtividade('Fazer modelo entidade relacionamento do banco de dados');
        await atividadesPage.verificarEdicao('Fazer modelo entidade relacionamento do banco de dados');

        await atividadesPage.excluirAtividade();
        await atividadesPage.verificarExclusao('Fazer modelo entidade relacionamento do banco de dados');
    });
});