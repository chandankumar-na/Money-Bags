import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { LoanComponent } from './loan/loan.component';
import { CustDatePipe } from './cust-date.pipe';
import { SearchPipe } from './search.pipe';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AccountsComponent } from './accounts/accounts.component';
import { FirstNamePipe } from './first-name.pipe';
import { LoanSearchPipe } from './loan-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerComponent,
    LoanComponent,
    CustDatePipe,
    SearchPipe,
    AccountsComponent,
    FirstNamePipe,
    LoanSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
