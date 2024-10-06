import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFormService {
  private employeeData = new BehaviorSubject<any>({});

  updateEmployeeData(data: any) {
    this.employeeData.next({ ...this.employeeData.getValue(), ...data });
  }

  getEmployeeData() {
    return this.employeeData.getValue();
  }
}