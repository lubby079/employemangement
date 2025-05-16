import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employelist';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],  
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent {
  title = 'employee-management';
  currentYear: number = new Date().getFullYear();

}
