import { test, expect } from '@playwright/test';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe.serial('Borda: Limites de Notas e Ano', () => {
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

    test('Usuário cadastra nota nos limites permitidos (0 e 10) com ano limite inferior 2000', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        await boletimPage.abrirModalNota(paginaGlobal);
        await paginaGlobal.locator('#gradeModalBimester').selectOption('1');
        
        await paginaGlobal.locator('#gradeModalMidterm').fill('0');
        await paginaGlobal.locator('#gradeModalEndterm').fill('10');
        
        await paginaGlobal.getByPlaceholder('2026').fill('2000');
        
        await boletimPage.selecionarMateria(paginaGlobal);
        await paginaGlobal.getByRole('button', { name: 'Salvar nota' }).click();

        await expect(paginaGlobal.getByText('cadastrada', { exact: false })).toBeVisible();
    });
});