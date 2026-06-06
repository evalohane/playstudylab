import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe('CRUD Boletim - Borda', () => {
    // Mantém a execução sequencial se seus testes dependerem do estado um do outro
    test.describe.configure({ mode: 'serial' });

    let boletinsPage: BoletinsPage;

    // Executa o login UMA VEZ antes de cada teste do arquivo
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        boletinsPage = new BoletinsPage(page);

        await loginPage.goto();
        await loginPage.login('m4rimolima@gmail.com', 'Seinao04');
        
        // CRUCIAL: Garante que o login finalizou e a URL mudou antes de liberar o teste
        await page.waitForURL('**/dashboard', { timeout: 15000 });
        
        // Entra na página de boletins
        await boletinsPage.goto();
    });

    test('deve exibir erro ao tentar cadastrar nota parcial acima de 10', async () => {
        await boletinsPage.cadastrarNotaComNotaInvalida('246', '1', '90', '7');
        await boletinsPage.verificarErroCampo('Nota entre 0 e 10.');
    });

    test('deve exibir erro ao tentar cadastrar nota final acima de 10', async () => {
        await boletinsPage.cadastrarNotaComNotaInvalida('246', '1', '7', '78');
        await boletinsPage.verificarErroCampo('Nota entre 0 e 10.');
    });

    test('deve permitir cadastrar nota com ano futuro e excluir em seguida', async () => {
        await boletinsPage.cadastrarNota('246', '2', '6', '8', '2027');

        // Filtra por 2027 ANTES de verificar — a nota foi salva nesse ano
        await boletinsPage.filtrarPorAno('2027');
        await boletinsPage.verificarCadastro('2º Bimestre');

        // Limpar após o teste
        await boletinsPage.excluirNota(0);
    });
});