import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { PrimeNGModule } from '../../../primeng/primeng.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let activatedRoute: ActivatedRoute;

  const initialState = {
    employeeForm: {
      generalDetails: {} // Mock the initial state
    }
  };

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees', 'addEmployee', 'updateEmployee']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}), // Add your reducers here
        ToastModule,
        StepsModule,
        PrimeNGModule
      ],
      declarations: [EmployeeFormComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        MessageService,
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: observableOf({ get: () => '1' }) // Mock the route parameter for edit mode
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize steps correctly', () => {
    expect(component.steps.length).toBe(3);
    expect(component.steps[0].label).toBe('General Details');
    expect(component.steps[1].label).toBe('Personal Details');
    expect(component.steps[2].label).toBe('Confirmation');
  });

  it('should save employee data', () => {
    const employeeData: Employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      emailId: 'john.doe@example.com',
      mobileNo: '1234567890',
      location: 'New York',
      groupDOJ: new Date('2020-01-01'),
      department: 'IT',
      designation: 'Developer',
      DOB: new Date('1990-01-01'),
      birthPlace: 'California',
      bloodGroup: 'A+',
      status: 'Active'
    };

    employeeService.addEmployee.and.returnValue(of(employeeData));
    component.saveEmployee();
    expect(employeeService.addEmployee).toHaveBeenCalledWith(jasmine.any(Object));
  });
});