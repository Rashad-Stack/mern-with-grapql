import { dateScalar } from "../../lib/utils";
// import messageResolver from "./message";
import userResolver from "./user";

const customScalarResolver = {
  Date: dateScalar,
};

console.log("userResolver", userResolver);

export default { userResolver, customScalarResolver };
