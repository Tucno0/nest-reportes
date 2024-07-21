import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicSvgReport,
  getEstatisticsReport,
  orderByIdReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  // Este método se ejecuta cuando el módulo se ha inicializado
  async onModuleInit() {
    await this.$connect();
  }

  async getOrderReporByOrderId(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    console.log(JSON.stringify(order, null, 2));

    const docDefinition: TDocumentDefinitions = orderByIdReport({
      data: order as any,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicSvgReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getStatistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    console.log(JSON.stringify(topCountries, null, 2));

    const topCountriesData = topCountries.map(({ country, _count }) => ({
      country: country,
      customers: _count.country,
    }));

    const docDefinition = await getEstatisticsReport({
      title: 'Top countries',
      subtitle: 'Top 10 countries with more customers',
      topCountries: topCountriesData,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
