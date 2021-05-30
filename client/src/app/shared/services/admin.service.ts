import { HttpClient, HttpHeaders } from '@angular/common/http'

import { IAuthRequest } from '../interfaces/IAuthReq'
import { IEmployee } from '../interfaces/IEmployee'
import { ITimesheetReq } from '../interfaces/ITimesheetReq'
import { Injectable } from '@angular/core'
import { adminUrl } from '../constants/constants'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  leaveTypeData = {}
  createLeaveType(result: any) {
    this.leaveTypeData = {
      typeName: result,
    }
    this.setHeaderOptions()
    return this._httpClient.post(
      `${adminUrl}/leavetype`,
      this.leaveTypeData,
      this.headerOptions,
    )
  }
  addEmployee(employee: IEmployee) {
    this.setHeaderOptions()
    return this._httpClient.post<IEmployee>(
      `${adminUrl}/employee`,
      employee,
      this.headerOptions,
    )
  }
  updateEmployee(employee: IEmployee) {
    this.setHeaderOptions()
    return this._httpClient.put<IEmployee>(
      `${adminUrl}/employee`,
      employee,
      this.headerOptions,
    )
  }
  getEmployeeById(id: any) {
    this.setHeaderOptions()

    return this._httpClient.get<IEmployee>(
      `${adminUrl}/employeebyid?id=${id}`,
      this.headerOptions,
    )
  }
  headerOptions = {}
  token: any
  constructor(private _httpClient: HttpClient) {}

  deleteToken() {
    localStorage.removeItem('adminToken')
  }

  checkIfAuthenticated() {
    const token: string | undefined = localStorage['adminToken']

    return !!token
  }
  private setHeaderOptions() {
    this.headerOptions = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('adminToken')}`,
      ),
    }
  }

  authorizeAdmin(authReq: IAuthRequest) {
    return this._httpClient.post(`${adminUrl}/authorize`, authReq)
  }

  getAllEmployees() {
    this.setHeaderOptions()
    return this._httpClient.get<IEmployee[]>(
      `${adminUrl}/employee`,
      this.headerOptions,
    )
  }

  deleteEmployee(id: any) {
    this.setHeaderOptions()
    return this._httpClient.delete(
      `${adminUrl}/employee?id=${id}`,
      this.headerOptions,
    )
  }

  data = {} as ITimesheetReq

  getTimsheet(username: any, start: number, end: number) {
    this.setHeaderOptions()

    console.log(start, end)

    this.data = {
      start: start,
      end: end,
    }

    return this._httpClient.post<ITimesheetReq>(
      `${adminUrl}/timesheet?username=${username}`,
      this.data,
      this.headerOptions,
    )
  }

  getAllLeaves() {
    this.setHeaderOptions()
    return this._httpClient.get(`${adminUrl}/leave`, this.headerOptions)
  }

  updateLeave(data: any) {
    this.setHeaderOptions()
    return this._httpClient.put(`${adminUrl}/leave`, data, this.headerOptions)
  }
}
