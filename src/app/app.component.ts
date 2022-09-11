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


}
