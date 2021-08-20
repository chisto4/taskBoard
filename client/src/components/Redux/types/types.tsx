export interface userInterface {
    id?: number,
    name?: string,
    surname?: string,
    login?: string,
    password?: string,
    email?: string,
    dob?: string,
    avatar: URL,
}

export interface actionInterface {
    type: string,
    payload: userInterface[],
}