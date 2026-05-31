import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { MateriasPage } from '../../../pages/MateriasPage';

test.describe('CRUD Matérias - Borda', () => {
    test('deve verificar se é possível cadastrar nome do professor com números', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateria('Física', '12345678', '9');
        await materiasPage.verificarErroCampo('O campo professor não pode conter números.');
    });
});