import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import * as EmployeeFormActions from '../../../shared/store/employee-form.actions';
import { selectAllEmployeeDetails } from '../../../shared/store/employee-form.selectors';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralDetailsComponent } from './general-details/general-details.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {
  steps: MenuItem[];
  activeIndex: number = 0;
  isEditMode: boolean = false;
  id: number | null = null;
  employeeDetails$!: Observable<any>;

  @ViewChild(GeneralDetailsComponent) generalDetailsComponent!: GeneralDetailsComponent;
  @ViewChild(PersonalDetailsComponent) personalDetailsComponent!: PersonalDetailsComponent;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {
    this.employeeDetails$ = this.store.select(selectAllEmployeeDetails);
    this.steps = [
      { label: 'General Details', routerLink: 'generaldetails' },
      { label: 'Personal Details', routerLink: 'personaldetails' },
      { label: 'Confirmation', routerLink: 'confirmation' }
    ];
  }

  ngOnInit() {
    this.checkRouteForEditMode();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveIndex();
    });
  }

  ngAfterViewInit() {
    console.log('General Details Component:', this.generalDetailsComponent);
    console.log('Personal Details Component:', this.personalDetailsComponent);
  }

  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || '';
  }

  private checkRouteForEditMode() {
    const urlSegments = this.router.url.split('/');
    const isEditRoute = urlSegments.includes('edit');
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? parseInt(idParam, 10) : null;
      this.isEditMode = isEditRoute && this.id !== null;
      if (this.isEditMode) {
        this.loadEmployeeData();
      } else {
        this.store.dispatch(EmployeeFormActions.resetForm());
      }
    });
  }

  private updateActiveIndex() {
    const currentUrl = this.router.url;
    const activeStep = this.steps.findIndex(step => currentUrl.includes(step.routerLink!));
    if (activeStep !== -1) {
      this.activeIndex = activeStep;
    }
  }

  async loadEmployeeData() {
    if (!this.id) {
      console.error('No employee ID available');
      return;
    }

    try {
      const employees = await firstValueFrom(this.employeeService.getEmployees());
      const employee = employees.find(emp => emp.id === this.id);
      if (employee) {
        this.store.dispatch(EmployeeFormActions.updateGeneralDetails({ generalDetails: employee }));
        this.store.dispatch(EmployeeFormActions.updatePersonalDetails({ personalDetails: employee }));
      } else {
        console.error('Employee not found');
        this.router.navigate(['/employees']);
      }
    } catch (error) {
      console.error('Error loading employee data:', error);
    }
  }

  nextStep() {
    // Check if the current step is General Details
    if (this.activeIndex === 0) { // General Details
      if (!this.generalDetailsComponent || !this.generalDetailsComponent.form.valid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields in General Details.' });
        return; // Prevent moving to the next step
      }
    }
    // Check if the current step is Personal Details
    else if (this.activeIndex === 1) { // Personal Details
      if (!this.personalDetailsComponent || !this.personalDetailsComponent.form.valid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields in Personal Details.' });
        return; // Prevent moving to the next step
      }
    }

    // Move to the next step if validations pass
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
      this.navigateToStep(this.activeIndex);
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.navigateToStep(this.activeIndex);
    }
  }

  private navigateToStep(index: number) {
    const route = this.steps[index].routerLink;
    if (this.isEditMode && this.id) {
      this.router.navigate([`/employees/${this.id}/edit/${route}`]);
    } else {
      this.router.navigate([`/employees/create/${route}`]);
    }
  }

  saveEmployee() {
    this.store.select(selectAllEmployeeDetails).pipe(take(1)).subscribe(employeeData => {
      const sanitizedEmployeeData = {
        ...employeeData,
        firstName: this.sanitizeInput(employeeData.firstName),
        lastName: this.sanitizeInput(employeeData.lastName),
        department: this.sanitizeInput(employeeData.department),
        designation: this.sanitizeInput(employeeData.designation),
        gender: this.sanitizeInput(employeeData.gender),
        emailId: this.sanitizeInput(employeeData.emailId),
        mobileNo: this.sanitizeInput(employeeData.mobileNo),
        location: this.sanitizeInput(employeeData.location),
        DOB: this.formatDate(employeeData.DOB),
        birthPlace: this.sanitizeInput(employeeData.birthPlace),
        bloodGroup: this.sanitizeInput(employeeData.bloodGroup),
        groupDOJ: this.formatDate(employeeData.groupDOJ),
        status: this.sanitizeInput(employeeData.status)
      };

      if (this.isEditMode && this.id !== null) {
        this.employeeService.updateEmployee(this.id, sanitizedEmployeeData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully' });
            this.router.navigate(['/employees']);
          },
          error: (error) => {
            console.error('Error updating employee:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update employee' });
          }
        });
      } else {
        this.employeeService.addEmployee(sanitizedEmployeeData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully' });
            this.router.navigate(['/employees']);
          },
          error: (error: any) => {
            console.error('Error creating employee:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add employee' });
          }
        });
      }
    });
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  sendForApproval() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Dummy sent for approval ' });
    this.router.navigate(['/employees']);
  }
}