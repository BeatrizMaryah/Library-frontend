import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/core/model/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  books = [];

  constructor(private booksService: BooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((value) => {
      this.books = value.books;
    })

     this.booksService.getBook().subscribe((value: Book) => {
      this.books.push(value);
    });
  }

  editBook(id: number) {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  deleteBook(id: number){
    this.booksService.delete(id).subscribe(() => {
      this.books = this.books.filter(animal => animal.id !== id);
    })
  }

  seeBook(){

  }

  private setBooks(books) {
    this.books = books;
  }
}
