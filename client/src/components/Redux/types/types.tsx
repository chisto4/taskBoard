export interface usersInterface {
    id: number,
    name?: string,
    surname?: string,
    login?: string,
    password?: string,
    email?: string,
    dob?: string,
    token?: string,
}

export interface actionInterface {
    type: string,
    payload: usersInterface[],
}

