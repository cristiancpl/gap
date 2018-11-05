import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';


@Injectable()
export class CarsService {

  constructor(private http: Http) {  }

  GetCars(): Observable<Car[]> {
    return this.http.get('../assets/data/cars.json').pipe(map(response => {
      return response.json() as Car[];
    }));
  }

  GetCar(id: number): Observable<Car> {
    return this.http.get('../assets/data/cars.json').pipe(map(response => {
      let cars = response.json() as Car[];
      return cars.find(x => x.id == id);
    }));
  }

}
