import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DialogComponent } from './dialog/dialog.component'
import { EmployeeRoutingModule } from './employee.routing.module'
import { LeaveComponent } from './leave/leave.component'
import { LeavereportComponent } from './leavereport/leavereport.component'
import { LoginComponent } from './login/login.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgModule } from '@angular/core'
import { TimesheetComponent } from './timesheet/timesheet.component'

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    DialogComponent,
    LeaveComponent,
    LeavereportComponent,
    TimesheetComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
  ],
})
export class EmployeeModule {}
