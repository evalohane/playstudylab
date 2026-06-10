import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Triste: Data de Entrega Vazia', () => {
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
        
        await paginaGlobal.getByRole('button', { name: 'Entrar' }).click();
        
        await paginaGlobal.waitForURL('**/dashboard');
        
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');
        await paginaGlobal.getByRole('heading', { name: 'Meus Trabalhos' }).waitFor({ state: 'visible' });
    });

    test('Usuário tenta cadastrar um trabalho sem preencher a data de entrega', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.locator('#workType').selectOption('Artigo');
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Trabalho Sem Data');
        await paginaGlobal.locator('#workDueDate').fill('');
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('A data de entrega é obrigatória.', { exact: false })).toBeVisible();
    });
});