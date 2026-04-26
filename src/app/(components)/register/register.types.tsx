import { registerSchema } from "./register.schema";
import * as zod from "zod"

export type RegisterSchemaType = zod.infer<typeof registerSchema>;
