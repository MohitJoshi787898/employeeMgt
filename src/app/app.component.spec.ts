import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'; // Import your header component
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './components/sidebar/sidebar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add any necessary modules
      declarations: [AppComponent, HeaderComponent, SidebarComponent] // Declare the header component here
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});