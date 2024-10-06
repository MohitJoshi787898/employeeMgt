import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import { StoreModule } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let store: jasmine.SpyObj<Store>;

  const initialState = {
    employeeForm: {
      generalDetails: {
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
      }
    }
  };

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']); // Create a spy object for Store

    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ConfirmationComponent],
      providers: [
        provideHttpClient(),
        provideMockStore({ initialState }),
        { provide: Store, useValue: store } // Provide the mocked store
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Reset the store spy after each test
    if (store.select) {
      store.select.calls.reset();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select employee data from the store', () => {
    const mockEmployeeData = {
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
    };

    store.select.and.returnValue(of(mockEmployeeData)); // Mock the select method
    component.ngOnInit();
    expect(component.employeeData$).toBeTruthy();
  });
});