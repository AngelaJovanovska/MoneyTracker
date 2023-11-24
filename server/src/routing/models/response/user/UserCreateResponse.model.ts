import { User } from "../../../../entities/User";

export class UserCreateResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    // { [key: string]: any } === Record<string, any>
    constructor(user: User) {
        this.email = user.email;
        this.username = user.username;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.id = user.id;
    }
}
