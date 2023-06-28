import { CoreService } from './../core/core.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonService } from '../services/person.service';


@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit{

  personForm: FormGroup;
  phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  emailMask = [/[a-zA-Z0-9._%+-]+/, '@', /[a-zA-Z0-9.-]+/, '.', /[a-zA-Z]{2,}/];

  constructor(

    private _fb: FormBuilder,
    private _personService: PersonService,
    private _dialogRef: MatDialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.personForm = this._fb.group({

      name: '',
      email: '',
      cpf: '',
      password: '',
      phone: ''
    })
  }

  ngOnInit(): void {

    this.personForm.patchValue(this.data);
  }

  onFormSubmit() {

    if(this.personForm.valid) {

      if(this.data) {

        this._personService.updatePerson( this.data.id, this.personForm.value).subscribe({

          next: (val: any) => {

            this._coreService.openSnackBar('Person detail updated!');
            this._dialogRef.close(true);

          },
          error: (err: any) => {

            console.error(err);
          }
        })

      } else {

        this._personService.addPerson(this.personForm.value).subscribe({

          next: (val: any) => {

            this._coreService.openSnackBar('Person added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {

            console.error(err);
          }
        })
      }
    }
  }
}
