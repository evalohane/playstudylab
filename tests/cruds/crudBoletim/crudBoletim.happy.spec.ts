import { test, expect } from '@playwright/test';
import { BoletinsPage } from '../../../pages/BoletinsPage';

test.describe.serial('Felizes: Create e Delete', () => {
    let boletimPage: BoletinsPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    // Realiza o login uma única vez no início
    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        boletimPage = new BoletinsPage(paginaGlobal);

        // 1. Acessa a página de login
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        // 2. Clica em entrar e aguarda o redirecionamento estabilizar
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        // 3. Vai para a página do boletim
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');
    });

    test('Usuário pode cadastrar uma nota', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        await boletimPage.abrirModalNota(paginaGlobal);
        await paginaGlobal.locator('#gradeModalBimester').selectOption('3');
        await paginaGlobal.locator('#gradeModalMidterm').fill('7');
        await paginaGlobal.locator('#gradeModalEndterm').fill('8');
        
        // Seleção de matéria dinâmica automatizada via POM
        await boletimPage.selecionarMateria(paginaGlobal);
        
        await paginaGlobal.getByRole('button', { name: 'Salvar nota' }).click();

        // Validação flexível por aproximação
        await expect(paginaGlobal.getByText('cadastrada', { exact: false })).toBeVisible();
    });

    test('Usuário pode deletar uma nota', async () => {
        // Garante recarregamento limpo para listar o registro inserido anteriormente
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/bulletin');

        // Localiza o bloco pelo título visual ou pelo seletor CSS do objeto de página (Fallback)
        const cardTerceiroBimestre = paginaGlobal.locator('div', { hasText: '3º Bimestre' }).or(boletimPage.cardBimestre(paginaGlobal, '3'));

        // Clica no primeiro botão de deletar que existir especificamente dentro do 3º Bimestre
        await cardTerceiroBimestre.locator('[data-del]').first().click();

        // Confirmação e encerramento do fluxo do modal
        await expect(paginaGlobal.getByText('Excluir nota', { exact: false })).toBeVisible();
        await paginaGlobal.getByRole('button', { name: 'Sim, excluir' }).click();

        await expect(paginaGlobal.getByText('Nota excluída!', { exact: false })).toBeVisible();
    });
});