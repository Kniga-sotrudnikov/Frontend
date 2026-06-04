import { useMutation } from "@tanstack/react-query";
import {
  sendMagicLink,
  type SendLinkRequest,
  type SendLinkResponse,
} from "@/features/auth";
import type { HttpError } from "@/shared/api/client/types";

export const useSendMagicLink = () => {
  return useMutation<SendLinkResponse, HttpError, SendLinkRequest>({
    mutationFn: sendMagicLink,
  });
};
