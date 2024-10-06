import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { provideHttpClient } from '@angular/common/http';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [EmployeeDetailsComponent],
      providers: [provideHttpClient(),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
