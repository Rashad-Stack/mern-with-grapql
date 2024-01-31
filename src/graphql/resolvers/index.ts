import { dateScalar } from "../../lib/utils";
// import messageResolver from "./message";
import userResolver from "./user";

const customScalarResolver = {
  Date: dateScalar,
};

export default {
  // ...messageResolver,
  ...userResolver,
  ...customScalarResolver,
};
