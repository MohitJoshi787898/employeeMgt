import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { GeneralDetailsComponent } from './components/employee-form/general-details/general-details.component';
import { PersonalDetailsComponent } from './components/employee-form/personal-details/personal-details.component';
import { ConfirmationComponent } from './components/employee-form/confirmation/confirmation.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    PrimeNGModule,
    FormsModule,
  ],
  providers: [MessageService]
})
export class EmployeeModule { }
