import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BookModule { }
