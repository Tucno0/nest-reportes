import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [40, 40],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    // alignment: 'center',
    margin: [0, 10, 0, 10],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 10, 0, 10],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data;

  const subTotal = order_details.reduce((acc, orderDetail) => {
    return acc + orderDetail.quantity * +orderDetail.products.price;
  }, 0);
  const iva = subTotal * 0.16;
  const total = subTotal + iva;

  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 80],
    content: [
      // Headers
      {
        text: 'Tucan Code',
        style: 'header',
      },

      // Address and Invoice Details
      {
        columns: [
          {
            text: `15 Montgomery Str, Suite 100,
            Ottawa ON K2Y 9X1, CANADA
            BN: 12783671823
            https://devtalles.com`,
          },
          {
            text: [
              {
                text: `Recibo No: ${data.order_id}\n`,
                bold: true,
              },
              `Fecha: ${DateFormatter.getDDMMYYYY(data.order_date)}
              Pagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
      },

      // QR
      {
        qr: 'https://devtalles.com',
        fit: 100,
        alignment: 'right',
        margin: [0, 10],
      },

      // Client Information
      {
        text: [
          {
            text: `Cobrar a:\n`,
            bold: true,
            style: 'subHeader',
          },
          {
            text: `Razón Social: ${customers.customer_name}
            Contacto: ${customers.contact_name}
            Dirección: ${customers.address}`,
          },
        ],
      },

      // Table details of the order
      {
        layout: 'lightHorizontalLines',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'ID', bold: true },
              { text: 'Descripción', bold: true },
              { text: 'Cantidad', bold: true },
              { text: 'Precio Unitario', bold: true },
              { text: 'Total', bold: true },
            ],
            ...order_details.map((orderDetail) => [
              orderDetail.product_id.toString(),
              orderDetail.products.product_name,
              orderDetail.quantity.toString(),
              CurrencyFormatter.formatCurrency(+orderDetail.products.price),
              CurrencyFormatter.formatCurrency(
                orderDetail.quantity * +orderDetail.products.price,
              ),
            ]),
          ],
        },
      },

      // Saltos de línea
      '\n\n',

      // Totals
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              headerRows: 1,
              body: [
                [
                  { text: 'Subtotal', bold: true },
                  CurrencyFormatter.formatCurrency(subTotal),
                ],
                [
                  { text: 'IVA', bold: true },
                  CurrencyFormatter.formatCurrency(iva),
                ],
                [
                  { text: 'Total', bold: true, fontSize: 16 },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    fontSize: 16,
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
