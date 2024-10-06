import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllEmployeeDetails } from '../../../../shared/store/employee-form.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  employeeData$: Observable<any>;

  constructor(private store: Store) {
      this.employeeData$ = this.store.select(selectAllEmployeeDetails);
  }

  ngOnInit() {
      this.employeeData$.subscribe(data => {
          console.log('Employee data in confirmation step:', data);
      });
  }
}
