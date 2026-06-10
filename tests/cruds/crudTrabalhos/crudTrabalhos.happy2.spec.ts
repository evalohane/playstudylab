import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Feliz: Fluxo Alternativo de Cadastro', () => {
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

    test('Usuário pode cadastrar um trabalho do tipo Projeto com sucesso', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.locator('#workType').selectOption('Projeto');
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Desenvolvimento de Sistema');
        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataFutura(10));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('Trabalho criado com sucesso!', { exact: false })).toBeVisible();
    });
});