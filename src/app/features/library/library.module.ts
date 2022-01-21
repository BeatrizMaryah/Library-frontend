import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { LibraryRoutingModule } from './library-routing.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class LibraryModule { }
