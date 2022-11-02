import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CalculatorComponent } from './root/calculator/calculator.component';
import { InputAmountComponent } from './root/calculator/input-amount/input-amount.component';
import { ResultCardsComponent } from './root/calculator/result-cards/result-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    InputAmountComponent,
    ResultCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
