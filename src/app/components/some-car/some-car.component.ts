import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-some-car',
  templateUrl: './some-car.component.html',
  styleUrls: ['./some-car.component.css'],
  providers: [CarsService]

})
export class SomeCarComponent implements OnInit {

  private sub: any;
  currentCar: Car = null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarsService) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      let id: number = params['id'];
      this.carService.GetCars().subscribe(data => {
        this.currentCar = data.find(x => x.id == id);
      },
      error => { alert(error); });
    });

  }

  getAvatar(url: string) {
    return "url('" + url + "')";
  }

  back() {
    this.router.navigateByUrl('/car-list');
  }

}
