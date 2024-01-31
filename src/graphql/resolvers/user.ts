import { users } from "../../lib/db";
import User from "../../models/user";

export default {
  Query: {
    users: () => User.find(),

    user: (_: any, args: any) => {
      const { id } = args;
      const user = users.find((user) => String(user.id) === String(id));

      if (!user) {
        throw new Error(`No user with id: ${id}`);
      }

      return user;
    },
  },

  Mutation: {},
};
