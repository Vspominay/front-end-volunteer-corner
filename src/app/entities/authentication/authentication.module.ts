import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from "@ngx-translate/core";
import { FormElementsModule } from "../../modules/form-elements/form-elements.module";
import { SharedModule } from '../../shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


@NgModule({
  declarations: [
    SignInComponent,
    AuthenticationComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule,
    FormElementsModule,
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,
  ]
})
export class AuthenticationModule {
}
