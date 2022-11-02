import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss']
})
export class InputAmountComponent implements OnInit {

  montant: FormControl = new FormControl();

  @Output() searchCards = new EventEmitter<number>();

  ngOnInit(): void {
  }

}
