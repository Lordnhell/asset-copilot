import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Mail, FileText, Clock } from "lucide-react";
import { toast } from "sonner";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  reportsGenerated: number;
  lastActive: string;
  status: "active" | "pending";
}

const Collaborators = () => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"analyst" | "viewer">("analyst");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@fund.com",
      role: "admin",
      reportsGenerated: 15,
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@fund.com",
      role: "analyst",
      reportsGenerated: 8,
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@fund.com",
      role: "analyst",
      reportsGenerated: 12,
      lastActive: "3 hours ago",
      status: "active"
    },
    {
      id: "4",
      name: "David Park",
      email: "d.park@fund.com",
      role: "viewer",
      reportsGenerated: 0,
      lastActive: "1 week ago",
      status: "active"
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.a@fund.com",
      role: "analyst",
      reportsGenerated: 5,
      lastActive: "Never",
      status: "pending"
    }
  ];

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setIsDialogOpen(false);
  };

  const getRoleBadgeColor = (role: Collaborator["role"]) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground";
      case "analyst":
        return "bg-accent text-accent-foreground";
      case "viewer":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalReports = collaborators.reduce((sum, c) => sum + c.reportsGenerated, 0);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Team & Collaborators</h1>
            <p className="text-muted-foreground">
              Manage team members and track their report usage
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to collaborate on portfolio analysis reports
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="colleague@fund.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Select value={inviteRole} onValueChange={(value: "analyst" | "viewer") => setInviteRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst">Analyst - Can generate reports</SelectItem>
                      <SelectItem value="viewer">Viewer - Can only view reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleInvite} className="w-full">
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-foreground">{collaborators.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-foreground">{totalReports}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-foreground">
                  {collaborators.filter(c => c.status === "active").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Collaborators List */}
        <div className="space-y-4">
          {collaborators.map((collaborator) => (
            <Card key={collaborator.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {collaborator.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {collaborator.name}
                      </h3>
                      <Badge className={getRoleBadgeColor(collaborator.role)}>
                        {collaborator.role}
                      </Badge>
                      {collaborator.status === "pending" && (
                        <Badge variant="outline" className="text-warning border-warning">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {collaborator.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last active: {collaborator.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-2xl font-bold text-foreground">
                      {collaborator.reportsGenerated}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">reports generated</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
