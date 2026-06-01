import { useMutation } from "@tanstack/react-query";
import { sendMagicLink, type SendLinkRequest } from "../api/send-link";
import type { ApiError } from "@/shared/api/client/types";
import type { SendLinkResponse } from "./types";

export const useSendMagicLink = () => {
  return useMutation<SendLinkResponse, ApiError, SendLinkRequest>({
    mutationFn: sendMagicLink,
  });
};
