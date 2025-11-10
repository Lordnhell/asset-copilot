import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, MoreVertical, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Collaborators = () => {
  const [collaborators] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@portfolio.com",
      role: "Admin",
      reportsGenerated: 12,
      lastActive: "Today",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@portfolio.com",
      role: "Analyst",
      reportsGenerated: 8,
      lastActive: "2 hours ago",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@portfolio.com",
      role: "Analyst",
      reportsGenerated: 7,
      lastActive: "Yesterday",
      avatar: "ER",
    },
    {
      id: 4,
      name: "David Park",
      email: "david.p@portfolio.com",
      role: "Viewer",
      reportsGenerated: 3,
      lastActive: "3 days ago",
      avatar: "DP",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@portfolio.com",
      role: "Analyst",
      reportsGenerated: 2,
      lastActive: "1 week ago",
      avatar: "LT",
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-primary/10 text-primary border-primary/20";
      case "analyst":
        return "bg-accent/10 text-accent border-accent/20";
      case "viewer":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const totalReports = collaborators.reduce(
    (sum, collab) => sum + collab.reportsGenerated,
    0
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Team Collaborators</h1>
                <p className="text-muted-foreground mt-1">
                  Manage team members and track their contributions
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary-hover">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            {/* Summary Card */}
            <Card className="mb-6 border-primary/20">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Team Members
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {collaborators.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Reports Generated
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {totalReports}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Active This Week
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {collaborators.filter((c) =>
                        ["Today", "Yesterday"].some((t) => c.lastActive.includes(t))
                      ).length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaborators List */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {collaborator.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground">
                            {collaborator.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {collaborator.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <Badge
                          variant="outline"
                          className={getRoleColor(collaborator.role)}
                        >
                          {collaborator.role}
                        </Badge>

                        <div className="text-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <FileText className="w-3 h-3" />
                            <span>Reports</span>
                          </div>
                          <div className="text-lg font-semibold text-foreground">
                            {collaborator.reportsGenerated}
                          </div>
                        </div>

                        <div className="text-right min-w-[100px]">
                          <div className="text-xs text-muted-foreground mb-1">
                            Last Active
                          </div>
                          <div className="text-sm text-foreground">
                            {collaborator.lastActive}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Reports</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove Access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Collaborators;
