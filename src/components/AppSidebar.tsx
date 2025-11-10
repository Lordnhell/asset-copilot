import { Home, TrendingUp, Database, Settings, User, FileText, Users, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { AlertsCenter } from "@/components/AlertsCenter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Co-Pilot Dashboard", url: "/dashboard", icon: Home },
  { title: "Portfolio Health", url: "/portfolio-health", icon: TrendingUp },
  { title: "Analysis Reports", url: "/storage", icon: FileText },
  { title: "Usage & Billing", url: "/usage", icon: BarChart3 },
  { title: "Team Collaborators", url: "/collaborators", icon: Users },
  { title: "Data Sources", url: "/data-sources", icon: Database },
  { title: "Portfolio Settings", url: "/portfolio-settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-sidebar-foreground">QuantAI</h1>
          <AlertsCenter />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 text-sidebar-foreground">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium">Asset Manager</p>
            <p className="text-xs text-sidebar-foreground/70">admin@portfolio.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
