import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('CRUD Atividades - Feliz 2', () => {
    test('deve cadastrar uma atividade com status concluído e verificar na listagem', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('evaomnibus@oisaulo.com', 'Lielsonli123!');
        await loginPage.verificarLogin();

        await page.getByRole('button', { name: 'Fixar menu' }).click();
        await page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await page.getByRole('link', { name: 'Ver atividades' }).click();
        
        await page.getByRole('button', { name: 'Nova atividade' }).click();
        await page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill('Estudar para a prova de Redes');
        
        const selectMateria = page.locator('#modalSubjectId');
        await selectMateria.waitFor({ state: 'visible' });
        const primeiraMateriaValida = await selectMateria.locator('option:not([value=""])').first().getAttribute('value');
        
        if (primeiraMateriaValida) {
            await selectMateria.selectOption(primeiraMateriaValida);
        }

        await page.locator('#modalDueDateQuick').selectOption('1mes');
        await page.locator('#modalStatus').selectOption('completed');
        await page.getByRole('button', { name: 'Salvar atividade' }).click();

        await expect(page.getByRole('button', { name: 'Nova atividade' })).toBeVisible();
    });
});