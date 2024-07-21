import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 40],
  width: 100,
  fontSize: 8,
};

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;
  const headerSubTitle: Content = subTitle
    ? {
        text: subTitle,
        style: {
          fontSize: 16,
          margin: [0, 10],
        },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            style: {
              fontSize: 22,
              bold: true,
            },
          },
          headerSubTitle,
        ],
        alignment: 'center',
        margin: [0, 20, 0, 0],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
