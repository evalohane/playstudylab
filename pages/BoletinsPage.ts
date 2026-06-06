import { Page, expect } from '@playwright/test';

export class BoletinsPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.waitForURL('**/dashboard', { timeout: 20000 });
        const botaoFixarMenu = this.page.getByRole('button', { name: 'Fixar menu' });
        await expect(botaoFixarMenu).toBeVisible({ timeout: 15000 });
        await botaoFixarMenu.click();
        await this.page.getByRole('link', { name: 'Boletim Boletim' }).click();
        await this.page.waitForURL('**/bulletin', { timeout: 15000 });
    }

    async cadastrarNota(materia: string, bimestre: string, notaParcial: string, notaFinal: string, ano?: string) {
        await this.page.getByRole('button', { name: 'Nova nota' }).click();
        await this.page.locator('#gradeModalSubjectId').selectOption(materia);
        await this.page.locator('#gradeModalBimester').selectOption(bimestre);
        if (ano) {
            await this.page.getByPlaceholder('2026').fill(ano);
        }
        await this.page.locator('#gradeModalMidterm').fill(notaParcial);
        await this.page.locator('#gradeModalEndterm').fill(notaFinal);
        await this.page.getByRole('button', { name: 'Salvar nota' }).click();
        // Aguarda o modal fechar — se não fechar, a nota não foi salva
        await expect(
            this.page.getByRole('heading', { name: 'Cadastrar Nota' })
        ).not.toBeVisible({ timeout: 15000 });
    }

    async verificarCadastro(bimestre: string) {
        await this.page.waitForTimeout(2000);
        await expect(
            this.page.locator('main').getByText(new RegExp(bimestre)).first()
        ).toBeVisible({ timeout: 10000 });
    }

    async lerNota(bimestre: string, notaParcial: string, notaFinal: string) {
        const main = this.page.locator('main');
        await expect(main.getByText(new RegExp(bimestre)).first()).toBeVisible({ timeout: 10000 });
        await expect(main.getByRole('cell', { name: notaParcial }).first()).toBeVisible({ timeout: 10000 });
        await expect(main.getByRole('cell', { name: notaFinal }).first()).toBeVisible({ timeout: 10000 });
    }

    async editarNota(indice: number, notaParcial: string, notaFinal: string, ano?: string) {
        await this.page.locator('.w-7').nth(indice).click();
        if (ano) {
            await this.page.getByPlaceholder('2026').fill(ano);
        }
        await this.page.locator('#gradeModalMidterm').fill(notaParcial);
        await this.page.locator('#gradeModalEndterm').fill(notaFinal);
        await this.page.getByRole('button', { name: 'Salvar alterações' }).click();
        await expect(
            this.page.getByRole('heading', { name: 'Editar Nota' })
        ).not.toBeVisible({ timeout: 15000 });
    }

    async verificarEdicao(notaParcial: string) {
        await this.page.waitForTimeout(2000);
        await expect(
            this.page.locator('main').getByRole('cell', { name: notaParcial }).first()
        ).toBeVisible({ timeout: 10000 });
    }

    async excluirNota(indice: number) {
        await this.page
            .locator('.w-7.h-7.flex.items-center.justify-center.rounded-lg.bg-red-50')
            .nth(indice)
            .click();
        await this.page.getByRole('button', { name: 'Sim, excluir' }).click();
    }

    async verificarExclusao(bimestre: string) {
        await this.page.waitForTimeout(2000);
        // Após excluir, o bloco do bimestre exibe "Sem notas neste bimestre"
        await expect(
            this.page.locator('main').getByText('Sem notas neste bimestre').first()
        ).toBeVisible({ timeout: 10000 });
    }

    async filtrarPorAno(ano: string) {
        await this.page.locator('#filterYear').selectOption(ano);
    }

    async verificarModalAberto() {
        // Verifica que o modal continua visível — a nota não foi salva
        await expect(
            this.page.getByRole('heading', { name: 'Cadastrar Nota' })
        ).toBeVisible({ timeout: 5000 });
    }

    async verificarErroCampo(mensagem: string) {
        await this.page.waitForTimeout(2000);
        // Usa filter para garantir que pega apenas o elemento visível na tela
        await expect(
            this.page.getByText(mensagem).filter({ visible: true })
        ).toBeVisible({ timeout: 10000 });
    }

    async cadastrarNotaComNotaInvalida(materia: string, bimestre: string, notaParcial: string, notaFinal: string) {
        await this.page.getByRole('button', { name: 'Nova nota' }).click();
        await this.page.locator('#gradeModalSubjectId').selectOption(materia);
        await this.page.locator('#gradeModalBimester').selectOption(bimestre);
        await this.page.locator('#gradeModalMidterm').fill(notaParcial);
        await this.page.locator('#gradeModalEndterm').fill(notaFinal);
        await this.page.getByRole('button', { name: 'Salvar nota' }).click();
    }
}