export {
  sendMagicLink,
  type SendLinkRequest,
} from "./login-by-link/api/send-link";
export {
  verifyMagicLink,
  type VerifyMagicLinkRequest,
  type VerifyMagicLinkResponse,
} from "./login-by-link/api/verify-link";
export type {
  TLinkCooldown,
  SendLinkResponse,
} from "./login-by-link/model/types";
export { LinkSentNotice } from "./login-by-link/ui/link-sent-notice";
export {
  linkLoginSchema,
  type TLinkLoginFormValues,
} from "./login-by-link/model/schema";
export { useSendMagicLink } from "./login-by-link/model/use-send-link";

export {
  loginByPassword,
  type LoginRequest,
  type LoginResponse,
} from "./login-by-password/api/login";
export {
  passwordLoginSchema,
  type TPasswordLoginFormValues,
} from "./login-by-password/model/schema";
export { useLoginByPassword } from "./login-by-password/model/use-login-by-password";
export { LinkLoginForm } from "./login-by-link/ui/form";
export { PasswordLoginForm } from "./login-by-password/ui/form";
export { useVerifyMagicLink } from "./login-by-link/model/use-verify-link";
