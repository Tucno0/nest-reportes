import * as Utils from 'src/helpers/chart-utils';

interface DoughnutEntry {
  label: string;
  value: number;
}

interface DoughnutOptions {
  position?: 'top' | 'left' | 'right' | 'bottom';
  title: string;
  entries: DoughnutEntry[];
}

export const generateDoughnutChart = async (options: DoughnutOptions) => {
  const { title, entries, position = 'top' } = options;

  const data = {
    labels: entries.map((e) => e.label),
    datasets: [
      {
        label: title,
        data: entries.map((e) => e.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position,
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
