import { movies, users } from "../lib/db";

const queries = {
  users: () => {
    const usersWithFriends = users.map((user) => {
      const friends = user.friends.map((friendId) => {
        return users.find((user) => String(user.id) === String(friendId));
      });
      return { ...user, friends };
    });
    return usersWithFriends;
  },

  user: (_: any, args: any) => {
    const { id } = args;
    const user = users.find((user) => String(user.id) === String(id));

    if (!user) {
      throw new Error(`No user with id: ${id}`);
    }
    const friends = user.friends.map((friendId) => {
      return users.find((user) => String(user.id) === String(friendId));
    });

    return { ...user, friends };
  },

  movies: () => movies,

  movie: (_: any, { name }: { name: string }) =>
    movies.find((movie) =>
      movie.name.toLowerCase().includes(name.toLowerCase()),
    ),
};

type CreateUserPayload = {
  name: string;
  username: string;
  age: number;
  nationality: string;
};

type UpdateUserPayload = {
  name?: string;
  username?: string;
  age?: number;
  nationality?: string;
};

const mutations = {
  createUser(_: any, { input }: { input: CreateUserPayload }) {
    const user = {
      ...input,
      friends: [],
      id: users.length + 1,
    };
    users.push(user);

    return user;
  },

  updateUser(_: any, { id, input }: { id: number; input: UpdateUserPayload }) {
    const userIndex = users.findIndex((user) => String(user.id) === String(id));
    if (userIndex === -1) {
      throw new Error(`No user with id: ${id}`);
    }
    const user = {
      ...users[userIndex],
      ...input,
    };
    users[userIndex] = user;

    return user;
  },

  deleteUser(_: any, { id }: { id: number }) {
    const userIndex = users.findIndex((user) => String(user.id) === String(id));
    if (userIndex === -1) {
      throw new Error(`No user with id: ${id}`);
    }
    const user = users[userIndex];
    users.splice(userIndex, 1);

    return user;
  },
};

const User = {
  favoriteMovies: () =>
    movies.filter(
      (movie) =>
        movie.yearOfPublication >= 2010 && movie.yearOfPublication <= 2012,
    ),
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
  User,
};

export default resolvers;
