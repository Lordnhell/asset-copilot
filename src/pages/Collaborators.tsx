import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, TrendingUp, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  reportsGenerated: number;
  lastActive: string;
  status: "active" | "invited" | "inactive";
}

const Collaborators = () => {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("analyst");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "Asset Manager",
      email: "admin@fund.com",
      role: "admin",
      reportsGenerated: 15,
      lastActive: "2025-11-09",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.chen@fund.com",
      role: "analyst",
      reportsGenerated: 12,
      lastActive: "2025-11-08",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      email: "michael.r@fund.com",
      role: "analyst",
      reportsGenerated: 8,
      lastActive: "2025-11-07",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Johnson",
      email: "emily.j@fund.com",
      role: "viewer",
      reportsGenerated: 0,
      lastActive: "2025-11-06",
      status: "active",
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.kim@fund.com",
      role: "analyst",
      reportsGenerated: 0,
      lastActive: "Never",
      status: "invited",
    },
  ];

  const handleInvite = () => {
    if (!inviteEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail}`,
    });
    setInviteEmail("");
    setIsDialogOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      case "analyst":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "viewer":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "invited":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "inactive":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const totalReports = collaborators.reduce((sum, c) => sum + c.reportsGenerated, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">Team & Collaborators</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to collaborate on analyses and reports
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@fund.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin - Full access</SelectItem>
                        <SelectItem value="analyst">Analyst - Create & view reports</SelectItem>
                        <SelectItem value="viewer">Viewer - View only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Team Members</CardDescription>
                    <CardTitle className="text-3xl">{collaborators.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {collaborators.filter((c) => c.status === "active").length} active
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Reports Generated
                    </CardDescription>
                    <CardTitle className="text-3xl">{totalReports}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">By all team members</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Avg per Member
                    </CardDescription>
                    <CardTitle className="text-3xl">
                      {Math.round(totalReports / collaborators.length)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Reports this month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Collaborators List */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage access and track activity for your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborators.map((collaborator) => (
                      <div
                        key={collaborator.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getInitials(collaborator.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{collaborator.name}</h3>
                              <Badge className={getStatusColor(collaborator.status)}>
                                {collaborator.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {collaborator.email}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                              <span>
                                <Badge variant="outline" className={getRoleColor(collaborator.role)}>
                                  {collaborator.role}
                                </Badge>
                              </span>
                              <span>
                                Reports: <strong>{collaborator.reportsGenerated}</strong>
                              </span>
                              <span>
                                Last active:{" "}
                                <strong>
                                  {collaborator.lastActive === "Never"
                                    ? "Never"
                                    : new Date(collaborator.lastActive).toLocaleDateString()}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            Edit Role
                          </Button>
                          {collaborator.role !== "admin" && (
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Collaborators;
