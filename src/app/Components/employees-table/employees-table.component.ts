import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmployeesService } from '../../Services/employees.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})

export class EmployeesTableComponent implements OnInit, OnChanges  {
  employees: any[] = [];
  selectedEmployee: any = null;
  paginatedEmployee:any[] = []
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  employeeToDelete:number | null = null
  employeeToEdit:number | null = null
  isLoading:boolean = true
  sortedArr:any [] =[]
  selectAll:boolean = false



  editEmployeeData: any = {
    "empName": "",
    "empEmail": "",
    "empAddress": "",
    "empPhone": ""
  }

  constructor(private employeeService: EmployeesService) {
  }

  ngOnInit(): void {
    this.getEmployees()
    console.log(this.employees);
    
  }

  ngOnChanges(): void {
    this.getEmployees()
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.totalPages = Math.ceil(this.employees.length/this.pageSize)
        this.paginatedEmployees();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  deleteEmployee(): void {
    if(this.employeeToDelete !== null){
      this.employeeService.deleteEmployee(this.employeeToDelete).subscribe(
        () => {
          // this.employees = this.employees.filter(emp => emp.id !== id);
          this.getEmployees();
          this.employeeToDelete = null;
          window.location.reload()
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  paginatedEmployees():void{
    const start = (this.page - 1 ) * this.pageSize;
    const end = start + this.pageSize
    this.isLoading = false
    this.paginatedEmployee = this.employees.slice(start,end)
    
  }

  onPageChange(page:number){
    this.page = page;
    this.paginatedEmployees()
  }

  openDelModal(id:number){
    this.employeeToDelete = id
  }

  openEditModal(id:number){
    this.employeeToEdit = id
    this.employeeService.getEmployeesById(id).subscribe((data) => {
      this.editEmployeeData = {empName: data.empName,empEmail:data.empEmail,empAddress:data.empAddress,
        empPhone:data.empPhone
      }
    })
  }

  updateEmployee(): void {
    if (this.employeeToEdit !== null) {
      const updatedEmploy = {
         id: this.employeeToEdit,
        ...this.editEmployeeData
      };
      this.employeeService.updateEmployee(updatedEmploy).subscribe(() => {
        this.getEmployees();
        console.log(updatedEmploy);
        
      });
      this.employeeToEdit = null;
    }
  }

  sort(type: string): void {
    this.paginatedEmployee.sort((a, b) => {
      if (a[type] < b[type]) {
        return -1;
      } else if (a[type] > b[type]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  
  toggleAll():void{
    this.paginatedEmployee.forEach(employee => {
      employee.selected = this.selectAll
    })
  }
}
