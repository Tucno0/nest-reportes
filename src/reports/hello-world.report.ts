import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  title: string;
  content: string;
}

export const getHelloWorldReport = (
  reportOptions: ReportOptions,
): TDocumentDefinitions => {
  const { title, content } = reportOptions;

  const definition: TDocumentDefinitions = {
    content: [{ text: title, style: 'header' }, { text: content }],
  };

  return definition;
};
