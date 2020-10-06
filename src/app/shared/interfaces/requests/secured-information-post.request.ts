export interface SecuredInformationPostRequest{
    UserId: string,
    Information: string,
    Name: string,
    SendEmail: string,
    SendDateTime: string,
    IsBlocked: boolean
  }