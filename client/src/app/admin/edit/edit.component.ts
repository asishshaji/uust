import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { ActivatedRoute } from '@angular/router'
import { AdminService } from 'src/app/shared/services/admin.service'
import { IEmployee } from 'src/app/shared/interfaces/IEmployee'
import { Location } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
  ) {}

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'

  id: any = -1

  employee: IEmployee

  hide = true

  userForm = new FormGroup({
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

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id')
    })

    this._adminService.getEmployeeById(this.id).subscribe(
      (res) => {
        console.log(res)
        this.employee = res
      },
      (err) => {
        console.error(err)
      },
      () => {
        this.userForm.controls['firstName'].setValue(this.employee.firstName)
        this.userForm.controls['lastName'].setValue(this.employee.lastName)
        this.userForm.controls['imageUrl'].setValue(this.employee.imageUrl)
        this.userForm.controls['password'].setValue(this.employee.password)
      },
    )
  }

  updateUser() {
    this.employee.firstName = this.userForm.controls['firstName'].value
    this.employee.lastName = this.userForm.controls['lastName'].value
    this.employee.imageUrl = this.userForm.controls['imageUrl'].value
    this.employee.password = this.userForm.controls['password'].value

    this._adminService.updateEmployee(this.employee).subscribe(
      (res) => {
        console.log(res)
        this._snackBar.open('Updated employee')
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
