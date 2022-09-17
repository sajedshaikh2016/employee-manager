import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Employee } from './employee';

export interface employeeForm extends FormGroup<{
  name: FormControl<string>,
  email: FormControl<string>,
  jobTitle: FormControl<string>,
  phone: FormControl<number | null>,
  imageUrl: FormControl<string>
}> { }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public employeeList!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public form!: employeeForm;

  constructor(private _appService: AppService, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.nonNullable.group({
      name: this._formBuilder.nonNullable.control(''),
      email: this._formBuilder.nonNullable.control(''),
      jobTitle: this._formBuilder.nonNullable.control(''),
      phone: this._formBuilder.control(3646545456),
      imageUrl: this._formBuilder.nonNullable.control('')
    });
  }

  public employeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    jobTitle: new FormControl(''),
    phone: new FormControl(''),
    imageUrl: new FormControl('')
  })

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

  public onAddEmployee(addForm: any): void {
    const addEmployeeForm = document.getElementById('add-employee-form');
    if (addEmployeeForm) {
      addEmployeeForm.click();
    }
    this._appService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
      complete: () => {
        console.info('addEmployee complete successfully!');
      }
    });
  }

  public reset() {
    this.employeeForm.reset();
  }


}
