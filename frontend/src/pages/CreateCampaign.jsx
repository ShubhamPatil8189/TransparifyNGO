import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Link as LinkIcon, Redo, Undo, ImagePlus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/campaigns", active: true },
  { label: "Transactions", path: "/transactions" },
  { label: "Reports", path: "/reports" },
];

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="nav-header text-primary-foreground">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="font-semibold">TransparifyNGO</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary-foreground/20"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create / Edit Campaign</h1>
          <Link to="/campaigns" className="text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Details */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold mb-4">Campaign Details</h2>
            
            {/* Banner Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 mb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Campaign Banner Image</p>
              <Button variant="outline">Upload Banner</Button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Title</label>
                <Input
                  placeholder="Enter a compelling title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Goal Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      placeholder="0.00"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Deadline</label>
                  <Input
                    type="date"
                    placeholder="Select date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Quote className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Redo className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe the campaign's purpose, impact, and story..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-0 min-h-32 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Updates */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-semibold mb-4">Campaign Updates</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Add New Update</label>
                  <Input
                    placeholder="Title"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rich Text</label>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Underline className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Strikethrough className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-4 bg-border mx-1" />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <List className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-4 bg-border mx-1" />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Undo className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Redo className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      className="border-0 min-h-24 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Add Image/Video
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImagePlus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="w-4 h-4" />
                  </Button>
                  <div className="flex-1" />
                  <Button size="sm">Post Update</Button>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="mt-6">
                <h3 className="font-medium mb-4">Recent Updates</h3>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Kick-off!</p>
                    <p className="text-xs text-muted-foreground mb-2">Oct 25, 2023</p>
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-12 bg-muted rounded" />
                      <p className="text-sm text-muted-foreground">
                        Describe the campaign's purpose, impact, and story. Lanoroar and messagns tempor individual...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline">Save Draft</Button>
              <Button>Publish Campaign</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
