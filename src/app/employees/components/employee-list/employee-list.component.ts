import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  unitIds: string[] = ['All'];
  employeeTypes: string[] = ['All'];
  employeeNames: string[] = ['All'];

  selectedUnitId: string = 'All';
  selectedEmployeeType: string = 'All';
  selectedEmployeeName: string = 'All';

  private searchSubject = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadEmployees();

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(searchTerm => this.filterEmployees(searchTerm))
    ).subscribe(filteredEmployees => {
      this.filteredEmployees = filteredEmployees;
      console.log('filtered', filteredEmployees, this.filteredEmployees);
      this.cdr.markForCheck(); // Mark for check after filtering
    });
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.totalRecords = data.length;
        this.loading = false;
        this.cdr.markForCheck(); // Mark for check after loading employees
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.loading = false;
      }
    });
  }

  filterEmployees(searchTerm: string) {
    if (!searchTerm) {
      return of(this.employees);
    }
    const filtered = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filtered);
  }

  onSearch(event: any) {
    console.log(event.target.value)
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  getEmployeeDetailsByID(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching employee details:', error);
        this.loading = false;
      }
    })
  }

  viewEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: number) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(); // Refresh the employee list
          this.cdr.markForCheck(); // Ensure change detection runs after deletion
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  addEmployee() {
    this.router.navigate(['employees/create/generaldetails'])
  }

}