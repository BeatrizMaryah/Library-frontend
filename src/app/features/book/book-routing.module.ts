import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/model/book';
import { BooksService } from 'src/app/core/services/books/books.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { LibrariesService } from 'src/app/core/services/libraries/libraries.service';
import { Library } from 'src/app/core/model/library'

@Injectable()
export class BooksDataResolver implements Resolve<Book[]>{

  constructor(private booksService: BooksService){}

  resolve() {
    return this.booksService.all();
  }
}

@Injectable()
export class LibrariesDataResolver implements Resolve<Library[]>{

  constructor(private librariesService: LibrariesService){}

  resolve() {
    return this.librariesService.all();
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
    resolve: {
      books: LibrariesDataResolver,
    },
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      entity: BookDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BooksDataResolver, BookDataResolver, LibrariesDataResolver]
})
export class BookRoutingModule { }
