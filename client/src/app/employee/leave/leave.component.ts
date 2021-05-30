import * as moment from 'moment'

import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { EmployeeService } from 'src/app/shared/services/employee.service'

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
})
export class LeaveComponent implements OnInit {
  constructor(private _empService: EmployeeService) {}
  range = new FormGroup({
    start: new FormControl(moment().startOf('week').format('DD/MM/YYYY')),
    end: new FormControl(moment().endOf('week').format('DD/MM/YYYY')),
  })
  leaveForm = new FormGroup({
    leaveType: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    remarks: new FormControl('', [Validators.required]),
  })

  createLeave() {
    this.leaveForm.value['date'] =
      moment(this.range.value['start']).format('DD/MM/YYYY') +
      ' - ' +
      moment(this.range.value['end']).format('DD/MM/YYYY')
    console.log(this.leaveForm.value)

    this._empService.createLeave(this.leaveForm.value).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.warn(err)
      },
    )
  }

  leaveTypes: any

  ngOnInit(): void {
    this._empService.getLeaveTypes().subscribe(
      (res) => {
        this.leaveTypes = res
      },
      (err) => {
        console.warn(err)
      },
    )
  }
}
