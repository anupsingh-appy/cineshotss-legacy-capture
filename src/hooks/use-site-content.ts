import { useQuery } from "@tanstack/react-query";
import {
  DEFAULT_SITE_CONTENT,
  fetchPublishedSiteContent,
  type SiteContentResult,
} from "@/lib/content";

export const siteContentQueryKey = ["site-content", "published"] as const;

export function useSiteContent(): SiteContentResult {
  const { data } = useQuery({
    queryKey: siteContentQueryKey,
    queryFn: fetchPublishedSiteContent,
    initialData: { content: DEFAULT_SITE_CONTENT, media: {} },
    staleTime: 0,
  });

  return data ?? { content: DEFAULT_SITE_CONTENT, media: {} };
}