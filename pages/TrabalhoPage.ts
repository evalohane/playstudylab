import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class TrabalhoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    dataFutura(dias: number): string {
        const data = new Date();
        data.setDate(data.getDate() + dias);
        return data.toISOString().split('T')[0];
    }

    async abrirModalTrabalho(page: Page) {
        await page.goto('https://studylab.free.laravel.cloud/works');
        await page.getByRole('button', { name: 'Novo trabalho' }).click();
        await page.locator('#workType').waitFor({ state: 'visible' });
    }

    async cadastrarTrabalho(page: Page, descricao: string, data: string) {
        await this.abrirModalTrabalho(page);
        await page.locator('#workType').selectOption('Artigo');
        await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill(descricao);
        await page.locator('#workDueDate').fill(data);
        await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
        await expect(page.getByText('Trabalho criado com sucesso!', { exact: false })).toBeVisible();
    }
}