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

  errorMessage: string;
  formTypeLabel: string;

  @Input()
  libraryId: number;

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
      name: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      contact: ['', [Validators.required, Validators.maxLength(9)]],
    });

    this.keys = Object.keys(this.formLibrary.value).filter(
      (key) => key !== 'id'
    );

    const hasId = Boolean(this.activatedRoute.snapshot.params.id);

    this.formTypeLabel = hasId ? 'Atualizar' : 'Cadastrar';
  }

  clickOnSubmit(){
    if (this.formLibrary.valid) {
      this.errorMessage = "";
      const library: Library = this.formLibrary.value;
      this.librariesService.upsert(library).subscribe((value) => {
        this.librariesService.setLibrary(value);
        this.formLibrary.reset();

        this.router.navigate(['books']);
      });
    } else {
      this.errorMessage = "Enter valid information"
    }
  }

  goBack(): void {
    this.router.navigate(['books']);
  }

  valueUpper = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1, value.length);
  };
}
