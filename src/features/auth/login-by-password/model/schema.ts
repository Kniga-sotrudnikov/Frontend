import { z } from "zod";
import { emailSchema, passwordSchema } from "@/shared/lib";

export const passwordLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type TPasswordLoginFormValues = z.infer<typeof passwordLoginSchema>;
