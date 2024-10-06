import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    ToastModule,
    CheckboxModule,
    TooltipModule,
    PasswordModule,
    RippleModule,
    TabViewModule,
    TagModule,
    OverlayPanelModule,
    StepsModule,
    PanelModule,
    CalendarModule,
  ],
  exports: [
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    ToastModule,
    CheckboxModule,
    TooltipModule,
    PasswordModule,
    RippleModule,
    TabViewModule,
    TagModule,
    OverlayPanelModule,
    StepsModule,
    PanelModule,
    CalendarModule,
  ]
})
export class PrimeNGModule { }
