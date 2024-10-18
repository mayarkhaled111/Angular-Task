import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../Services/employees.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent implements OnInit{
  employees: any[] = [];
  newEmploy = {
    "empName": "",
    "empEmail": "",
    "empAddress": "",
    "empPhone": ""
  }


  constructor(private employeeService: EmployeesService) { }
  @ViewChild('staticBackdrop', { static: false }) modal!: ElementRef;
  ngOnInit(): void {
  }

  addEmployee() {
    this.employeeService.createEmployee(this.newEmploy).subscribe(
      (response) => {
        console.log('Employee added:', response);
        this.employeeService.getEmployees().subscribe((employees) => {
          this.employees = employees;
          window.location.reload()
        });
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }
  

}

