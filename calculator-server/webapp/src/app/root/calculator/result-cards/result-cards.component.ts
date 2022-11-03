import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.scss']
})
export class ResultCardsComponent  {

 @Input() values: number[] | undefined;


}
