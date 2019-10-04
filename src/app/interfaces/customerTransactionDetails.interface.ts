export class CustomerTransactionDetails {

    constructor(
        public user_id?: string,
        public cust_id?: string,
        public cust_name?: string,
        public cust_tran_id?: string,
        public cust_tran_amount?: number,
        public cust_tran_monthly_amount?: number,
        public cust_tran_total_instalments?: number,
        public cust_tran_paid_instalments?: number,
        public cust_tran_interest?: number,

        public cust_tran_start_date?: Date,
        public cust_tran_end_date?: Date,
        public cust_tran_date?:Date,

        public cust_tran_balance?:number,
        public cust_tran_instalment_dates?:any[],
        public cust_tran_paid_flags?:any[],
        public cust_tran_ip_address?:any[]
        
      
    ) {
        this.user_id = user_id;
        this.cust_id = cust_id;
        this.cust_name=cust_name;
        this.cust_tran_id = cust_tran_id;
        this.cust_tran_amount = cust_tran_amount;
        this.cust_tran_monthly_amount = cust_tran_monthly_amount;
        this.cust_tran_total_instalments = cust_tran_total_instalments;
        this.cust_tran_paid_instalments = cust_tran_paid_instalments;

        this.cust_tran_interest = cust_tran_interest;
        this.cust_tran_start_date = cust_tran_start_date;
        this.cust_tran_end_date = cust_tran_end_date;
        this.cust_tran_date=cust_tran_date;
        this.cust_tran_balance=cust_tran_balance;
        this.cust_tran_instalment_dates=cust_tran_instalment_dates;
        this.cust_tran_paid_flags=cust_tran_paid_flags,
        this.cust_tran_ip_address=cust_tran_ip_address;
    }
}







