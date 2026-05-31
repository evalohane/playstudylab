import { test, expect } from '@playwright/test';

test('deve exibir erro com numero de caracteres do nome do professor excedido', async ({ page }) => {
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
    await page.locator('#modalSubjectName').selectOption('Inglês');
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await page.locator('#modalSubjectSemester').selectOption('3');
    await page.getByRole('button', { name: 'Salvar matéria' }).click();

    // verifica se aparece a mensaagaem de erro
    await expect(page.getByText('O nome não pode ter mais de 255 caracteres.')).toBeVisible();
});