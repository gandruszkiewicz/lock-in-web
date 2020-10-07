  export interface SecuredInformationResponse{
    id: number,
    userId: string,
    information: string,
    name: string,
    sendEmail: string,
    sendDateTime: Date,
    isBlocked: boolean,
    isSend: boolean,
    isSendReminder: boolean
  }