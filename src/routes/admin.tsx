import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Cineshotss" },
      { name: "description", content: "Manage the Cineshotss photography gallery." },
      { property: "og:title", content: "Admin | Cineshotss" },
      { property: "og:description", content: "Manage the Cineshotss photography gallery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <Outlet />,
});