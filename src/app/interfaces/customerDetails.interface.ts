export class CustomerDetails {

  constructor(
    public user_id?: string,
    public cust_id?: string,
    public cust_name?: string,
    public cust_phone?: string,
    public cust_address?: string, 
    public cust_aadhaar?: string
    
  ) {
    this.user_id = user_id;
    this.cust_id = cust_id;
    this.cust_name = cust_name
    this.cust_phone = cust_phone;
    this.cust_address = cust_address;
    this.cust_aadhaar = cust_aadhaar;
  }
}
