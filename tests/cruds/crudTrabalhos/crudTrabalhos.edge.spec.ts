import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Borda: Create e Edit', () => {
    let trabalhoPage: TrabalhoPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    // Loga apenas UMA vez para otimizar o tempo e evitar timeouts de redirecionamento
    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        trabalhoPage = new TrabalhoPage(paginaGlobal);

        // 1. Acessa a página de login
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        // 2. Clica em entrar e aguarda o término das requisições de rede do login (ir para o dashboard)
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        // 3. Navega de forma segura para a rota de trabalhos
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');
        
        // 4. Aguarda o cabeçalho carregar na tela com tolerância de 30s
        await paginaGlobal.getByRole('heading', { name: 'Meus Trabalhos' }).waitFor({ state: 'visible', timeout: 30000 });
    });

    test('Usuário tenta cadastrar um trabalho com descrição acima de 100 caracteres', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.locator('#workType').selectOption('Artigo');
        
        // Injeta uma string de 101 caracteres de forma nativa e limpa no campo
        await paginaGlobal.locator('#workDescription').fill('A'.repeat(101));

        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataFutura(5));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('A descrição deve ter no máximo 100 caracteres.', { exact: false })).toBeVisible();
    });

    test('Usuário edita um trabalho e muda a data para ontem', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        // Cria o registro necessário para este teste de forma independente
        await trabalhoPage.cadastrarTrabalho(paginaGlobal, 'Trabalho de revisão', trabalhoPage.dataFutura(5));

        await paginaGlobal.locator('tr', { hasText: 'Trabalho de revisão' })
            .getByRole('button', { name: 'Editar' })
            .first()
            .click();

        await paginaGlobal.locator('#workDueDate').waitFor({ state: 'visible' });
        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataPassada(1));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('A data não pode estar no passado.', { exact: false })).toBeVisible();
    });
});