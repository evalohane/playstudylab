import { Page, expect } from '@playwright/test';

export class AtividadesPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.getByRole('button', { name: 'Fixar menu' }).click();
        await this.page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await this.page.getByRole('link', { name: 'Ver atividades' }).click();
    }

    async cadastrarAtividade(nome: string, materia: string, prazo: string, status: string) {
        await this.page.getByRole('button', { name: 'Nova atividade' }).click();
        await this.page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill(nome);
        await this.page.locator('#modalSubjectId').selectOption(materia);
        await this.page.locator('#modalDueDateQuick').selectOption(prazo);
        await this.page.locator('#modalStatus').selectOption(status);
        await this.page.getByRole('button', { name: 'Salvar atividade' }).click();
    }

    async verificarCadastro(nome: string) {
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByRole('cell', { name: nome })).toBeVisible({ timeout: 10000 });
    }

    async editarAtividade(nome: string) {
        await this.page.getByRole('button', { name: 'Editar' }).nth(4).click();
        await this.page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill(nome);
        await this.page.getByRole('button', { name: 'Salvar alterações' }).click();
    }

    async verificarEdicao(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).toBeVisible({ timeout: 10000 });
    }

    async excluirAtividade() {
        await this.page.getByRole('button', { name: 'Excluir' }).nth(4).click();
        await this.page.getByRole('button', { name: 'Sim, excluir' }).click();
    }

    async verificarExclusao(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).not.toBeVisible({ timeout: 10000 });
    }

    async verificarErroCampo(mensagem: string) {
        await expect(this.page.getByText(mensagem)).toBeVisible({ timeout: 10000 });
    }

    async cadastrarAtividadeComDataPassada(nome: string, materia: string, data: string, status: string) {
        await this.page.getByRole('button', { name: 'Nova atividade' }).click();
        await this.page.getByRole('textbox', { name: 'Ex: Fazer exercícios do capí' }).fill(nome);
        await this.page.locator('#modalSubjectId').selectOption(materia);
        await this.page.locator('#modalDueDate').fill(data);
        await this.page.locator('#modalStatus').selectOption(status);
        await this.page.getByRole('button', { name: 'Salvar atividade' }).click();
    }
}