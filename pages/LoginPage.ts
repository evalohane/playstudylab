import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://studylab.free.laravel.cloud/');
        await this.page.getByRole('link', { name: 'Entrar' }).click();
    }

    async login(email: string, senha: string) {
        await this.page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill(email);
        await this.page.getByRole('textbox', { name: '••••••••' }).fill(senha);
        await this.page.getByRole('button', { name: 'Entrar na plataforma' }).click();
    }

    async verificarLogin() {
        await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
    }

    async verificarErroCredenciais() {
        await expect(this.page.getByText('Credenciais inválidas')).toBeVisible();
    }
}