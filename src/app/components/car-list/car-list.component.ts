import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  providers: [CarsService]
})
export class CarListComponent implements OnInit {

  @ViewChild('filterValue') filterValueRef: ElementRef;
  cars: Car[] = [];
  carsFilter: Car[] = [];

  constructor(public dialog: MatDialog,
    private router: Router,
    private carService: CarsService,
    private snotifyService: SnotifyService) {
  }

  ngOnInit() {
    this.getCars();
  }

  applyFilter() {
    this.carsFilter = this.cars.filter(x => x.brand.toLowerCase().includes(this.filterValueRef.nativeElement.value.trim().toLowerCase()));
  }

  cleanFilter() {
    this.filterValueRef.nativeElement.value = '';
    this.carsFilter = this.cars;
  }

  view(id: number) {
    this.router.navigateByUrl('/some-car/' + id);
  }

  edit(id: number) {
    this.router.navigateByUrl('/some-car/edit/' + id);
  }

  add() {
    this.router.navigateByUrl('/some-car/new/');
  }

  getCars() {
    this.carService.GetCars().subscribe(data => {
      if (data)
        this.cars = this.orderByBrandAsc(data);
      else
        this.cars = [];

      this.carsFilter = this.cars;
    },
      error => { alert(error); });
  }

  getAvatar(url: string) {
    return "url('" + url + "')";
  }

  orderByBrandAsc(array: any) {
    return array.sort(
      function compare(a, b) {
        if (a.brand < b.brand)
          return -1;
        if (a.brand > b.brand)
          return 1;
        return 0;
      });
  }

}
