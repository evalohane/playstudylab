import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('CRUD Atividades - Triste 2', () => {
    test('deve exibir erro ao tentar cadastrar atividade sem selecionar o prazo', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await page.getByRole('button', { name: 'Fixar menu' }).click();
        await page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await page.getByRole('link', { name: 'Ver atividades' }).click();

        await page.getByRole('button', { name: 'Nova atividade' }).click();
        
        await page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill('Atividade Sem Prazo');
        
        await page.locator('#modalDueDateQuick').selectOption('');
        
        await page.getByRole('button', { name: 'Salvar atividade' }).click();

        await expect(page.getByText('prazo', { exact: false }).or(page.getByText('data', { exact: false })).first()).toBeVisible();
    });
});