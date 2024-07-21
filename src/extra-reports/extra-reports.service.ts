import fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { genHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    // const html = fs.readFileSync('src/reports/html/basic-01.html', 'utf8');
    // const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf8');
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');
    const content = genHtmlContent(html, {
      client: 'Jhampier Tucno',
      title: 'Html Report',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'Html Report',
        subTitle: 'This is a sample html report',
        showDate: true,
      }),
      content: content,
      footer: footerSection,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCommunityReport() {
    const docDefinition: TDocumentDefinitions = getCommunityReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCustomSize() {
    const docDefinition: TDocumentDefinitions = {
      pageSize: {
        width: 200,
        height: 500,
      },
      content: [
        {
          qr: 'https://www.google.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Custom Size',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
