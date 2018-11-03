import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employees.model';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import * as EmployeeActions from '../../actions/employess.actions';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Observable<Employee[]>;
  displayedColumns: string[] = ['name', 'age', 'username', 'hireDate', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild('filterValue') filterValueRef: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private snotifyService: SnotifyService) {
    this.employees = store.select('employee');
    this.getEmployees();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.filterValueRef.nativeElement.value.trim().toLowerCase();
  }

  cleanFilter() {
    this.filterValueRef.nativeElement.value = '';
    this.dataSource.filter = '';
  }

  view(id: number) {
    this.router.navigateByUrl('/some-user/view/' + id);
  }

  edit(id: number) {
    this.router.navigateByUrl('/some-user/edit/' + id);
  }

  add() {
    this.router.navigateByUrl('/some-user/new/');
  }

  getEmployees() {
    this.employees.subscribe(employees =>
      this.dataSource = new MatTableDataSource(employees)
    );
  }

  delete(item: Employee) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      data: item
    });
    dialogRef.afterClosed().subscribe(employee => {
      if (employee) {
        this.store.dispatch(new EmployeeActions.RemoveEmployee(employee));
        this.snotifyService.success('The Employee has been deleted', 'Success');
      }
      this.getEmployees();
    });
  }

}
