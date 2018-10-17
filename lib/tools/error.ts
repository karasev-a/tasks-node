class MyError extends Error {
    constructor(public message: string, public status?: number ) {
        super(message);
        this.status = status;
    }

}

export const TE = (errorMessage: string, status?: number) => {
    throw new MyError(errorMessage, status);
};
