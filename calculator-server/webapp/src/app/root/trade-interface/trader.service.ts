import {Injectable} from '@angular/core';
import {DetailedQuote} from "../../model/detailedQuote";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TraderService {

  // Full URL example https://live.euronext.com/en/ajax/getDetailedQuote/FR0000133308-XPAR
  // Actual website calls this URL repeatedly to display live price. FI, using http redirect (302) to https.
  EURONEXT_URL = 'https://live.euronext.com/en/ajax/getDetailedQuote/';
  EURONEXT_FULL_QUOTE_URL = 'https://live.euronext.com/en/intraday_chart/getDetailedQuoteAjax/';
  USER_AGENT = 'Mozilla/5.0';

  constructor(private http: HttpClient) {
  }

  /**
   * Envoi une requete au serveur pour récuperer les bonnes cartes.
   */
  getDetailedQuotePost(isin: string, market: string): Observable<DetailedQuote> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    const options = {headers: headers, responseType: 'text'};

    const params = new HttpParams().set('theme_name', 'euronext_live')
      .set('responseType', 'text')

    // @ts-ignore
    return this.http.post(this.EURONEXT_URL + `${isin}-${market}`, params, options)
      .pipe(map((response: any) => {
        const el = document.createElement('html');
        el.innerHTML = response;
        // @ts-ignore
        const price = this.parseEuronextNumber(el?.querySelector('#header-instrument-price').innerHTML);
        // @ts-ignore
        const name = el?.querySelector('#header-instrument-name').innerHTML;
        return new DetailedQuote(name, price);
      }));
  }


  /**
   * Get the detailed quote of the instrument.
   *
   * @param {string} isin ISIN of the instrument (for example FR0000133308)
   * @param {string} market Market code of the instrument (for example XPAR)
   * @returns {Promise<DetailedQuote>} The detailed quote
   */
  async getDetailedQuote(isin: string, market: string) {
    const url: any = new URL(`${isin}-${market}`, this.EURONEXT_URL);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 24/05/2020 update: does not seem necessary anymore. Still present in case
        // it becomes necessary again
        'User-Agent': this.USER_AGENT,
        // 'Origin': 'https://live.euronext.com',
        // Without it, reply is empty
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'theme_name=euronext_live'
    });
    const html = await response.text();

    return html;

    /*
    const root = HTMLParser.parse(html);
    const instrumentName = root.querySelector('#header-instrument-name').text.trim();
    const price = this.parseEuronextNumber(root.querySelector('#header-instrument-price').innerHTML);
    return new DetailedQuote(instrumentName, price);*/

  }

  parseEuronextNumber(s: any) {
    return Number(s.replace(/,/g, ''));
  }


}
