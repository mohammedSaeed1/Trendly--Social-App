import { loginSchema } from "./login.schema";
import * as zod from "zod"

export type LoginSchemaType = zod.infer<typeof loginSchema>;
