export type RegisterUser = {
    username: string;
    password: string;
    email: string;
};

export enum RegisterType {
    RegisterAccount = 'REGISTER_ACCOUNT',
    AccountRegisteted = 'ACCOUNT_REGISTERED'
}
