import { Home, TrendingUp, FileText, Sliders, BarChart3, Bell, Shield, BookOpen, Users, Key, HelpCircle } from "lucide-react";
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
  { title: "Analyses & Reports", url: "/comparative-analysis", icon: FileText },
  { title: "Scenario Studio", url: "/manual-input", icon: Sliders },
  { title: "Allocations & Trades", url: "/storage", icon: BarChart3 },
  { title: "Notifications", url: "/dashboard", icon: Bell },
  { title: "Compliance & Audit", url: "/dashboard", icon: Shield },
  { title: "Knowledge Hub", url: "/dashboard", icon: BookOpen },
  { title: "Team & Permissions", url: "/collaborators", icon: Users },
  { title: "Integrations & API Keys", url: "/data-sources", icon: Key },
  { title: "Support", url: "/usage", icon: HelpCircle },
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
        <NavLink to="/usage" className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent p-3 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium">Asset Manager</p>
            <p className="text-xs text-sidebar-foreground/70">32/50 reports used</p>
          </div>
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}
