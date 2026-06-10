import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { MateriasPage } from '../../../pages/MateriasPage';

test.describe('CRUD Matérias - Triste', () => {
    test('deve exibir erro ao tentar cadastrar professor com números/caracteres especiais', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateria('Inglês', '12345678', '5');
        await materiasPage.verificarErroCampo('O campo professor não pode conter números ou caracteres especiais.');
    });

    test('deve exibir erro ao tentar cadastrar uma matéria sem selecionar a matéria', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateria('', 'Prof. Claúdio', '8');
        await materiasPage.verificarErroCampo('Selecione ou informe a matéria.');
    });
});