export class Exception {
    message: string;
    constructor(message: string) {
        this.message = message ?? "User Not Found";
    }
}
export class UserNotFoundException extends Exception {
    constructor(message?: string) {
        super(message ?? "User Not Found");
    }
}
export class MalformedRequestParamsException extends Exception {
    constructor(message?: string) {
        super(message ?? "Malformed request parms");
    }
}
export class InternalServerException extends Exception {
    constructor(message?: string) {
        super(message ?? "internal server error");
    }
}
//to do
