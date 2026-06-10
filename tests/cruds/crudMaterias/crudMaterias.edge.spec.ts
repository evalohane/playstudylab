import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { MateriasPage } from '../../../pages/MateriasPage';

test.describe('CRUD Matérias - Borda', () => {
    test('deve exibir erro com numero de caracteres do nome do professor excedido', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateria('Inglês', 'a'.repeat(256), '7');
        await materiasPage.verificarErroCampo('O nome não pode ter mais de 255 caracteres.');
    });

    test('deve exibir erro ao tentar cadastrar matéria com semestre negativo', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateriaComSemestreNegativo('Inglês', 'Prof. João Silva', '-12');
        await materiasPage.verificarErroCampo('O semestre deve ser no mínimo 1.');
    });
});