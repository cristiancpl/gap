import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employees.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CountriesService } from '../../shared/countries.service';
import { Country } from '../../models/countries.model';
import { AREA_DATA } from '../../models/base.model';
import * as EmployeeActions from '../../actions/employess.actions';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

enum Views { new, edit, view }
enum JobTitleEnum { waitress = 4, dining = 5 }

@Component({
  selector: 'app-some-user',
  templateUrl: './some-user.component.html',
  styleUrls: ['./some-user.component.css'],
  providers: [CountriesService]

})
export class SomeUserComponent implements OnInit {

  private sub: any;
  view = Views.new;
  views = Views;
  currentEmployee = new Employee();
  employees: Observable<Employee[]>;
  countries: Country[] = [];
  areas = AREA_DATA;
  jobsTitleEnum = JobTitleEnum;

  userForm: FormGroup;

  maxDob: Date;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService) {

    this.employees = store.select('employee');
    this.maxDob = new Date();
    this.maxDob.setFullYear(this.maxDob.getFullYear() - 18);
  }


  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {

      let name_enum: string = params['view'];
      this.view = <Views>Views[name_enum];
      this.currentEmployee.id = params['id'];

      if (this.view == this.views.new) {
        this.currentEmployee.status = true;
        this.currentEmployee.area = this.areas[0];
      }
      else {
        this.employees.subscribe(employees => {
          this.currentEmployee = employees.find(x => x.id == this.currentEmployee.id);
          this.currentEmployee.area = this.areas.find(x => x.id == this.currentEmployee.area.id);

          this.currentEmployee.jobTitle = this.currentEmployee.jobTitle;
        });
      }

      this.getCountries();

    });

    this.userForm = this.formBuilder.group({
      nameFormControl: [{ value: '', disabled: this.view == this.views.view }, Validators.required],
      dobFormControl: [{ value: '', disabled: this.view == this.views.view }, [Validators.required]],
      countryFormControl: [{ value: '', disabled: this.view == this.views.view }, Validators.required],
      usernameFormControl: [{ value: '', disabled: this.view == this.views.view }, [Validators.required, Validators.pattern('^[a-zA-Z0-9äöüÄÖÜ]*$')]],
      hireDateFormControl: [{ value: '', disabled: this.view == this.views.view }, Validators.required],
      statusFormControl: [{ value: '', disabled: this.view == this.views.view }, Validators.required],

    });

  }

  get nameFormControl() { return this.userForm.get('nameFormControl'); }
  get dobFormControl() { return this.userForm.get('dobFormControl'); }
  get countryFormControl() { return this.userForm.get('countryFormControl'); }
  get usernameFormControl() { return this.userForm.get('usernameFormControl'); }
  get hireDateFormControl() { return this.userForm.get('hireDateFormControl'); }


  back() {
    this.router.navigateByUrl('/employees');
  }

  getCountries() {
    this.countriesService.GetCountries().subscribe(
      data => {
        if (data) {
          this.countries = data;
          if (this.currentEmployee && this.currentEmployee.country && this.view != this.views.new) {
            this.currentEmployee.country = this.countries.find(x => x.alpha3Code == this.currentEmployee.country.alpha3Code);
          }
        }
        else {
          this.countries = [];
        }
      },
      error => { alert(error); });
  }

  save() {
    this.currentEmployee.age = this.calculateAge(this.currentEmployee.dob);
    if (this.view == this.views.new) {
      this.store.dispatch(new EmployeeActions.AddEmployee(this.currentEmployee));
      this.snotifyService.success('The Employee has been added', 'Success');
    }
    else if (this.view == this.views.edit) {
      this.store.dispatch(new EmployeeActions.EditEmployee(this.currentEmployee));
      this.snotifyService.success('The Employee has been updated', 'Success');
    }

    this.router.navigateByUrl('/employees');
  }

  selectJobTitleParent(jobTitle) {
    this.currentEmployee.jobTitle = jobTitle;
  }

  calculateAge(dob: Date) {
    let ageDifMs = Date.now() - dob.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
