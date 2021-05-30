import { AdminGuard } from '../shared/guard/admin.guard'
import { CreateemployeeComponent } from './createemployee/createemployee.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { EditComponent } from './edit/edit.component'
import { LeaveComponent } from '../employee/leave/leave.component'
import { LeavereportComponent } from './leavereport/leavereport.component'
import { LeavetypeComponent } from './leavetype/leavetype.component'
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
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'create/employee',
    component: CreateemployeeComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'timesheet/:username',
    component: TimesheetComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'leave',
    component: LeavereportComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'leavetype',
    component: LeavetypeComponent,
    canActivate: [AdminGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
