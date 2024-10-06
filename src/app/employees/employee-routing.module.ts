import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { ConfirmationComponent } from './components/employee-form/confirmation/confirmation.component';
import { GeneralDetailsComponent } from './components/employee-form/general-details/general-details.component';
import { PersonalDetailsComponent } from './components/employee-form/personal-details/personal-details.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  {
    path: 'create',
    component: EmployeeFormComponent,
    children: [
      { path: 'generaldetails', component: GeneralDetailsComponent },
      { path: 'personaldetails', component: PersonalDetailsComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: '', redirectTo: 'generaldetails', pathMatch: 'full' }
    ]
  },
  {
    path: ':id/edit',
    component: EmployeeFormComponent,
    children: [
      { path: 'generaldetails', component: GeneralDetailsComponent },
      { path: 'personaldetails', component: PersonalDetailsComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: '', redirectTo: 'generaldetails', pathMatch: 'full' }
    ]
  },
  { path: ':id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }