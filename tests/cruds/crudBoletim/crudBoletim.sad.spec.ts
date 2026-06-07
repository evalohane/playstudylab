import { test, expect } from '@playwright/test';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe.serial('Tristes: Create e Edit', () => {
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

    test('Usuário tenta cadastrar uma nota sem informar a matéria', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        await boletimPage.abrirModalNota(paginaGlobal);
        await paginaGlobal.locator('#gradeModalBimester').selectOption('1');
        await paginaGlobal.locator('#gradeModalMidterm').fill('5');
        await paginaGlobal.locator('#gradeModalEndterm').fill('7');
        await paginaGlobal.getByRole('button', { name: 'Salvar nota' }).click();

        await paginaGlobal.locator('#err-gradeModalSubjectId').waitFor({ state: 'visible' });
    });

    test('Usuário edita uma nota e troca o bimestre para vazio', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        // Cria o cenário controlado (cadastra uma nota no 4º bimestre)
        await boletimPage.cadastrarNota(paginaGlobal, '4', '6', '8');

        // CORREÇÃO: Localiza o card do 4º Bimestre pelo texto ou classe CSS (Fallback)
        const cardQuartoBimestre = paginaGlobal.locator('div', { hasText: '4º Bimestre' }).or(boletimPage.cardBimestre(paginaGlobal, '4'));

        // Clica no botão de editar ([data-edit]) do registro que acabamos de criar lá dentro
        await cardQuartoBimestre.locator('[data-edit]').first().click();

        // Aguarda o modal de edição abrir e limpa o bimestre
        await paginaGlobal.locator('#gradeModalBimester').waitFor({ state: 'visible' });
        await paginaGlobal.locator('#gradeModalBimester').selectOption('');
        
        // Clica em salvar para submeter o formulário incorreto/vazio
        await paginaGlobal.getByRole('button', { name: 'Salvar alterações' }).click();

        // O teste vai PASSAR se a mensagem de validação/erro ficar visível em até 5s
        await expect(paginaGlobal.getByText('Selecione o bimestre.', { exact: false })).toBeVisible();
    });
});