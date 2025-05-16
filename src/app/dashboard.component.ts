import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './employee/employee.service';

declare var particlesJS: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
   
  })
export class DashboardComponent implements OnInit {
  employees: any[] = [];

  summaryCards = [
    { title: 'Total Employees', value: 0 },
    { title: 'Active Employees', value: 0 },
    { title: 'Pending Approvals', value: 0 },
    { title: 'Recent Hires', value: 0 }
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
  
    particlesJS.load('particles-js', 'particles-config.json', () => {
      console.log('Particles.js config loaded');
    });

   
    this.employeeService.getEmployees().subscribe({
      next: (data: any[]) => {
        this.employees = data;
        this.summaryCards = [
          { title: 'Total Employees', value: data.length },
          { title: 'Active Employees', value:120},
          { title: 'Pending Approvals', value: 5 },  
          { title: 'Recent Hires', value: 23 }
        ];
      },
    });
  }
}
