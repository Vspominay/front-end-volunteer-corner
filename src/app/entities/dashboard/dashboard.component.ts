import { Component, OnInit } from '@angular/core';
import { IDashboardCard } from "../../shared/components/dashboard-card/interfaces/dashboard-card.interface";
import { DASHBOARD_DATA } from "./data/dashboard-statistic.data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public readonly statistic: IDashboardCard[] = DASHBOARD_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
