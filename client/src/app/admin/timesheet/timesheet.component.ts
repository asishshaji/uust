import * as moment from 'moment'

import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { ActivatedRoute } from '@angular/router'
import { AdminService } from 'src/app/shared/services/admin.service'
import { ITimesheet } from 'src/app/shared/interfaces/ITimesheet'
import { Location } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _location: Location,
  ) {}

  username: any
  timesheetData: any

  displayedColumns: string[]
  dataSource: MatTableDataSource<any>

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clickedRows = new Set<ITimesheet>()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  range = new FormGroup({
    start: new FormControl(moment().startOf('week').toDate()),
    end: new FormControl(moment().endOf('week').toDate()),
  })

  startTimestamp: number
  endTimestamp: number

  getTimesheet() {
    let startTime = this.range.controls['start'].value
    let endTime = this.range.controls['end'].value
    var date = moment(startTime)
    this.startTimestamp = +moment(startTime).format('x')
    this.endTimestamp = +moment(endTime).format('x')

    console.log(this.startTimestamp)
    console.log(this.endTimestamp)

    this.getData()
  }

  getData() {
    this._adminService
      .getTimsheet(this.username, this.startTimestamp, this.endTimestamp)
      .subscribe(
        (res) => {
          console.log(res)
          this.timesheetData = res

          this.displayedColumns = [
            'username',
            'status',
            'timestamp',
            'attendanceState',
          ]

          this.dataSource = new MatTableDataSource(this.timesheetData)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        (err) => {
          console.warn(err)
        },
      )
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res) => {
      this.username = res.get('username')

      this.getTimesheet()
    })
  }

  goBack() {
    this._location.back()
  }
}
