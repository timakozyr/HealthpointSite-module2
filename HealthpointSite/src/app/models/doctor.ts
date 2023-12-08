import { User } from "./user";

export class Doctor {
    id: number = 0;
    FIO: string = "";
    specializationId: number;
    specialization: string = "";
    specializationDesc: string = "";
    rating: number = 5;

    static createDoctor(user: User, specialization: number) {
        let to_return = new Doctor;
        to_return.FIO = user.FIO();
        to_return.specialization = specialization.toString();

        return to_return
    }
}