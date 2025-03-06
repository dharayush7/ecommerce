import { Home, Search, Users, LogOut, Boxes, LayoutGrid } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Boxes,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: LayoutGrid,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Maneger",
    url: "/maneger",
    icon: Users,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="bg-primary h-screen text-primary-foreground fixed z-20"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-secondary">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
