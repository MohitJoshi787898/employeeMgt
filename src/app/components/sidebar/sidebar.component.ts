import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'pi-th-large', label: 'Dashboard' },
    { icon: 'pi-users', label: 'Employees' },
    { icon: 'pi-calendar', label: 'Calendar' },
    { icon: 'pi-clock', label: 'Time' },
    { icon: 'pi-users', label: 'Teams' },
    { icon: 'pi-file', label: 'Documents' },
    { icon: 'pi-chart-bar', label: 'Reports' }
  ];
}