import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Logo - Dirección - RUT - Teléfono
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `FORESTAL SANTA ROSA SPA
            RUT: 77.218.854-4
            CAMINO LA MONTAÑA PONIENTE 627. KM 16 1/2. LAMPA
            TELÉFONO: +56 2 24967000`,
          },
          {
            alignment: 'left',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['N°:', '0001'],
                        ['Fecha:', '2021-08-30'],
                        ['Version:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      // Horizontal Line
      {
        margin: [0, 10],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#7b90be',
          },
        ],
      },

      // Detalle del cliente
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del Cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],

            // Razón Social
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Calle Falsa 123',
                fillColor: 'white',
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
              {
                text: 'Condición de Pago',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },

      {
        margin: [0, 10],
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del Cliente',
                fillColor: 'green',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],

            // Razón Social
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Calle Falsa 123',
                fillColor: 'white',
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
              {
                text: 'Condición de Pago',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del Cliente',
                fillColor: 'green',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],

            // Razón Social
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Calle Falsa 123',
                fillColor: 'white',
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
              {
                text: 'Condición de Pago',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
      {
        margin: [0, 10],
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del Cliente',
                fillColor: 'green',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],

            // Razón Social
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                border: [true, true, true, false],
              },
              {
                text: 'Calle Falsa 123',
                fillColor: 'white',
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, false],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
              {
                text: 'Condición de Pago',
                fillColor: '#343a40',
                color: 'white',
                border: [true, false, true, true],
              },
              {
                text: '',
                fillColor: 'white',
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
