import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  UserService,
  AuthService,
  ProductService,
  OfferService
} from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ecomm-pre'}),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, UserService, ProductService, OfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
