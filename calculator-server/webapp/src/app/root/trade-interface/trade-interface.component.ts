import {Component, OnInit} from '@angular/core';
import {TraderService} from "./trader.service";
import {interval} from "rxjs";
import {DetailedQuote} from "../../model/detailedQuote";

@Component({
  selector: 'app-trade-interface',
  templateUrl: './trade-interface.component.html',
  styleUrls: ['./trade-interface.component.scss']
})
export class TradeInterfaceComponent implements OnInit {
  intervalCall = 4000;
  tradesOldValues: DetailedQuote[] = [];
  trades: DetailedQuote[] = [];

  number = Number;

  constructor(private traderService: TraderService) {
  }

  ngOnInit(): void {
    this.getCurrentTrade();
    const event = interval(this.intervalCall);

    event.subscribe(val => {
      this.tradesOldValues = this.trades;
      this.getActionInfos('NL0000235190', 'XPAR').then(() => {
        this.getActionInfos('FR0000121329', 'XPAR').then(() => {
          this.getActionInfos('FR0010220475', 'XPAR').then(() => {
            this.getActionInfos('FR0000120073', 'XPAR').then(() => {
              this.getActionInfos('FR0014004L86', 'XPAR').then(() => {
              });
            });
          });
        });
      });
    });

  }

  NavigationServiceFactory(): Promise<void> {
    return new Promise(resolve => resolve());
  }

  getActionInfos(isin: string, market: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.traderService.getDetailedQuotePost(isin, market).subscribe(value => {
        this.insertOrUpdateAction(value);
        resolve(true);
      });
    });
  }

  insertOrUpdateAction(value: DetailedQuote) {
    let findValue = this.trades.find(value1 => value1.instrumentName == value.instrumentName);
    if (findValue) {
      // @ts-ignore
      this.trades.find(value1 => value1.instrumentName == value.instrumentName).instrumentPrice = value.instrumentPrice
      // @ts-ignore
      this.trades.find(value1 => value1.instrumentName == value.instrumentName).dateUpdate = new Date();
    } else {
      value.dateUpdate = new Date();
      this.trades.push(value);
    }
  }

  getTotalPlusMoinsValues() {
    return this.trades.map(value => (value.instrumentPrice - value.prixPru) * value.qtePossession)
      .reduce((prev, next) => prev + next, 0);
  }


  enregistrerCurrentTrade() {
    localStorage.setItem('current-storage', JSON.stringify(this.trades));
  }

  getCurrentTrade() {
    const find = localStorage.getItem('current-storage');
    if (find) {
      this.trades = JSON.parse(find);
    } else {
      this.trades = [];
    }

  }


}
