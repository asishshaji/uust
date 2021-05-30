import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module'
import { CommonModule } from '@angular/common'
import { CreateemployeeComponent } from './createemployee/createemployee.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { EditComponent } from './edit/edit.component'
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
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgModule } from '@angular/core'
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LeavetypeComponent } from './leavetype/leavetype.component'

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    EditComponent,
    CreateemployeeComponent,
    TimesheetComponent,
    LeavereportComponent,
    LeavetypeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
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
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatChipsModule,
  ],
})
export class AdminModule {}
