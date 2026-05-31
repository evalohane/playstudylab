import { test, expect } from '@playwright/test';

test('deve cadastrar, ver, editar e excluir matéria com sucesso', async ({ page }) => {
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

    // create
    await page.getByRole('button', { name: 'Adicionar matéria' }).click();
    await page.locator('#modalSubjectName').selectOption('Inteligência Artificial');
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill('Viviane');
    await page.locator('#modalSubjectSemester').selectOption('5');
    await page.getByRole('button', { name: 'Salvar matéria' }).click();

    // verifica se a matéria foi cadastrada com sucesso
    await expect(page.getByRole('cell', { name: 'Inteligência Artificial' })).toBeVisible({ timeout: 10000 });

    // edit
    await page.getByRole('button', { name: 'Editar' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill('Prof. Viviane de Menezes');
    await page.getByRole('button', { name: 'Salvar alterações' }).click();

    // verifica se as alteracoes foram feitas com sucesso
    await expect(page.getByRole('cell', { name: 'Prof. Viviane de Menezes' })).toBeVisible({ timeout: 10000 });

    // delete
    await page.getByRole('button', { name: 'Excluir' }).nth(1).click();
    await page.getByRole('button', { name: 'Sim, excluir' }).click();

    // verifica se a matéria foi excluída com sucesso
    await expect(page.getByRole('cell', { name: 'Inteligência Artificial' })).not.toBeVisible({ timeout: 10000 });
});