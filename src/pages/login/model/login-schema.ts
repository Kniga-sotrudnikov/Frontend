import { z } from "zod";
import { emailSchema, passwordSchema } from "@/shared/lib";

export const loginSchema = z
  .object({
    authType: z.enum(["link", "password"]),
    email: emailSchema,
    password: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.authType !== "password") {
      return;
    }

    const result = passwordSchema.safeParse(values.password);

    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: issue.message,
        });
      }
    }
  });

export type TLoginFormValues = z.infer<typeof loginSchema>;
