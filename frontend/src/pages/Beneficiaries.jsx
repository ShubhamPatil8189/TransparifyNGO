import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Copy,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/layout/DashboardHeader";

/* ------------------ Dummy Data ------------------ */
const beneficiaries = [
  {
    id: "#BN-00754",
    name: "Jane Doe",
    program: "Food Security",
    status: "Active",
    dateAdded: "2023-03-15",
  },
  {
    id: "#BN-00753",
    name: "John Smith",
    program: "Education Support",
    status: "Active",
    dateAdded: "2023-03-12",
  },
  {
    id: "#BN-00752",
    name: "Maria Garcia",
    program: "Healthcare Access",
    status: "Inactive",
    dateAdded: "2023-02-28",
  },
];

export default function Beneficiaries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    program: "",
    status: "Active",
    dateAdded: "",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        {/* <div className="text-sm text-muted-foreground mb-4">
          Home / <span className="text-foreground">Beneficiaries</span>
        </div> */}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Beneficiary Management</h1>
            <p className="text-muted-foreground">
              Track, manage, and view distribution history.
            </p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Beneficiary
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search by name, ID, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>BENEFICIARY ID</TableHead>
                <TableHead>FULL NAME</TableHead>
                <TableHead>PROGRAM</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>DATE ADDED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {beneficiaries.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {b.id}
                  </TableCell>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.program}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        b.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </TableCell>
                  <TableCell>{b.dateAdded}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-sm text-muted-foreground">
              Page 1 of 1
            </span>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" disabled>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- ADD BENEFICIARY MODAL ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg w-full max-w-md p-6 overflow-visible">
            <h2 className="text-lg font-semibold mb-4">
              Add New Beneficiary
            </h2>

            <div className="space-y-4">
              <Input
                placeholder="Beneficiary ID"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
              />

              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Select
                value={formData.program}
                onValueChange={(value) =>
                  setFormData({ ...formData, program: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="Food Security">
                    Food Security
                  </SelectItem>
                  <SelectItem value="Education Support">
                    Education Support
                  </SelectItem>
                  <SelectItem value="Healthcare Access">
                    Healthcare Access
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={formData.dateAdded}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dateAdded: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("New Beneficiary:", formData);
                  setIsModalOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// import { useState } from "react";
// import { Search, Eye, Pencil, Copy, Plus, ChevronLeft, ChevronRight } from "lucide-react";
// import Navbar from "@/components/layout/BeneficiariesHeader";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Sidebar } from "@/components/layout/Sidebar";
// import DashboardHeader from "@/components/layout/DashboardHeader";

// const beneficiaries = [
//   {
//     id: "#BN - 00754",
//     name: "Jane Doe",
//     program: "Food Security",
//     status: "Active",
//     dateAdded: "2023-03-15",
//   },
//   {
//     id: "#BN - 00753",
//     name: "John Smith",
//     program: "Education Support",
//     status: "Active",
//     dateAdded: "2023-03-12",
//   },
//   {
//     id: "#BN - 00752",
//     name: "Maria Garcia",
//     program: "Healthcare Access",
//     status: "Inactive",
//     dateAdded: "2023-02-28",
//   },
// ];

// export default function Beneficiaries() {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* Top navbar (gradient) */}
//       {/* <Sidebar/> */}
//       <DashboardHeader />

//       {/* Page content */}
//       <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
//         {/* Breadcrumb */}
//         <div className="text-sm text-muted-foreground mb-4">
//           Home / <span className="text-foreground">Beneficiaries</span>
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">Beneficiary Management</h1>
//             <p className="text-muted-foreground">
//               Track, manage, and view distribution history for all beneficiaries.
//             </p>
//           </div>
//           <Button className="bg-primary">
//             <Plus className="w-4 h-4 mr-2" />
//             Add New Beneficiary
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap items-center gap-4 mb-6">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by name, ID, etc."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <Select defaultValue="all">
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Status: All</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all">
//             <SelectTrigger className="w-36">
//               <SelectValue placeholder="Program" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Program: All</SelectItem>
//               <SelectItem value="food">Food Security</SelectItem>
//               <SelectItem value="education">Education Support</SelectItem>
//               <SelectItem value="healthcare">Healthcare Access</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all">
//             <SelectTrigger className="w-36">
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Location: All</SelectItem>
//               <SelectItem value="urban">Urban</SelectItem>
//               <SelectItem value="rural">Rural</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Table */}
//         <div className="bg-card rounded-lg border border-border overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12">
//                   <Checkbox />
//                 </TableHead>
//                 <TableHead>BENEFICIARY ID</TableHead>
//                 <TableHead>FULL NAME</TableHead>
//                 <TableHead>PROGRAM</TableHead>
//                 <TableHead>STATUS</TableHead>
//                 <TableHead>DATE ADDED</TableHead>
//                 <TableHead>ACTIONS</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {beneficiaries.map((beneficiary) => (
//                 <TableRow key={beneficiary.id}>
//                   <TableCell>
//                     <Checkbox />
//                   </TableCell>
//                   <TableCell className="text-sm text-muted-foreground">{beneficiary.id}</TableCell>
//                   <TableCell className="font-medium">{beneficiary.name}</TableCell>
//                   <TableCell className="text-sm">{beneficiary.program}</TableCell>
//                   <TableCell>
//                     <span className={`status-badge ${beneficiary.status === "Active" ? "status-active" : "status-inactive"}`}>
//                       {beneficiary.status}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-sm">{beneficiary.dateAdded}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <Pencil className="w-4 h-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <Eye className="w-4 h-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <Copy className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Table Footer */}
//           <div className="flex items-center justify-between px-4 py-3 border-t border-border">
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm">Bulk Actions</Button>
//               <Button variant="outline" size="sm">Export CSV</Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="icon" disabled>
//                 <ChevronLeft className="w-4 h-4" />
//               </Button>
//               <span className="text-sm text-muted-foreground">Page 1 of 10</span>
//               <Button variant="ghost" size="icon">
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
