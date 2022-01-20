import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Library } from 'src/app/core/model/library';
import { LibrariesService } from 'src/app/core/services/libraries/libraries.service';

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
    private activatedRoute: ActivatedRoute,
    private librariesService: LibrariesService,
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
    if (this.formLibrary.valid) {
      const library: Library = this.formLibrary.value;
      this.librariesService.upsert(library).subscribe((value) => {
        this.librariesService.setLibrary(value);
        this.formLibrary.reset();

        this.router.navigate(['books']);
          // this.router.navigate(['..'], { relativeTo: this.activatedRoute });
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
