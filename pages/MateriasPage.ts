import { Page, expect } from '@playwright/test';

export class MateriasPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.getByRole('button', { name: 'Fixar menu' }).click();
        await this.page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await this.page.getByRole('link', { name: 'Ver matérias' }).click();
    }
    
    async cadastrarMateria(nome: string, professor: string, semestre: string) {
        await this.page.getByRole('button', { name: 'Adicionar matéria' }).click();
        await this.page.locator('#modalSubjectName').selectOption(nome);
        await this.page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill(professor);
        await this.page.locator('#modalSubjectSemester').selectOption(semestre);
        await this.page.getByRole('button', { name: 'Salvar matéria' }).click();
    }

    async verificarCadastro(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).toBeVisible({ timeout: 10000 });
    }

    async editarMateria(professor: string) {
        await this.page.getByRole('button', { name: 'Editar' }).nth(4).click();
        await this.page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill(professor);
        await this.page.getByRole('button', { name: 'Salvar alterações' }).click();
    }

    async verificarEdicao(professor: string) {
        await expect(this.page.getByRole('cell', { name: professor })).toBeVisible({ timeout: 10000 });
    }

    async excluirMateria() {
        await this.page.getByRole('button', { name: 'Excluir' }).nth(4).click();
        await this.page.getByRole('button', { name: 'Sim, excluir' }).click();
    }

    async verificarExclusao(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).not.toBeVisible({ timeout: 10000 });
    }

    async verificarErroCampo(mensagem: string) {
        await this.page.waitForTimeout(3000);
        await expect(this.page.getByText(mensagem)).toBeVisible({ timeout: 10000 });
    }
}