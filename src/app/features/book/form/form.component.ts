import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/core/model/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  bookId: number;

  @Output()
  submit = new EventEmitter();

  formBook: FormGroup;
  keys: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.formBook = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      author: '',
      cost: '',
      idLibrary: '',
    });

    this.keys = Object.keys(this.formBook.value).filter(
      (key) => key !== 'id'
    );

    this.activatedRoute.data.subscribe((value) => {
      if (value.entity) {
        this.formBook.patchValue(value.entity);
      }
    });
  }

  clickOnSubmit(){
    if (this.formBook.valid) {
      const book: Book = this.formBook.value;
      this.booksService.upsert(book).subscribe((value) => {
        this.booksService.setBook(value);
        this.formBook.reset();

        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
      });
    }
  }

  goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  valueUpper = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1, value.length);
  };

}
