import { User } from "src/entities/User";

export class UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
    }
}
export class UserResponseExpense {
    id: number;
    username: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
    }
}
export function usersToUserResponse(users: User[]): UserResponse[] {
    return users.map((user) => new UserResponse(user));
}
