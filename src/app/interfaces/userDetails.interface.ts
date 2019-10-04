export class UserDetails {
    constructor(
        //login details
        public user_id?: string,
        public user_name?: string,
        public user_password?: string,
        public user_phone?: string,
        public user_email?: string
    ) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_phone = user_phone;
        this.user_email = user_email;
    }
}

