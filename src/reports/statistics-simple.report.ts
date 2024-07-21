import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const generateTopCountriesDoughnut = async (topCountries: TopCountry[]) => {
  const data = {
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Top Countries',
        data: topCountries.map((country) => country.customers),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
      },
      title: {
        // display: true,
        // text: 'Top Countries',
      },
      plugins: {
        datalabels: {
          color: '#fff',
          formatter: (value: number) => {
            return `${value} customers`;
          },
          font: {
            weight: 'bold',
            size: 16,
          },
        },
      },
    },
  };

  return Utils.chartJstoImage(chartConfig);
};

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
  const doughnutChart = await generateTopCountriesDoughnut(
    options.topCountries,
  );

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: doughnutChart,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
