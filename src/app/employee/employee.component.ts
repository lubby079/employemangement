import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 

import Swal from 'sweetalert2';
 

declare var particlesJS: any;

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports: [CommonModule, FormsModule, RouterModule ]
})
export class EmployeeComponent {
  newEmployee = { name: '', email: '', department: '', role: '', salary: 0 };

  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];
  roles = ['Manager', 'Developer', 'Designer', 'Accountant', 'Support'];
isEditing: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    particlesJS.load('particles-js', 'particles-config.json', () =>
      console.log('Particles.js loaded')
    );
  }

  addEmployee(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields before submitting.',
        confirmButtonColor: '#d33'
      });
      return;  
 }
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => this.success('Employee Added', form),
      error: () => this.error('Failed to add employee')
    });
  }


  public success(message: string, form: NgForm) {
    Swal.fire({ 
      icon: 'success', 
      title: message, 
      text: 'Employee has been successfully added!', 
      confirmButtonColor: '#3085d6' 
    });
    this.resetForm(form);
  }

  public error(message: string) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Oops...', 
      text: message 
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newEmployee = { name: '', email: '', department: '', role: '', salary: 0 };
  }
}
