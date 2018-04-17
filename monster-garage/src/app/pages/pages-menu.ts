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
    title: 'Rozwijane',
    icon: 'nb-gear',
    children: [
      {
        title: 'Login',
        link: '/login',
      }
    ],
  },
  {
    title: 'Formularze',
    icon: 'nb-compose',
    children:  [
      {
        title: 'Zlecenia',
        link: '/pages/forms/order',
      },

      {
        title: 'Zamów produkt',
        link: '/pages/forms/order-product',
      },
    ],
  }
];
