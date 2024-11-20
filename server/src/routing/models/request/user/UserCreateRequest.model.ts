import { User } from "../../../../entities/User";
import ds from "../../../../db";

const userRepository = ds.getRepository(User);

export class UserCreateRequest {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    // { [key: string]: any } === Record<string, any>
    constructor(obj: Record<string, any>) {
        this.email = obj.email;
        this.username = obj.username;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.password = obj.password;
    }

    async validate(): Promise<{ error: boolean; messages?: string[] }> {
        let error = false;
        const errorMessages: string[] = [];

        if ((this.username?.length ?? 0) <= 7) {
            errorMessages.push("username needs more than 7 characters");
            error = true;
        }

        if (this.email?.length) {
            const u = await userRepository.findOne({
                where: { email: this.email },
            });

            if (u) {
                errorMessages.push("email already exists");
                error = true;
            }
            const isValid = /^\S+@\S+\.\S+$/.test(this.email);

            if (!isValid) {
                errorMessages.push("it's not email");
                error = true;
            }
        }
        if (
            (this.first_name?.length ?? 0) <= 1 &&
            (this.last_name?.length ?? 0) <= 1
        ) {
            errorMessages.push(
                "first name and last name length must be more than 1 character"
            );
            error = true;
        }

        if (this.password?.length) {
            const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                this.password
            );

            if (!isValid) {
                errorMessages.push(
                    "Password needs to be at least 8characters in length and have at least one digit, lowercase, uppercase. "
                );
                error = true;
            }
        }

        return { error, messages: errorMessages };
    }

    toUser(): User {
        return userRepository.create({
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            username: this.username,
        });
    }
}
