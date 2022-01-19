import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/model/book';
import { BooksService } from 'src/app/core/services/books/books.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

@Injectable()
export class BooksDataResolver implements Resolve<Book[]>{

  constructor(private booksService: BooksService){}

  resolve() {
    return this.booksService.all();
  }
}

@Injectable()
export class BookDataResolver implements Resolve<Book> {
  constructor(private booksService: BooksService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.booksService.getOne(route.params.id);
  }
}

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      books: BooksDataResolver,
    },
  },
  {
    path: 'add',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BooksDataResolver, BookDataResolver]
})
export class BookRoutingModule { }
