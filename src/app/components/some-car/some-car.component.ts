import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
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
    private carService: CarsService,
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService) {
  }


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.carService.GetCar(id).subscribe(data => {
        this.currentCar = data;
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
