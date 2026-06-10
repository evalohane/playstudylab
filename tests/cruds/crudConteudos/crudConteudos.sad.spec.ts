import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ConteudosPage } from '../../../pages/ConteudosPage';

test.describe('CRUD Conteúdos - Triste', () => {
    test('deve exibir erro ao tentar cadastrar conteudo sem selecionar materia', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const conteudosPage = new ConteudosPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await conteudosPage.goto();
        await conteudosPage.cadastrarConteudo('Fundamentos de Machine Learning', '', 'Prof. Renan Moreira', '8');
        await conteudosPage.verificarErroCampo('Selecione a matéria.');
    });

    test('deve exibir erro ao tentar salvar conteudo com nome vazio', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const conteudosPage = new ConteudosPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await conteudosPage.goto();
        await conteudosPage.editarConteudoParaSemNome('');
        await conteudosPage.verificarErroCampo('Informe o nome do conteúdo.');
    });
});