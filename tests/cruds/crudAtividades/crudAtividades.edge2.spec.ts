import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('CRUD Atividades - Borda 2', () => {
    test('deve permitir cadastrar atividade com caracteres especiais na descrição', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await page.getByRole('button', { name: 'Fixar menu' }).click();
        await page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await page.getByRole('link', { name: 'Ver atividades' }).click();
        
        await page.getByRole('button', { name: 'Nova atividade' }).click();
        
        const descricaoBorda = 'História - Exercício pág 45 #UFC @2026!';
        await page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill(descricaoBorda);
        
        const selectMateria = page.locator('#modalSubjectId');
        await selectMateria.waitFor({ state: 'visible' });
        const primeiraMateriaValida = await selectMateria.locator('option:not([value=""])').first().getAttribute('value');
        
        if (primeiraMateriaValida) {
            await selectMateria.selectOption(primeiraMateriaValida);
        }

        await page.locator('#modalDueDateQuick').selectOption('1mes');
        await page.getByRole('button', { name: 'Salvar atividade' }).click();

        await expect(page.getByRole('button', { name: 'Nova atividade' })).toBeVisible();
    });
});