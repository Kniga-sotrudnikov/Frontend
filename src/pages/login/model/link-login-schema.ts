import { z } from "zod";
import { emailSchema } from "@/shared/lib";

export const linkLoginSchema = z.object({
  email: emailSchema,
});

export type TLinkLoginFormValues = z.infer<typeof linkLoginSchema>;
