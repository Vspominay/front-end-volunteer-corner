import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { ButtonComponent } from './components/button/button.component';

import { InputComponent } from "./components/input/input.component";

@NgModule({
  declarations: [InputComponent, ButtonComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports: [InputComponent, ButtonComponent],
})
export class FormElementsModule {
}
