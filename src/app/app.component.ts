import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[];
  public editEmployee!: Employee | null;
  public deleteEmployee!: Employee | null;
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe({
      next: (response : Employee[])=>{
        this.employees= response;
      },
      error: (error : HttpErrorResponse)=>{
        alert(error.message);
      }
    });

  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response : Employee[])=>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error : HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response : Employee[])=>{
        console.log(response);
        this.getEmployees();
      },
      error: (error : HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

  public onDeleteEmployee(employeeId: number ): void{
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response : void)=>{
        console.log(response);
        this.getEmployees();
      },
      error: (error : HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

  public onOpenModal(employee: Employee | null, mode: string): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode === 'add'){
      console.log("heyyyyy");
      button.setAttribute('data-bs-target','#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-bs-target','#updateEmployeeModal');     
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target','#deleteEmployeeModal');
      
    }
    container?.appendChild(button);
    button.click();

  }
}
