import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileViewComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormElementsModule,
    TranslateModule,
    MatIconModule,
    SharedModule
  ]
})
export class ProfileModule {
}
