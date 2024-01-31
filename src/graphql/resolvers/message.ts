export default {
  Query: {
    messages: () => messages,

    message: (_: any, args: any) => {
      const { id } = args;
      const message = messages.find(
        (message) => String(message.id) === String(id),
      );

      if (!message) {
        throw new Error(`No message with id: ${id}`);
      }

      return message;
    },
  },
};
