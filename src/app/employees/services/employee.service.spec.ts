import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      emailId: 'john.doe@example.com',
      mobileNo: '1234567890',
      location: 'New York',
      groupDOJ: '2020-01-01',
      department: 'IT',
      designation: 'Developer',
      DOB: new Date('1990-01-01'),
      birthPlace: 'California',
      bloodGroup: 'A+',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'Female',
      emailId: 'jane.smith@example.com',
      mobileNo: '0987654321',
      location: 'Los Angeles',
      groupDOJ: '2021-01-01',
      department: 'HR',
      designation: 'Manager',
      DOB: new Date('1985-05-05'),
      birthPlace: 'Texas',
      bloodGroup: 'B+',
      status: 'Inactive'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule here
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees from the API via GET', () => {
    service.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees); // Simulate returning the mock employees
  });

  it('should add an employee via POST', () => {
    const newEmployee: Employee = {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      gender: 'Female',
      emailId: 'alice.johnson@example.com',
      mobileNo: '1231231234',
      location: 'Chicago',
      groupDOJ: '2022-01-01',
      department: 'Finance',
      designation: 'Analyst',
      DOB: new Date('1992-02-02'),
      birthPlace: 'Florida',
      bloodGroup: 'O+',
      status: 'Active'
    };

    service.addEmployee(newEmployee).subscribe(employee => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('POST');
    req.flush(newEmployee); // Simulate returning the new employee
  });

  it('should update an employee via PUT', () => {
    const updatedEmployee: Employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      emailId: 'john.doe@example.com',
      mobileNo: '1234567890',
      location: 'New York',
      groupDOJ: '2020-01-01',
      department: 'IT',
      designation: 'Senior Developer',
      DOB: new Date('1990-01-01'),
      birthPlace: 'California',
      bloodGroup: 'A+',
      status: 'Active'
    };

    service.updateEmployee(1, updatedEmployee).subscribe(employee => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee); // Simulate returning the updated employee
  });

  it('should delete an employee via DELETE', () => {
    service.deleteEmployee(1).subscribe(response => {
      expect(response).toBeUndefined(); // Expect no response body
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Simulate successful deletion
  });
});