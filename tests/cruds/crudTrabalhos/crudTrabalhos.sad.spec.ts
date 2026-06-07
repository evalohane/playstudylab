import { test, expect } from '@playwright/test';
import { TrabalhoPage } from '../../../pages/TrabalhoPage';

test.describe.serial('Tristes: Create e Edit', () => {
    let trabalhoPage: TrabalhoPage;
    let contextoGlobal: any; 
    let paginaGlobal: any;

    // Loga apenas UMA vez para todos os testes deste arquivo
    test.beforeAll(async ({ browser }) => {
        contextoGlobal = await browser.newContext();
        paginaGlobal = await contextoGlobal.newPage();
        trabalhoPage = new TrabalhoPage(paginaGlobal);

        // 1. Acessa a página de login
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/login');
        await paginaGlobal.locator('#email').fill('m4rimolima@gmail.com');
        await paginaGlobal.locator('#password').fill('Seinao04');
        
        // 2. Clica em entrar e espera o redirecionamento padrão do sistema terminar
        await Promise.all([
            paginaGlobal.waitForNavigation({ waitUntil: 'networkidle' }),
            paginaGlobal.getByRole('button', { name: 'Entrar' }).click()
        ]);
        
        // 3. Agora que o login estabilizou, vai para a página de trabalhos
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');
        
        // 4. Aguarda o cabeçalho com tolerância de 30s
        await paginaGlobal.getByRole('heading', { name: 'Meus Trabalhos' }).waitFor({ state: 'visible', timeout: 30000 });
    });

    test('Usuário tenta cadastrar um trabalho sem selecionar o tipo', async () => {
        // Garante que está na página inicial de trabalhos
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        await trabalhoPage.abrirModalTrabalho(paginaGlobal);
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Trabalho sem tipo');
        await paginaGlobal.locator('#workDueDate').fill(trabalhoPage.dataFutura(5));
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('Selecione o tipo do trabalho.', { exact: false })).toBeVisible();
    });

    test('Usuário edita o trabalho removendo a descrição', async () => {
        await paginaGlobal.goto('https://studylab.free.laravel.cloud/works');

        // Cria o cenário controlado para garantir que o registro exista antes de tentar editar
        await trabalhoPage.cadastrarTrabalho(paginaGlobal, 'Trabalho Temporário Triste', trabalhoPage.dataFutura(5));

        await paginaGlobal.locator('tr', { hasText: 'Trabalho Temporário Triste' })
            .getByRole('button', { name: 'Editar' })
            .first()
            .click();

        await paginaGlobal.locator('#workType').waitFor({ state: 'visible' });
        await paginaGlobal.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).clear();
        await paginaGlobal.getByRole('button', { name: 'Salvar Trabalho' }).click();

        await expect(paginaGlobal.getByText('A descrição é obrigatória.', { exact: false })).toBeVisible();
    });
});