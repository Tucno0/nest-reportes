import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount} - ${pageSize.width} x ${pageSize.height}`,
    alignment: 'right',
    fontSize: 10,
    margin: [40, 20],
  };
};
