import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './employee/employee.service';
import Swal from 'sweetalert2';
 
declare var particlesJS: any;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employelist.html',
  styleUrls: ['./employelist.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  isEditing = false;
  editEmployeeId: number | null = null;
  employeeForm = { name: '', email: '', department: '', role: '', salary: 0 };
  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];
  roles = ['Manager', 'Developer', 'Designer', 'Accountant', 'Support'];
  searchText: string = '';

  constructor(private emp: EmployeeService) {}

  ngOnInit() {
    particlesJS.load('particles-js', 'particles-config.json', () => console.log('Particles loaded'));
    this.load();
  }
  get filteredEmployees() {
    return this.employees.filter(e =>
      e.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  load() {
    this.emp.getEmployees().subscribe({
      next: data => this.employees = data.reverse(),
      error: err => console.error(err)
    });
  }

  del(id: number) {
    Swal.fire({ title: 'Delete?', text: 'Confirm deletion', icon: 'warning', showCancelButton: true })
      .then(r => r.isConfirmed && this.emp.deleteEmployee(id).subscribe({
        next: () => { this.load(); Swal.fire('Deleted!', '', 'success'); },
        error: () => Swal.fire('Error', 'Failed to delete', 'error')
      }));
  }

  edit(e: any) {
    this.isEditing = true;
    this.editEmployeeId = e.employeeID;
    this.employeeForm = { ...e };
  }

  update() {
    if (!this.editEmployeeId) return;
    this.emp.updateEmployee(this.editEmployeeId, this.employeeForm).subscribe({
      next: () => { this.reset(); this.load(); Swal.fire('Updated!', '', 'success'); },
      error: () => Swal.fire('Error', 'Update failed', 'error')
    });
  }

  reset() {
    this.employeeForm = { name: '', email: '', department: '', role: '', salary: 0 };
    this.isEditing = false;
    this.editEmployeeId = null;
    Swal.fire('Cleared', '', 'info');
  }
}
