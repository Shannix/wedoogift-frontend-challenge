import ValidatorUtils from "../util/validatorUtils";

export class DetailedQuote {
  instrumentName?: string;
  instrumentPrice: number = 0;
  openPrice?: number = 0;
  dateUpdate?: Date;
  qtePossession: number = 0;
  prixPru: number = 0;

  constructor(instrumentName: string, instrumentPrice: number) {
    this.instrumentName = instrumentName;
    this.instrumentPrice = ValidatorUtils.isNumberValidator(instrumentPrice);
    this.openPrice = ValidatorUtils.isNumberValidator(instrumentPrice);
  }
}
