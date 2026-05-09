import { changePasswordSchema } from "./changePassword.schema";
import * as zod from "zod"

export type changePasswordSchemaType = zod.infer<typeof changePasswordSchema>;
