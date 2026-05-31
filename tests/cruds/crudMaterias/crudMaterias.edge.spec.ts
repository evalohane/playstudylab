import { test, expect } from '@playwright/test';

test('deve verificar se é possível cadastrar nome do professor com números', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');
    await page.getByRole('link', { name: 'Entrar' }).click();

    await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('evaomnibus@oisaulo.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Lielsonli123!');
    await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

    // verifica se redirecionou para o dashboard
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });

    await page.getByRole('button', { name: 'Fixar menu' }).click();
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();
    await page.getByRole('link', { name: 'Ver matérias' }).click();

    await page.getByRole('button', { name: 'Adicionar matéria' }).click();
    await page.locator('#modalSubjectName').selectOption('Física');
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).click();
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill('12345678'); // tgenta cadastrar o nome do professor com números
    await page.locator('#modalSubjectSemester').selectOption('9');
    await page.getByRole('button', { name: 'Salvar matéria' }).click();
    
    //verifica se o sistema impede de criar a matéria
    await expect(page.getByText('O campo professor não pode conter números.')).toBeVisible();
});