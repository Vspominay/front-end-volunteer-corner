import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './services/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        component: ProfileViewComponent
      },
      {
        path: 'edit',
        component: ProfileEditComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
