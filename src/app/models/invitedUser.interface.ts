import { User } from './user.interface';

export interface InvitedUser extends User {
    status: string;
}

export enum InvitationStatus {
    USER_INVITED = 200,
    USER_EXISTS = 409,
    USER_CANT_BE_ADDED = 500
}