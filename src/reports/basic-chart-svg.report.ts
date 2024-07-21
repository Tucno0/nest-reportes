import fs from 'node:fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgcontent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateBarChartImage = async () => {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Mi primer gráfico',
          data: [65, 59, 80, 81, 56, 55, 10],
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: ' rgb(81, 75, 192)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return Utils.chartJstoImage(chartConfig);
};

const generateDoughnutChartImage = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  return Utils.chartJstoImage(chartConfig);
};

const generateBarChartBorderRadius = async () => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Fully Rounded',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: 'Small Radius',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  return Utils.chartJstoImage(config);
};

export const getBasicSvgReport = async (): Promise<TDocumentDefinitions> => {
  // const barChart = await generateBarChartImage();
  // const doughnutChart = await generateDoughnutChartImage();
  // const barChartBorderRadius = await generateBarChartBorderRadius();

  const [barChart, doughnutChart, barChartBorderRadius] = await Promise.all([
    generateBarChartImage(),
    generateDoughnutChartImage(),
    generateBarChartBorderRadius(),
  ]);

  return {
    content: [
      {
        svg: svgcontent,
        width: 150,
      },
      {
        image: barChart,
        width: 500,
      },
      {
        image: doughnutChart,
        width: 500,
      },
      {
        image: barChartBorderRadius,
        width: 500,
      },
    ],
  };
};
