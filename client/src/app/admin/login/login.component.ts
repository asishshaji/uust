import { Component, OnInit } from '@angular/core'

import { AdminService } from 'src/app/shared/services/admin.service'
import { IAuthRequest } from 'src/app/shared/interfaces/IAuthReq'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _adminService: AdminService, private _router: Router) {}

  username: any
  password: any

  authReq: IAuthRequest

  ngOnInit(): void {}

  login() {
    this.authReq = {
      username: this.username,
      password: this.password,
    }
    this._adminService.authorizeAdmin(this.authReq).subscribe(
      (res: any) => {
        const token = res['jwt']
        localStorage['adminToken'] = token
        console.log(token)
      },
      (err) => {
        console.log(err)
      },
      () => {
        if (localStorage['adminToken'] != 'undefined') {
          // route to dashboard
          this._router.navigate(['admin', 'dashboard'])
        }
      },
    )
  }
}
