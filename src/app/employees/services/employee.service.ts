import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employees'; // Replace with your actual API endpoint
  private employeesCache: Employee[] | null = null; // Cache for employees
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);


  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    if (this.employeesCache) {
      // Return cached data as an observable
      return of(this.employeesCache);
    } else {
      return this.http.get<any[]>(this.apiUrl).pipe(
        map(employees => {
          this.employeesCache = employees.map(emp => ({
            ...emp,
            id: Number(emp.id) // Ensure id is a Number
          }));
          this.employeesSubject.next(this.employeesCache);
          return this.employeesCache;
        })
      );
    }
  } 

  getEmployeeById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(p0: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
          // Update the local cache by filtering out the deleted employee
          this.employeesCache = this.employeesCache ? this.employeesCache.filter(emp => emp.id !== id) : null;
      })
  );
  }

  // For demonstration purposes, if you don't have an API yet, 
  // you can use this method to generate mock data
  // getMockEmployees(): Observable<Employee[]> {
  //   const mockEmployees: Employee[] = [
  //     {
  //       id: 1292,
  //       department: 'SWS',
  //       designation: 'Associate Project Manager',
  //       gender: 'Male',
  //       location: 'Alok Aman',
  //       companyDOJ: '05-18-2010',
  //       groupDOJ: '05-18-2010',
  //       status: 'Inactive'
  //     },
  //     {
  //       id: 1384,
  //       department: 'SWS',
  //       designation: 'Senior Module Leader',
  //       gender: 'Male',
  //       location: 'Sachin Gupta',
  //       companyDOJ: '10-25-2010',
  //       groupDOJ: '10-25-2010',
  //       status: 'Active'
  //     },
  //     // Add more mock employees here...
  //   ];
  //   return of(mockEmployees);
  // }
}