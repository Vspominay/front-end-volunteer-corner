import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./entities/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./entities/component-testing/component-testing.module').then(m => m.ComponentTestingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
