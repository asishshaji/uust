import { Component, OnInit, ViewChild } from '@angular/core'

import { AdminService } from 'src/app/shared/services/admin.service'
import { ITimesheet } from 'src/app/shared/interfaces/ITimesheet'
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

  constructor(private _adminService: AdminService) {}

  getData() {
    this._adminService.getAllLeaves().subscribe(
      (res) => {
        this.leaves = {}
        this.leaves = res

        this.dataSource = new MatTableDataSource(this.leaves)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (err) => {
        console.warn(err)
      },
    )
  }

  updateLeave(data: any) {
    // this.data = data

    data['validated'] = !data['validated']

    this._adminService.updateLeave(data).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.warn(err)
      },
    )
  }

  ngOnInit(): void {
    this.displayedColumns = [
      // 'id',
      'username',
      'leaveType',
      'remarks',
      'date',
      'validated',
      'actions',
    ]
    this.getData()
  }
}
