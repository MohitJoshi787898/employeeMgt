import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id: number | null = null;
  employee: Employee | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam, 10);
        this.loadEmployeeDetails();
      } else {
        this.error = 'Employee ID not provided';
        this.loading = false;
      }
    });
  }

  loadEmployeeDetails(): void {
    if (this.id === null) {
      this.error = 'Invalid Employee ID';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data: any) => {
        this.employee = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employee details';
        this.loading = false;
        console.error(err);
      }
    });
  }
}