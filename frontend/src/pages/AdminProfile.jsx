import { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
const AdminProfile = () => {
  const { user: authUser, setUser: setAuthUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/me", {
          withCredentials: true,
        });
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="p-10">Loading...</div>;

  const handleUpdateProfile = async () => {
  if (currentPassword && !newPassword) {
    toast.error("Please enter new password.");
    return;
  }
  if (!currentPassword && newPassword) {
    toast.error("Please enter current password.");
    return;
  }
  if (newPassword && newPassword.length < 6) {
    toast.error("New password must be at least 6 characters.");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.put(
      "http://localhost:4000/api/user/me",
      { name, currentPassword, newPassword },
      { withCredentials: true }
    );

    // Clear AuthContext
    setAuthUser(null);

    // Logout via backend
    await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });

    toast.success("Profile updated. Please log in again.");
    navigate("/login", { replace: true });

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to update profile.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="max-w-xl mx-auto py-10 px-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">My Profile</h2>

            {/* Name */}
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input value={user.email} disabled />
            </div>

            {/* Member Since */}
            <div>
              <label className="text-sm text-muted-foreground">
                Member Since
              </label>
              <Input
                value={new Date(user.createdAt).toDateString()}
                disabled
              />
            </div>

            <hr className="my-4" />

            {/* Password */}
            <div>
              <label className="text-sm text-muted-foreground">
                Current Password
              </label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Leave blank if not changing"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank if not changing"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
