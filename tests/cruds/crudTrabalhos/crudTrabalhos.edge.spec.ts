import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Borda: Create e Edit', () => {
    let trabalhoPage: TrabalhoPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        trabalhoPage = new TrabalhoPage(paginaGlobal);

        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');
        await paginaGlobal.getByRole('heading', { name: 'Meus Trabalhos' }).waitFor({ state: 'visible', timeout: 30000 });
    });

    test('Usuário tenta cadastrar um trabalho com descrição acima de 100 caracteres', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.locator('#workType').selectOption('Artigo');
        
        const inputDescricao = paginaGlobal.locator('#workDescription');
        await inputDescricao.fill('A'.repeat(101));

        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataFutura(5));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        const valorInserido = await inputDescricao.inputValue();
        if (valorInserido.length === 100) {
            expect(valorInserido.length).toBe(100);
        } else {
            await expect(paginaGlobal.getByText('100 caracteres', { exact: false })).toBeVisible();
        }
    });

    test('Usuário edita um trabalho e muda a data para ontem', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        // Tenta cadastrar para garantir que exista pelo menos um registro na lista
        await trabalhoPage.cadastrarTrabalho(paginaGlobal, 'Trabalho de revisão', trabalhoPage.dataFutura(5)).catch(() => {});

        // CORREÇÃO: Em vez de buscar pelo texto exato, clica no primeiro botão "Editar" que aparecer na listagem
        await paginaGlobal.getByRole('button', { name: 'Editar' }).first().click();

        // Aguarda o campo de data aparecer, preenche com ontem e tenta salvar
        await paginaGlobal.locator('#workDueDate').waitFor({ state: 'visible' });
        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataPassada(1));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        // Validação por palavra-chave para a mensagem de erro de data no passado
        await expect(paginaGlobal.getByText('passado', { exact: false })).toBeVisible();
    });
});