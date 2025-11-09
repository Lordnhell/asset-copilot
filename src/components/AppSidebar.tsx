import { Home, TrendingUp, FileText, Settings, PieChart, Bell, Shield, BookOpen, Users, Key, MessageCircle, User } from "lucide-react";
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
  { title: "Analyses & Reports", url: "/analyses-reports", icon: FileText },
  { title: "Scenario Studio", url: "/scenario-studio", icon: Settings },
  { title: "Allocations & Trades", url: "/allocations-trades", icon: PieChart },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Compliance & Audit", url: "/compliance-audit", icon: Shield },
  { title: "Knowledge Hub", url: "/knowledge-hub", icon: BookOpen },
  { title: "Team & Permissions", url: "/team-permissions", icon: Users },
  { title: "Integrations & API Keys", url: "/integrations", icon: Key },
  { title: "Support", url: "/support", icon: MessageCircle },
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
            <p className="text-xs text-sidebar-foreground/70">admin@fund.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
