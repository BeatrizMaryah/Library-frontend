import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  libraryId: number;

  @Output()
  submit = new EventEmitter();

  formLibrary: FormGroup;
  keys: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.formLibrary = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.keys = Object.keys(this.formLibrary.value).filter(
      (key) => key !== 'id'
    );
  }

  clickOnSubmit(){
    // if (this.formLibrary.valid) {
    //   const library: Library = this.formLibrary.value;
    //   this.libraryService.upsert(library).subscribe((value) => {
    //     this.libraryService.setPerson(value);
    //     this.formLibrary.reset();

    //       this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    //   });
    // }
  }

  goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  valueUpper = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1, value.length);
  };
}
