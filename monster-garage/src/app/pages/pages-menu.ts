import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Deska rozdzielcza',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Jakiś tytuł',
    group: true,
  },
  {
    title: 'Naprawy',
    icon: 'nb-gear',
    children: [
      {
        title: 'Dodaj zlecenie',
        link: '/pages/repairs',
      },
      {
        title: 'Lista napraw',
        link: '/pages/show-repairs',
      },
    ],
  },
  {
    title: 'Formularze',
    icon: 'nb-compose',
    children:  [
      {
        title: 'Zamów produkt',
        link: '/pages/forms/order-product',
      },
    ],
  }
];
