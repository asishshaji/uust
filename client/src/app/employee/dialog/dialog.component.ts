import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { EmployeeService } from 'src/app/shared/services/employee.service'
import { IEmployee } from 'src/app/shared/interfaces/IEmployee'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private _employeeService: EmployeeService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee,
  ) {}

  hide = true
  userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    imageUrl: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  ngOnInit(): void {
    this.userForm.controls['firstName'].setValue(this.data.firstName)
    this.userForm.controls['lastName'].setValue(this.data.lastName)
    this.userForm.controls['imageUrl'].setValue(this.data.imageUrl)
    this.userForm.controls['password'].setValue(this.data.password)
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  updateUser() {
    this.data.firstName = this.userForm.controls['firstName'].value
    this.data.lastName = this.userForm.controls['lastName'].value
    this.data.imageUrl = this.userForm.controls['imageUrl'].value
    this.data.password = this.userForm.controls['password'].value

    this._employeeService.updateEmployee(this.data).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      },
      () => {
        this.dialogRef.close()
      },
    )
  }
}
