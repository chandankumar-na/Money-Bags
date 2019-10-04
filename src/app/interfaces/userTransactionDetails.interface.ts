export class UserTransactionDetails {

    constructor(
      public user_id?: string,
      public user_tran_id?: string,
      public user_capital_amount_actual?: number , 
      public user_capital_amount_profit?: number,
      public user_capital_amount_total?: number,
      public user_capital_amount_date?: string,
      public user_get_owes_amount?: number,
      public user_profit_amount?: number,
      public user_expenditure_amount?: number,
      public user_in_hand_cash?: number,
    ) {
      this.user_id = user_id;
      this.user_tran_id = user_tran_id;
      this.user_capital_amount_actual = user_capital_amount_actual
      this.user_capital_amount_profit = user_capital_amount_profit
      this.user_capital_amount_total = user_capital_amount_total
      this.user_capital_amount_date = user_capital_amount_date;
      this.user_get_owes_amount = user_get_owes_amount;
      this.user_profit_amount = user_profit_amount
      this.user_expenditure_amount = user_expenditure_amount;
      this.user_in_hand_cash = user_in_hand_cash;
    }
  }
  