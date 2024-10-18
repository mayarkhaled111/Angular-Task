import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  private baseUrl: string = 'http://task.soft-zone.net/api';  
  private employees: any[] = [];

  constructor(private http: HttpClient) { 
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employees/getAllEmployees`);
  }

  getEmployeesById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employees/getEmpByID/${id}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employees/deleteEmpByID/${id}`);
  }

  updateEmployee(employeeData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/Employees/editEmployee`, employeeData,{headers});
  }

  createEmployee(employeeData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/Employees/addEmployee`, employeeData, { headers });
  }
}
