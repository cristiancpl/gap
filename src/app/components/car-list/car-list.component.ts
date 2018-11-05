import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogCompareComponent } from '../dialog-compare/dialog-compare.component';
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
    private carService: CarsService) {
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

  get carsSelect(): number {
    return this.carsFilter.filter(x => x.select).length;
  }

  compare() {
    this.dialog.open(DialogCompareComponent, {
      data: this.carsFilter.filter(x => x.select)
    });
  }

}
