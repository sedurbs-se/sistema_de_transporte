

class AppError extends Error {
    public readonly statusCode: number;
    public readonly message: string;;

    constructor(message: string, statusCode: number) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
};

export default AppError;