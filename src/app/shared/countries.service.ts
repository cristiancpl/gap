import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Country } from '../models/countries.model';

@Injectable()
export class CountriesService {

  constructor(private http: Http) {  }

  GetCountries(): Observable<Country[]> {
    return this.http.get('https://restcountries.eu/rest/v2/region/americas').pipe(map(response => {
      return response.json() as Country[];
    }));
  }

}
