import {User} from "../model/user.model";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class UserRepository {

    async create(user: any): Promise<User> {
        return await User.create(user);
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findByEmail(email: string): Promise<User[]> {
        return await User.findAll({
            where: {
                email: email
            }
        });
    }

}
