import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class LibraryModule { }
