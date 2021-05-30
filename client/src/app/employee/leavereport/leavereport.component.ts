import { Component, OnInit, ViewChild } from '@angular/core'

import { EmployeeService } from 'src/app/shared/services/employee.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-leavereport',
  templateUrl: './leavereport.component.html',
  styleUrls: ['./leavereport.component.css'],
})
export class LeavereportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  leaves: any
  displayedColumns: string[]
  dataSource: MatTableDataSource<any>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  constructor(private _empService: EmployeeService) {}

  ngOnInit(): void {
    this._empService.getLeaves().subscribe(
      (res) => {
        this.leaves = res

        this.displayedColumns = [
          // 'id',
          'leaveType',
          'remarks',
          'date',
          'validated',
        ]
        this.dataSource = new MatTableDataSource(this.leaves)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (err) => {
        console.log(err)
      },
    )
  }
}
