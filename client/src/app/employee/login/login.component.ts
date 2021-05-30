import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'

import { EmployeeService } from 'src/app/shared/services/employee.service'
import { IAuthRequest } from 'src/app/shared/interfaces/IAuthReq'
import { Router } from '@angular/router'
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _empService: EmployeeService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  ngOnInit(): void {}

  hidden = false

  submitData() {
    this.hidden = this.loginForm.valid

    this._empService
      .authorizeEmployee(this.loginForm.value as IAuthRequest)
      .subscribe(
        (res: any) => {
          const token = res['jwt']
          localStorage['token'] = token
          console.log(token)
        },
        (err) => {
          this.hidden = false
          this._snackBar.open(err.error.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          })
        },
        () => {
          console.log(localStorage['token'])
          if (localStorage['token'] != 'undefined') {
            // route to dashboard
            this._router.navigate(['dashboard'])
          }
        },
      )
  }
}
