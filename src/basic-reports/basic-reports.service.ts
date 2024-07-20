import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super(); // Se tiene que llamar al constructor de la clase padre
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  getHello() {
    const docDefinition: TDocumentDefinitions = getHelloWorldReport({
      title: 'Hello World',
      content: 'This is a basic report',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition: TDocumentDefinitions = getEmploymentLetter();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const docDefinition: TDocumentDefinitions = getEmploymentLetterById({
      employerName: 'Jhampier Tucno',
      employerPosition: 'CEO',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountriesReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition: TDocumentDefinitions = getCountriesReport({
      countries,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
