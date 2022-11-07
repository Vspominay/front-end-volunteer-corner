import { IMenuItem } from "../interfaces/menu-item";

export const NAV_MENU_ITEMS: IMenuItem[] = [
  {
    icon: 'ic-dashboard',
    routerLink: 'testing',
    title: 'titles.dashboard'
  },
  {
    icon: 'ic-requests',
    routerLink: 'requests',
    title: 'titles.requests'
  },
  {
    icon: 'ic-proposal',
    routerLink: 'proposals',
    title: 'titles.proposals'
  },
  {
    icon: 'ic-settings',
    routerLink: 'settings',
    title: 'titles.settings'
  },
]