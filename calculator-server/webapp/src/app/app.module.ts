import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CalculatorComponent} from './root/calculator/calculator.component';
import {InputAmountComponent} from './root/calculator/input-amount/input-amount.component';
import {ResultCardsComponent} from './root/calculator/result-cards/result-cards.component';
import {Interceptor} from "./interceptor/interceptor.service";
import {ChooseAmountComponent} from './root/calculator/choose-amount/choose-amount.component';
import {
  InputAmountFormControlComponent
} from './root/calculator/input-amount-form-control/input-amount-form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    InputAmountComponent,
    ResultCardsComponent,
    ChooseAmountComponent,
    InputAmountFormControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
