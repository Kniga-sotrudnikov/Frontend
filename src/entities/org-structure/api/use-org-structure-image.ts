import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";

export interface OrgStructureImage {
    image_url: string;
    updated_at: string;
}

export const useOrgStructureImage = () => {
    return useQuery({
        queryKey: ["org-structure-image"],
        queryFn: async () => {
            const response = await apiClient.get<OrgStructureImage>("/org-structure/image/");
            return response.data;
        }
    })
}