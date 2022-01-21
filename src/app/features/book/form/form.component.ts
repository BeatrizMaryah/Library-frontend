import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/core/model/book';
import { BooksService } from 'src/app/core/services/books/books.service';
import { LibrariesService } from 'src/app/core/services/libraries/libraries.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  errorMessage: string;
  
  @Input()
  libraries = [];

  @Input()
  bookId: number;

  formTypeLabel: string;

  formBook: FormGroup;
  keys: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private librariesService: LibrariesService
  ) { }

  ngOnInit(): void {
    this.formBook = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cost: ['', [Validators.required, Validators.minLength(0)]],
      idLibrary: ['', [Validators.required]],
    });

    this.keys = Object.keys(this.formBook.value).filter(
      (key) => key !== 'id'
    );

    this.activatedRoute.data.subscribe((value) => {
      if (value.entity) {
        this.formBook.patchValue(value.entity);
      }

      this.libraries = value.libraries;
    });

    const hasId = Boolean(this.activatedRoute.snapshot.params.id);

    this.formTypeLabel = hasId ? 'Update' : 'Register';

     this.librariesService.getLibrary().subscribe((value) => {
      this.libraries.push(value);
    });
  }

  clickOnSubmit(){
    if (this.formBook.valid) {
      this.errorMessage = "";
      const book: Book = this.formBook.value;
      this.booksService.upsert(book).subscribe((value) => {
        this.booksService.setBook(value);
        this.formBook.reset();

        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
      });
    } else {
      this.errorMessage = "Enter valid information"
    }
  }

  goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  valueUpper = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1, value.length);
  };

   private setLibraries(libraries) {
    this.libraries = libraries;
  }

}