import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe('CRUD Boletim - Feliz', () => {
    test.describe.configure({ mode: 'serial' });

    test('deve cadastrar, ler, editar e excluir nota com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const boletinsPage = new BoletinsPage(page);

        await loginPage.goto();
        await loginPage.login('m4rimolima@gmail.com', 'Seinao04');
        await loginPage.verificarLogin();

        await boletinsPage.goto();

        // CREATE — usa 4º bimestre para evitar conflito com dados existentes
        await boletinsPage.cadastrarNota('246', '4', '7', '7');
        await boletinsPage.verificarCadastro('4º Bimestre');

        // READ — verifica os dados na tabela (ano 2026 já está selecionado por padrão)
        await boletinsPage.lerNota('4º Bimestre', '7', '7');

        // UPDATE
        await boletinsPage.editarNota(0, '8', '9');
        await boletinsPage.verificarEdicao('8');

        // DELETE
        await boletinsPage.excluirNota(0);
        await boletinsPage.verificarExclusao('4º Bimestre');
    });
});