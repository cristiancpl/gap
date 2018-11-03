import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employees.model';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  @ViewChild('filterValue') filterValueRef: ElementRef;

  constructor(public dialog: MatDialog,
    private router: Router,
    private snotifyService: SnotifyService) {
    
    this.getEmployees();
  }

  ngOnInit() {
    //this.dataSource.sort = this.sort;
  }

  applyFilter() {
    //this.dataSource.filter = this.filterValueRef.nativeElement.value.trim().toLowerCase();
  }

  cleanFilter() {
    //this.filterValueRef.nativeElement.value = '';
    //this.dataSource.filter = '';
  }

  view(id: number) {
    this.router.navigateByUrl('/some-car/view/' + id);
  }

  edit(id: number) {
    this.router.navigateByUrl('/some-car/edit/' + id);
  }

  add() {
    this.router.navigateByUrl('/some-car/new/');
  }

  getEmployees() {
    //this.employees.subscribe(employees =>
    //  this.dataSource = new MatTableDataSource(employees)
    //);
  }

  delete(item: Employee) {
    //const dialogRef = this.dialog.open(DialogConfirmComponent, {
    //  disableClose: true,
    //  data: item
    //});
    //dialogRef.afterClosed().subscribe(employee => {
    //  if (employee) {
    //    this.store.dispatch(new EmployeeActions.RemoveEmployee(employee));
    //    this.snotifyService.success('The Employee has been deleted', 'Success');
    //  }
    //  this.getEmployees();
    //});
  }

}
