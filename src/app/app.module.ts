import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { PrimeNGModule } from './primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { employeeFormReducer } from './shared/store/employee-form.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiInterceptor } from './shared/api.interceptor';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    PrimeNGModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ employees: employeeFormReducer }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideClientHydration(), 
    provideHttpClient(),
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
