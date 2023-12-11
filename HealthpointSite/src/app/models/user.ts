export enum UserProfile {
    admin = "admin",
    doctor = "doctor",
    user = "user"
}

export class User {
    id: number = 0;
    password: string = "";
    profile: UserProfile = UserProfile.user;
    email: string = "";
    last_name: string = "";
    first_name: string = "";
    patronymics: string = "";
    name: string = "";
    city: string = "";
    FIO: string = "";

    static createNewUserEmpty(profile: string) {
        return new User(UserProfile[profile]);
    }

    static createNewUser(profile: string, email: string, first_name: string, last_name: string, patronymics: string, city: string) {
        var to_return = new User;
        to_return.profile = UserProfile[profile];
        to_return.email = email;
        to_return.first_name = first_name;
        to_return.last_name = last_name;
        to_return.patronymics = patronymics;
        to_return.city = city;
        
        return to_return;
    }

    constructor(profile: UserProfile = UserProfile.user) {
        this.profile = profile;
    }
}
