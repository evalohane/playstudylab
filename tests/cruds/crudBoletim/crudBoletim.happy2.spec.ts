import { test, expect } from '@playwright/test';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe.serial('Feliz: Editar Nota Existente', () => {
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
        
        await paginaGlobal.getByRole('button', { name: 'Entrar' }).click();
        
        await paginaGlobal.waitForURL('**/dashboard');
        
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');
    });

    test('Usuário pode editar as notas parcial e final com sucesso', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        await boletimPage.cadastrarNota(paginaGlobal, '2', '6', '7');

        const cardSegundoBimestre = paginaGlobal.locator('div', { hasText: '2º Bimestre' }).or(boletimPage.cardBimestre(paginaGlobal, '2'));

        await cardSegundoBimestre.locator('[data-edit]').first().click();

        await paginaGlobal.locator('#gradeModalMidterm').waitFor({ state: 'visible' });
        await paginaGlobal.locator('#gradeModalMidterm').fill('9.5');
        await paginaGlobal.locator('#gradeModalEndterm').fill('10');
        
        await paginaGlobal.getByRole('button', { name: 'Salvar alterações' }).click();

        await expect(paginaGlobal.getByText('atualizada', { exact: false })).toBeVisible();
    });
});