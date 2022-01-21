import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BookRoutingModule } from './book-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
  ]
})
export class BookModule { }
