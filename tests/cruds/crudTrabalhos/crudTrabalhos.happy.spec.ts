import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Felizes: Create, Edit e Delete', () => {
    let trabalhoPage: TrabalhoPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    // Realiza o login uma única vez antes de iniciar a sequência de testes
    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        trabalhoPage = new TrabalhoPage(paginaGlobal);

        // 1. Acessa a página de login
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        // 2. Clica em entrar e aguarda o término das requisições de rede do login
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        // 3. Navega diretamente para a rota de trabalhos
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');
        
        // 4. Aguarda o título principal carregar na tela com tolerância de 30s
        await paginaGlobal.getByRole('heading', { name: 'Meus Trabalhos' }).waitFor({ state: 'visible', timeout: 30000 });
    });

    test('Usuário pode cadastrar um trabalho', async () => {
        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.locator('#workType').selectOption('Artigo');
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Pesquisa sobre IA');
        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataFutura(5));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('Trabalho criado com sucesso!', { exact: false })).toBeVisible();
    });

    test('Usuário pode editar um trabalho', async () => {
        // Garante que está na listagem atualizada antes de buscar o registro
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await paginaGlobal.locator('tr', { hasText: 'Pesquisa sobre IA' })
            .getByRole('button', { name: 'Editar' })
            .first()
            .click();

        await paginaGlobal.locator('#workType').waitFor({ state: 'visible' });
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Pesquisa sobre IA atualizada');
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('Trabalho atualizado!', { exact: false })).toBeVisible();
    });

    test('Usuário pode deletar um trabalho', async () => {
        // Garante que está na listagem atualizada antes de buscar o registro modificado
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await paginaGlobal.locator('tr', { hasText: 'Pesquisa sobre IA atualizada' })
            .getByRole('button', { name: 'Excluir' })
            .first()
            .click();

        await expect(paginaGlobal.getByText('Excluir trabalho', { exact: false })).toBeVisible();
        await paginaGlobal.getByRole('button', { name: 'Sim, excluir' }).click();

        await expect(paginaGlobal.getByText('Excluído!', { exact: false })).toBeVisible();
    });
});