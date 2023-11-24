export class UserLoginRequest {
    email: string;
    password: string;

    constructor(obj: Record<string, any>) {
        this.email = obj.email;
        this.password = obj.password;
    }
}
