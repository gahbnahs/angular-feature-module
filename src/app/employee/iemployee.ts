import {ISkill} from '../employee/iskill';
export interface IEmployee {
    id:number,
    fullName:string,
    contactPreference:string,
    email:string,
    phone:string,
    skills:ISkill[],
}
