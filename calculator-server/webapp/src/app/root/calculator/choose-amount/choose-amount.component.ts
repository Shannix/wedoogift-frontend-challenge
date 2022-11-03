import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-choose-amount',
  templateUrl: './choose-amount.component.html',
  styleUrls: ['./choose-amount.component.scss']
})
export class ChooseAmountComponent {

  /** un choix de valeur pour l'utilisateur. */
  @Input() values: number[] | undefined;
  /** retourne la valeur selectionnée par l'utilisateur  */
  @Output() selectedValue = new EventEmitter<number>();

  /**
   * Retourne la valeur selectionné par l'utilisateur.
   * */
  selectValue(value: number): void {
    this.selectedValue.emit(value);
  }

}
