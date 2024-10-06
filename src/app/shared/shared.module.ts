import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { employeeFormReducer } from './store/employee-form.reducer';
import { EmployeeFormEffects } from './store/employee-form.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employeeForm', employeeFormReducer),
    EffectsModule.forFeature([EmployeeFormEffects])
  ],
  exports: []
})
export class SharedModule { }