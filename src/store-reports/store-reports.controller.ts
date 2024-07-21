import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  async getOrderReportById(
    @Param('orderId') orderId: string,
    @Res() response: Response,
  ) {
    const pdfDoc =
      await this.storeReportsService.getOrderReporByOrderId(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Sample PDF Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svgs-charts')
  async getSvgChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgChart();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Svg-chart-report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('statistics')
  async getStatistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatistics();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Svg-chart-report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
