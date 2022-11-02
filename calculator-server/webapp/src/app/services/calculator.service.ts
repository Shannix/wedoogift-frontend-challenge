import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  /*SERVER_API_URL +*/
  apiUrl: string =  '/services/operation/api';

  constructor(private http: HttpClient) { }

  searchCombination(value: number, shopId: number): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrl + `/shop/${shopId}/search-combination`, value);
  }

}
