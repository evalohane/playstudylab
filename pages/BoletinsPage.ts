import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BoletinsPage {
    readonly page: Page;

    private readonly bimestreClasse: Record<string, string> = {
        '1': 'border-blue-200',
        '2': 'border-purple-200',
        '3': 'border-orange-200',
        '4': 'border-green-200',
    };

    constructor(page: Page) {
        this.page = page;
    }

    async abrirModalNota(page: Page) {
        await page.goto('https://studylab.free.laravel.cloud/bulletin');
        await page.getByRole('button', { name: 'Nova nota' }).click();
        await page.locator('#gradeModalSubjectId').waitFor({ state: 'visible' });
    }

    async selecionarMateria(page: Page) {
        // Seleciona dinamicamente a primeira matéria real da lista (índice 1)
        // Ignora a opção padrão "Selecione uma matéria" (índice 0)
        await page.locator('#gradeModalSubjectId').selectOption({ index: 1 });
    }

    async cadastrarNota(page: Page, bimestre: string, parcial: string, final: string) {
        await this.abrirModalNota(page);
        await page.locator('#gradeModalBimester').selectOption(bimestre);
        await page.locator('#gradeModalMidterm').fill(parcial);
        await page.locator('#gradeModalEndterm').fill(final);
        await this.selecionarMateria(page);
        await page.getByRole('button', { name: 'Salvar nota' }).click();
        
        await expect(page.getByText('cadastrada', { exact: false })).toBeVisible();
    }

    cardBimestre(page: Page, bimestre: string) {
        return page.locator(`div.${this.bimestreClasse[bimestre]}`);
    }
}