import { EDashboardCardStyle } from "../enums/dashboard-card-style.enum";

export interface IDashboardCard {
  title: string;
  description: string;
  style: EDashboardCardStyle;
  icon: string;
}