import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

import { InputComponent } from "./components/input/input.component";

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [InputComponent]
})
export class FormElementsModule { }
