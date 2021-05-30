import { DashboardComponent } from './dashboard/dashboard.component'
import { EmployeeGuard } from '../shared/guard/employee.guard'
import { LeaveComponent } from './leave/leave.component'
import { LeavereportComponent } from './leavereport/leavereport.component'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TimesheetComponent } from './timesheet/timesheet.component'

const routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'leave',
    component: LeaveComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'leave/report',
    component: LeavereportComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'timesheet',
    component: TimesheetComponent,
    canActivate: [EmployeeGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
