import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

export interface ContentReplacer {
  [key: string]: string;
}

export const genHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{ ${key} }}`;
    const key2 = `{{${key}}}`;

    // Reemplaza todas las ocurrencias de la llave por el valor
    html = html.replaceAll(key1, value).replaceAll(key2, value);
  });

  const { window } = new JSDOM();
  return htmlToPdfmake(html, { window });
};
