import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/employee.reducer';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { EmployeesComponent } from './ui/employees/employees.component';
import { SomeUserComponent } from './ui/some-user/some-user.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SnotifyModule,
    BrowserAnimationsModule,
    UiModule,

    // App Routing
    RouterModule.forRoot([
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: EmployeesComponent },
      { path: 'some-user/:view/:id', component: SomeUserComponent },
      { path: '**', redirectTo: 'employees' }
    ]),

    StoreModule.forRoot({
      employee: reducer
    })
  ],

  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
