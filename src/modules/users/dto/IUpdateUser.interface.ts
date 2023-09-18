import { ICreateUserDTO } from './ICreateUser.interface';

export interface IUpdateUserDTO extends ICreateUserDTO {
  id: string;
}
