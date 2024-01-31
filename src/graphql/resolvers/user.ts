import User from "../../models/user";
import { CreateUserArgs, LoginArgs, UpdateUserArgs } from "../../types";

export default {
  Query: {
    users: async () => await User.find({}),

    user: async (_: any, args: { id: string }) => {
      const { id } = args;
      const user = await User.findById(id);

      if (!user) {
        throw new Error(`No user with id: ${id}`);
      }

      return user;
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserArgs) => {
      const { name, email, username, password, age } = args.input;

      await User.create({ name, email, username, password, age });
      return true;
    },

    login: async (_: any, args: LoginArgs) => {
      const { email, password } = args;
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(`No user with email: ${email}`);
      }

      const isPasswordCorrect = await user.correctPassword(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }

      const token = user.generateAuthToken();

      return { token };
    },

    updateUser: async (_: any, args: UpdateUserArgs) => {
      const id = args.id;
      const { name, username, age } = args.input;
      const user = await User.findByIdAndUpdate(id, {
        name,
        username,
        age,
      });

      if (!user) {
        throw new Error(`No user with id: ${id}`);
      }

      return user;
    },

    deleteUser: async (_: any, args: { id: string }) => {
      const { id } = args;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error(`No user with id: ${id}`);
      }

      return true;
    },
  },
};
