import * as moment from 'moment'

import { Component, OnInit } from '@angular/core'

import { DialogComponent } from '../dialog/dialog.component'
import { EmployeeService } from 'src/app/shared/services/employee.service'
import { IEmployee } from 'src/app/shared/interfaces/IEmployee'
import { ITimesheet } from 'src/app/shared/interfaces/ITimesheet'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { getLocaleFirstDayOfWeek } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
    private _router: Router,
  ) {}

  employee: IEmployee
  date: any

  status: any = []
  status1: any = []
  state: any

  timesheets: any
  timestamps: any
  missingtimestamps: any = []

  getTimestampFromDate(date: any) {
    // 2021-05-22
    date = date.split('-')

    var newDate = new Date(date[0], date[1] - 1, date[2])
    return newDate.getTime()
  }

  getTimeSheets() {
    this._employeeService
      .getTimesheet(this.startOfWeek, this.endOfWeek)
      .subscribe(
        (res) => {
          this.timesheets = []
          this.missingtimestamps = []
          this.timesheets = res

          console.log(res)

          // 86400000 add this to get next day

          for (let index = 0; index < this.timestamps.length; index++) {
            const element = this.timestamps[index]
            if (!this.timesheets.some((t: any) => t.timestamp === element)) {
              this.missingtimestamps.push(element)
            }
          }
        },
        (err) => {
          console.log(err)
        },
        () => {},
      )
  }

  startOfWeek: number
  endOfWeek: number

  goBack() {
    this.startOfWeek = this.startOfWeek - 5 * 86400000
    this.endOfWeek = this.endOfWeek - 5 * 86400000
    this.getData()
  }

  goForward() {
    this.startOfWeek = this.startOfWeek + 5 * 86400000
    this.endOfWeek = this.endOfWeek + 5 * 86400000
    this.getData()
  }

  ngOnInit(): void {
    this.timestamps = []

    this.startOfWeek = +moment().startOf('week').format('x')
    this.endOfWeek = +moment().endOf('week').format('x')
    this.getData()
  }

  getData() {
    this.timestamps[0] = this.startOfWeek

    for (let index = 0; index < 7; index++) {
      this.timestamps[index + 1] = this.timestamps[index] + 86400000
    }

    this._employeeService.getEmployeeProfile().subscribe(
      (res) => {
        this.employee = res
      },
      (err) => {
        console.log(err)
      },
    )

    this.getTimeSheets()
  }

  data: any

  logout() {
    this._employeeService.deleteToken()
    this._router.navigate(['login'])
  }

  setValue(d: any, idx: any) {
    this.state = 'save'
    this.data = {
      status: this.status[idx] || 'Present',
      state: this.state,
      timestamp: d,
    }
    this._employeeService.addTimeSheet(this.data).subscribe(
      (res) => {
        console.log('res')
        this.getTimeSheets()
      },
      (err) => {
        console.log('res')
        this.getTimeSheets()

        console.log(err)
      },
      () => {
        this.getTimeSheets()
      },
    )
  }

  updateAttendance(d: any, idx: any, type: any) {
    console.log(d, idx, this.status[idx])

    this.state = type

    this.data = {
      status: this.status1[idx] || d.status,
      state: this.state,
      timestamp: d.timestamp,
    }

    console.log(this.data)

    this._employeeService.updateTimesheet(this.data).subscribe(
      (res) => {
        console.log('res')
        this.getTimeSheets()
      },
      (err) => {
        console.log('res')
        this.getTimeSheets()

        console.log(err)
      },
      () => {
        this.getTimeSheets()
      },
    )
  }
  dialogRef: any
  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, { data: this.employee })
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.employee = result
    })
  }
}
