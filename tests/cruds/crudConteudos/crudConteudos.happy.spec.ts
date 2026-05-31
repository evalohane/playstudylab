import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ConteudosPage } from '../../../pages/ConteudosPage';

test.describe('CRUD Conteúdos - Feliz', () => {
    test('deve cadastrar, ver, editar e excluir conteúdo com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const conteudosPage = new ConteudosPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await conteudosPage.goto();
        await conteudosPage.cadastrarConteudo('Química Organica', '140', 'Prof. Nayane Queiroz', '5');
        await conteudosPage.verificarCadastro('Química Organica');

        await conteudosPage.editarConteudo('Química Organica e Hidrocarbonetos');
        await conteudosPage.verificarEdicao('Química Organica e Hidrocarbonetos');

        await conteudosPage.excluirConteudo();
        await conteudosPage.verificarExclusao('Química Organica e Hidrocarbonetos');
    });
});