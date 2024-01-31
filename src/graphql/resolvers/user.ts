import { GraphQLError } from "graphql";
import { validateEmail } from "../../lib/utils";
import User from "../../models/user";
import { CreateUserArgs, LoginArgs, UpdateUserArgs } from "../../types";

export default {
  Query: {
    users: async () => await User.find({}),

    user: async (_: any, args: { id: string }) => {
      const { id } = args;
      const user = await User.findById(id);

      if (!user) {
        throw new GraphQLError(`No user with id: ${id}`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      return user;
    },

    me: async (_: any, args: { id: string }, { me }: any) => {
      const user = me;
      if (!user)
        throw new GraphQLError("You are not authorized.", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });

      return user;
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserArgs) => {
      const { name, email, username, password, age } = args.input;

      const user = await User.create({ name, email, username, password, age });
      const token = user.generateAuthToken();

      return { token };
    },

    login: async (_: any, args: LoginArgs) => {
      const { email, password } = args;
      const query = validateEmail(email) ? { email } : { username: email };
      const user = await User.findOne(query);

      if (!user) {
        throw new GraphQLError(
          `No user with: ${validateEmail(email) ? "email " + email : "username " + email}`,
          {
            extensions: {
              code: "NOT_FOUND",
            },
          },
        );
      }

      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        throw new GraphQLError("Incorrect password", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const token = user.generateAuthToken();

      return { token };
    },

    updateUser: async (_: any, args: UpdateUserArgs, { me }: any) => {
      const id = args.id;
      const { name, username, age } = args.input;

      if (!me || me.role !== "admin")
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          },
        );

      const user = await User.findByIdAndUpdate(
        id,
        {
          name,
          username,
          age,
        },
        { new: true },
      );

      if (!user) {
        throw new GraphQLError(`No user with id: ${id}`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      return user;
    },

    deleteUser: async (_: any, args: { id: string }, { me }: any) => {
      const { id } = args;

      if (!me || me.role !== "admin")
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          },
        );

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new GraphQLError(`No user with id: ${id}`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      return true;
    },
  },
};
