import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { MateriasPage } from '../../../pages/MateriasPage';

test.describe('CRUD Matérias - Feliz', () => {
    test('deve cadastrar, ver, editar e excluir matéria com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const materiasPage = new MateriasPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await materiasPage.goto();
        await materiasPage.cadastrarMateria('Filosofia', 'Ana Claudia', '10');
        await materiasPage.verificarCadastro('Filosofia');

        await materiasPage.editarMateria('Prof. Ana Claudia Anibal');
        await materiasPage.verificarEdicao('Prof. Ana Claudia Anibal');

        await materiasPage.excluirMateria();
        await materiasPage.verificarExclusao('Filosofia');
    });
});