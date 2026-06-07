import { test, expect } from '@playwright/test';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe.serial('Borda: Create e Edit', () => {
    let boletimPage: BoletinsPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        boletimPage = new BoletinsPage(paginaGlobal);

        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');
    });

    test('Usuário tenta cadastrar uma nota com ano 1999', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        await boletimPage.abrirModalNota(paginaGlobal);
        await paginaGlobal.locator('#gradeModalBimester').selectOption('1');
        await paginaGlobal.locator('#gradeModalMidterm').fill('5');
        await paginaGlobal.locator('#gradeModalEndterm').fill('7');
        
        // Preenche o ano limite/inválido
        await paginaGlobal.getByPlaceholder('2026').fill('1999');
        
        await boletimPage.selecionarMateria(paginaGlobal);
        await paginaGlobal.getByRole('button', { name: 'Salvar nota' }).click();

        // Validação flexível por palavra-chave para o ano
        await expect(paginaGlobal.getByText('Ano entre', { exact: false })).toBeVisible();
    });

    test('Usuário edita uma nota e coloca nota final acima de 10', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        // Cadastra um dado inicial controlado no 3º Bimestre de forma dinâmica
        await boletimPage.cadastrarNota(paginaGlobal, '3', '5', '6');

        // CORREÇÃO: Localiza o card do 3º Bimestre sem depender de texto fixo de matéria
        const cardTerceiroBimestre = paginaGlobal.locator('div', { hasText: '3º Bimestre' }).or(boletimPage.cardBimestre(paginaGlobal, '3'));

        // Clica no botão de editar ([data-edit]) do registro que acabou de ser criado lá dentro
        await cardTerceiroBimestre.locator('[data-edit]').first().click();

        await paginaGlobal.locator('#gradeModalEndterm').waitFor({ state: 'visible' });
        await paginaGlobal.locator('#gradeModalEndterm').fill('11');
        await paginaGlobal.getByRole('button', { name: 'Salvar alterações' }).click();

        // Validação flexível por palavra-chave para o limite da nota
        await expect(paginaGlobal.getByText('Nota entre', { exact: false })).toBeVisible();
    });
});