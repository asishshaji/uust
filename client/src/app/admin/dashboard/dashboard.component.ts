import { Component, OnInit, ViewChild } from '@angular/core'

import { AdminService } from 'src/app/shared/services/admin.service'
import { IEmployee } from 'src/app/shared/interfaces/IEmployee'
import { LeavetypeComponent } from '../leavetype/leavetype.component'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _adminService: AdminService,

    private _router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  employees: IEmployee[]

  displayedColumns: string[]
  dataSource: MatTableDataSource<any>

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clickedRows = new Set<IEmployee>()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.getEmpData()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeavetypeComponent, {
      width: '250px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result != undefined)
        this._adminService.createLeaveType(result).subscribe((res) => {
          this._snackBar.open('Created leave type', 'Close', { duration: 3000 })
        })
    })
  }

  getEmpData() {
    this._adminService.getAllEmployees().subscribe(
      (res) => {
        this.employees = res
        this.displayedColumns = [
          // 'id',
          'firstName',
          'lastName',
          'imageUrl',
          'password',
          'username',
          'createdTimestamp',
          'actions',
        ]

        this.dataSource = new MatTableDataSource(this.employees)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (err) => {
        console.log(err)
      },
    )
  }

  edit(d: any) {
    console.log(d)
    this._router.navigate(['admin', 'edit', d])
  }

  delete(d: any) {
    console.log(d)
    this._adminService.deleteEmployee(d).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      },
      () => {
        this.getEmpData()
      },
    )
  }

  logout() {
    this._adminService.deleteToken()
    this._router.navigate(['/admin', 'login'])
  }

  getTimesheet(username: any) {
    this._router.navigate(['admin', 'timesheet', username])
  }
}
