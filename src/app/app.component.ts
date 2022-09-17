import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from './app.service';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public employeeList!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this._appService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employeeList = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
      complete: () => {
        console.info('getEmployees API call complete successfully!');
      }
    });
  }

  public onOpenModal(employee: Employee | any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    if (button) {
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
    }
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    if (container) {
      container.appendChild(button);
    }
    button.click();
  }




}
