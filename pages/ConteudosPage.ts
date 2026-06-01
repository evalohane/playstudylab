import { Page, expect } from '@playwright/test';

export class ConteudosPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.getByRole('button', { name: 'Fixar menu' }).click();
        await this.page.getByRole('link', { name: 'Matérias Matérias' }).click();
        await this.page.getByRole('link', { name: 'Ver conteúdos' }).click();
    }

    async cadastrarConteudo(nome: string, materia: string, professor: string, semestre: string) {
        await this.page.getByRole('button', { name: 'Adicionar conteúdo' }).click();
        await this.page.getByRole('textbox', { name: 'Ex: Derivadas e integrais,' }).fill(nome);
        await this.page.locator('#modalContentSubject').selectOption(materia);
        await this.page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill(professor);
        await this.page.locator('#modalContentSemester').selectOption(semestre);
        await this.page.getByRole('button', { name: 'Salvar conteúdo' }).click();
    }

    async verificarCadastro(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).toBeVisible({ timeout: 10000 });
    }

    async editarConteudo(nome: string) {
        await this.page.getByRole('button', { name: 'Editar' }).nth(0).click();
        await this.page.getByRole('textbox', { name: 'Ex: Derivadas e integrais,' }).fill(nome);
        await this.page.getByRole('button', { name: 'Salvar alterações' }).click();
    }

    async verificarEdicao(nome: string) {
        await expect(this.page.getByRole('cell', { name: nome })).toBeVisible({ timeout: 30000 });
    }

    async excluirConteudo() {
        await this.page.getByRole('button', { name: 'Excluir' }).nth(0).click();
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