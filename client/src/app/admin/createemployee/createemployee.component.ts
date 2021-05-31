import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { ActivatedRoute } from '@angular/router'
import { AdminService } from 'src/app/shared/services/admin.service'
import { IEmployee } from 'src/app/shared/interfaces/IEmployee'
import { Location } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css'],
})
export class CreateemployeeComponent implements OnInit {
  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
  ) {}

  employee: any
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'

  hide = true

  userForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(this.reg),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  ngOnInit(): void {}

  createEmployee() {
    this.employee = {} as IEmployee
    this.employee.firstName = this.userForm.controls['firstName'].value
    this.employee.lastName = this.userForm.controls['lastName'].value
    this.employee.imageUrl = this.userForm.controls['imageUrl'].value
    this.employee.password = this.userForm.controls['password'].value
    this.employee.username = this.userForm.controls['username'].value

    console.log(this.employee)

    this._adminService.addEmployee(this.employee).subscribe(
      (res) => {
        console.log(res)
        this._snackBar.open('Created employee')
        this.goBack()
      },
      (err) => {
        console.log(err)
        this._snackBar.open(err)
      },
      () => {},
    )
  }

  goBack() {
    this._location.back()
  }
}
