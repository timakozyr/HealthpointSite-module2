import { User } from "./user";

export class Doctor extends User {
    doctorId: number = 0;
    specialization: number;
    rating: number;
}