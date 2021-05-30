import { Component, OnInit, ViewChild } from '@angular/core'

import { EmployeeService } from 'src/app/shared/services/employee.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  constructor(private _empService: EmployeeService) {}

  displayedColumns: string[]
  dataSource: MatTableDataSource<any>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  timesheet: any

  ngOnInit(): void {
    this._empService.getAllTimesheetForUser().subscribe(
      (res) => {
        console.log(res)
        this.timesheet = res

        this.displayedColumns = [
          'username',
          'status',
          'attendanceState',
          'timestamp',
        ]
        this.dataSource = new MatTableDataSource(this.timesheet)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (err) => {
        console.warn(err)
      },
    )
  }
}
