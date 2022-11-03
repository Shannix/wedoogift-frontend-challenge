import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CalculatorResult} from "../model/calculatorResult";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  dataSource = new Subject<number>();
  correctDesiredAmount = this.dataSource.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Envoi une requete au serveur pour récuperer les bonnes cartes.
   */
  searchCombination(value: number, shopId: number): Observable<CalculatorResult> {
    return this.http.get<CalculatorResult>(`/shop/${shopId}/search-combination?amount=${value}`);
  }

  /**
   * Affecte une valeur dans l'observable.
   * */
  setDesiredAmout(value: number): void {
    this.dataSource.next(value);
  }

}
