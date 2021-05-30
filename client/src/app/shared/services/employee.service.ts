import { HttpClient, HttpHeaders } from '@angular/common/http'
import { adminUrl, employeeUrl } from '../constants/constants'

import { IAuthRequest } from '../interfaces/IAuthReq'
import { IEmployee } from '../interfaces/IEmployee'
import { ITimesheet } from '../interfaces/ITimesheet'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  headerOptions = {}
  token: any

  constructor(private _httpClient: HttpClient) {}
  deleteToken() {
    localStorage.removeItem('token')
  }

  checkIfAuthenticated() {
    const token: string | undefined = localStorage['token']

    return !!token
  }

  private setHeaderOptions() {
    this.headerOptions = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`,
      ),
    }
  }

  authorizeEmployee(authReq: IAuthRequest) {
    return this._httpClient.post(`${employeeUrl}/authorize`, authReq)
  }

  getEmployeeProfile() {
    this.setHeaderOptions()

    return this._httpClient.get<IEmployee>(
      `${employeeUrl}/profile`,
      this.headerOptions,
    )
  }

  updateEmployee(employee: IEmployee) {
    this.setHeaderOptions()
    return this._httpClient.put<IEmployee>(
      `${employeeUrl}/profile`,
      employee,
      this.headerOptions,
    )
  }

  addTimeSheet(data: any) {
    this.setHeaderOptions()
    return this._httpClient.post(
      `${employeeUrl}/timesheet`,
      data,
      this.headerOptions,
    )
  }

  updateTimesheet(data: any) {
    this.setHeaderOptions()
    return this._httpClient.put(
      `${employeeUrl}/timesheet`,
      data,
      this.headerOptions,
    )
  }

  data: any
  getTimesheet(start: any, end: any) {
    this.setHeaderOptions()
    this.data = {
      start: start,
      end: end,
    }
    return this._httpClient.post<ITimesheet[]>(
      `${employeeUrl}/profile/timesheet`,
      this.data,
      this.headerOptions,
    )
  }

  getAllTimesheetForUser() {
    this.setHeaderOptions()
    return this._httpClient.get(
      `${employeeUrl}/profile/timesheet`,
      this.headerOptions,
    )
  }

  createLeave(data: any) {
    this.setHeaderOptions()

    return this._httpClient.post(
      `${employeeUrl}/leave`,
      data,
      this.headerOptions,
    )
  }

  getLeaveTypes() {
    this.setHeaderOptions()
    return this._httpClient.get(`${employeeUrl}/leavetype`, this.headerOptions)
  }

  getLeaves() {
    this.setHeaderOptions()
    return this._httpClient.get(`${employeeUrl}/leave`, this.headerOptions)
  }
}
