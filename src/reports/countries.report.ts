import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface CountriesReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: CountriesReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  return {
    pageOrientation: 'landscape',

    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of countries',
    }),

    footer: function (currentPage, pageCount, pageSize) {
      return footerSection(currentPage, pageCount, pageSize);
    },

    pageMargins: [40, 110, 40, 60],
    content: [
      // Tabla de contenido
      {
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
            [
              '',
              '',
              '',
              '',
              {
                text: 'Total de países',
                bold: true,
              },
              {
                text: `${countries.length} países`,
                bold: true,
              },
            ],
          ],
        },
      },

      // Tabla de totales
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
        margin: [0, 20, 0, 0],
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                text: `${countries.length} países`,
                bold: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
