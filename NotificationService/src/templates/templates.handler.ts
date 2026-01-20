import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { InternalServerError } from '../utils/errors/app.error';

export async function renderTemplate(templateId: string, params: Record<string, any>): Promise<string> {
    try {
        const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`);
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const template = Handlebars.compile(templateContent);
        return template(params);
    } catch (error) {
        console.error(`Error rendering template ${templateId}:`, error);
        throw new InternalServerError(`Could not render template: ${templateId}`);
    }
}
