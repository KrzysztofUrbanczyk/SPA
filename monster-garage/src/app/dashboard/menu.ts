import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Deska rozdzielcza',
    icon: 'fa fa-cog',
    home: true,
  },
  {
    title: 'Jakiś tytuł',
    group: true,
  },
  {
    title: 'Rozwijane',
    icon: 'fa fa-arrow-down',
    children: [
      {
        title: 'Login',
        link: '/login',
      },
      {
        title: 'Nie wiem czemu nie działają ikonki nebulara',
        link: '/user',
      },

    ],
  },
];
