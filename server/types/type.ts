export interface userReq {
  user: string,

}

export interface TokenUserType {
  user: {
    id: number,
    token: string,
  }
}