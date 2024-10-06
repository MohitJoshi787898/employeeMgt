import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { provideHttpClient } from '@angular/common/http';
import { PrimeNGModule } from '../../../primeng/primeng.module';
import { FormsModule } from '@angular/forms';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNGModule, FormsModule], // Add HttpClientTestingModule here
      declarations: [EmployeeListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
