import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./entities/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./entities/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'requests',
    loadChildren: () => import('./entities/requests/requests.module').then(m => m.RequestsModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./entities/component-testing/component-testing.module').then(m => m.ComponentTestingModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
