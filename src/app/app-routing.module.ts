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
    canActivate: [AuthGuard]
  },
  {
    path: 'requests',
    loadChildren: () => import('./entities/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./entities/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },

  //TODO: delete before release
  {
    path: 'testing',
    loadChildren: () => import('./entities/component-testing/component-testing.module').then(m => m.ComponentTestingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
