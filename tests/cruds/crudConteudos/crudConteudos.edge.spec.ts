import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ConteudosPage } from '../../../pages/ConteudosPage';

test.describe('CRUD Conteúdos - Borda', () => {
    test('deve exibir erro ao tentar cadastrar conteudo com caracteres especiais no nome', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const conteudosPage = new ConteudosPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await conteudosPage.goto();
        await conteudosPage.cadastrarConteudo('$#@%!0225', '140', 'Prof. Nayane Queiroz', '9');
        await conteudosPage.verificarErroCampo('O nome do conteúdo não pode conter números ou caracteres especiais.');
    });

    test('deve exibir erro ao tentar editar conteudo com semestre acima do limite', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const conteudosPage = new ConteudosPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await conteudosPage.goto();
        await conteudosPage.editarConteudoComSemestreMaior('25');
        await conteudosPage.verificarErroCampo('O semestre não pode ser maior que 20.');
    });
});