import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateDoughnutChart } from './charts/doughnut.chart';
import { headerSection } from './sections/header.section';
import { generateLineChart } from './charts/line.chart';
import { generateBarChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';
import { generatePolarAreaChart } from './charts/radial-gradient.chart';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title: string;
  subtitle: string;
  topCountries: TopCountry[];
}

export const getEstatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  // Graficas
  const [doughnutChart, lineChart, barChart, polarAreaChart] =
    await Promise.all([
      generateDoughnutChart({
        title: options.title,
        entries: options.topCountries.map((c) => ({
          label: c.country,
          value: c.customers,
        })),
        position: 'left',
      }),
      generateLineChart(),
      generateBarChart(),
      generatePolarAreaChart(),
    ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 110, 40, 60],
    header: headerSection({
      title: 'Statistics Report',
      subTitle: 'Top 10 countries with more customers',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: options.subtitle,
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              { image: doughnutChart, width: 300 },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Country', 'Customers'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart,
            width: 250,
          },
          {
            image: polarAreaChart,
            width: 250,
          },
        ],
      },
    ],
  };

  return docDefinition;
};
