import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { buildSubgraphSchema } from "@apollo/subgraph";
import cors from "cors";
import express, { json } from "express";
import typeDefs from "./graphql/schema";
import { connectDB } from "./models";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const server = new ApolloServer({
      schema: buildSubgraphSchema({ typeDefs }),
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
        ApolloServerPluginInlineTrace(),
      ],
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();
    await connectDB();
    app.use("/graphql", cors(), json(), expressMiddleware(server));
  } catch (error) {
    app.use("/", (req, res) => res.send(String(error)));
    console.log(error);
  }
})();

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
