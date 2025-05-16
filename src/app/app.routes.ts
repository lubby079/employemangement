import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employelist';


//const routes: Routes = [
//  { path: 'dashboard', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
//  { path: 'employee-management', loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent) },
//  { path: 'employelist', loadComponent: () => import('./employelist').then(m => m.EmployeeListComponent) },
//  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//  { path: '**', redirectTo: 'dashboard' }
//];
 export const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'employee-management', component: EmployeeComponent },
   { path: 'employelist', component: EmployeeListComponent },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];
