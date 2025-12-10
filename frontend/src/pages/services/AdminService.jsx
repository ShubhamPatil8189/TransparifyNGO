import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/layout/DashboardHeader";

/**
 * AdminServices.jsx
 * - Admin UI to list/add/update/delete services for an NGO project
 * - Uses local state + localStorage for demo persistence
 * - Tailwind UI classes follow project's theme/gradients
 */

/* ---------- starter demo data ---------- */
const demoServices = [
  {
    id: "svc-001",
    title: "Clean Water Wells",
    shortDesc: "Drill and maintain community wells in rural areas.",
    fullDesc:
      "We plan, fund and maintain hand-pump wells. Includes training local technicians and testing water quality quarterly.",
    category: "Water",
    price: "Grant-based",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&q=60",
    active: true,
  },
  {
    id: "svc-002",
    title: "Education Kits",
    shortDesc: "School supplies & teacher training programs.",
    fullDesc:
      "Provide kits (books, stationery) plus teacher workshops to improve learning outcomes in underserved schools.",
    category: "Education",
    price: "$500 per kit",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=60",
    active: true,
  },
  {
    id: "svc-003",
    title: "Disaster Relief",
    shortDesc: "Rapid response packs & community rebuilding.",
    fullDesc:
      "Deploy emergency kits, temporary shelter, and coordinate local rebuilding efforts after disasters.",
    category: "Relief",
    price: "Campaign-based",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=60",
    active: false,
  },
];

/* ---------- helper utilities ---------- */
const uid = (prefix = "svc") => `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random()*900).toString(36)}`;

/* ---------- component ---------- */
export default function AdminServices() {
  const [services, setServices] = useState(() => {
    const stored = localStorage.getItem("admin_services_v1");
    return stored ? JSON.parse(stored) : demoServices;
  });

  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // service object when editing
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "cards" or "table"

  useEffect(() => {
    localStorage.setItem("admin_services_v1", JSON.stringify(services));
  }, [services]);

  /* ---------- form state ---------- */
  const initialForm = {
    title: "",
    shortDesc: "",
    fullDesc: "",
    category: "",
    price: "",
    image: "",
    active: true,
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        shortDesc: editing.shortDesc || "",
        fullDesc: editing.fullDesc || "",
        category: editing.category || "",
        price: editing.price || "",
        image: editing.image || "",
        active: typeof editing.active === "boolean" ? editing.active : true,
      });
      setShowForm(true);
    } else {
      setForm(initialForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  /* ---------- CRUD handlers ---------- */
  const openAdd = () => {
    setEditing(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title.trim()) {
      alert("Please enter a service title.");
      return;
    }

    if (editing) {
      // update
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s))
      );
      setEditing(null);
      setShowForm(false);
    } else {
      // add new
      const newService = {
        id: uid("svc"),
        ...form,
      };
      setServices((prev) => [newService, ...prev]);
      setShowForm(false);
    }
    setForm(initialForm);
  };

  const confirmDelete = (service) => {
    setToDelete(service);
    setShowConfirm(true);
  };

  const doDelete = () => {
    if (!toDelete) return;
    setServices((prev) => prev.filter((s) => s.id !== toDelete.id));
    setToDelete(null);
    setShowConfirm(false);
  };

  const startEdit = (service) => {
    setEditing(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = (id) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  /* ---------- filters ---------- */
  const categories = Array.from(new Set(services.map((s) => s.category).filter(Boolean)));
  const filtered = services.filter((s) => {
    if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
    if (!q) return true;
    const text = `${s.title} ${s.shortDesc} ${s.fullDesc} ${s.category}`.toLowerCase();
    return text.includes(q.toLowerCase());
  });

  /* ---------- small UI pieces ---------- */
  function ServiceCard({ s }) {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="h-40 bg-gray-100 overflow-hidden">
          {s.image ? (
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <div className="text-sm text-muted-foreground">{s.shortDesc}</div>
            </div>
            <div className="text-right space-y-1">
              <Badge className={s.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}>
                {s.active ? "Active" : "Paused"}
              </Badge>
              <div className="text-xs text-muted-foreground">{s.category}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="text-sm font-medium">{s.price}</div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="px-2" onClick={() => startEdit(s)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600" onClick={() => confirmDelete(s)}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- markup ---------- */
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard header added here */}
      <DashboardHeader />

      {/* Main wrapper: no outer page padding, container has no horizontal px and has top padding to avoid header overlap */}
      <div className="max-w-7xl mx-auto px-0 pt-14">
        {/* header toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Services Management</h1>
            <p className="text-sm text-muted-foreground">Create, update or remove services offered by your NGO.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-card border border-border rounded-md px-2 py-1 gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-8 w-64 bg-transparent border-0 p-0"
              />
              <select
                className="bg-transparent outline-none text-sm text-muted-foreground"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" className="h-9 px-3" onClick={() => setViewMode("cards")}>Cards</Button>
              <Button size="sm" className="h-9 px-3" onClick={() => setViewMode("table")}>Table</Button>

              <Button className="bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2" onClick={openAdd}>
                <Plus className="h-4 w-4" /> Add Service
              </Button>
            </div>
          </div>
        </div>

        {/* optional form modal (simple implementation) */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => { setShowForm(false); setEditing(null); }}
            />
            <form
              onSubmit={handleSave}
              className="relative z-50 w-full max-w-2xl bg-card rounded-lg shadow-lg border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold">{editing ? "Edit Service" : "Add Service"}</h2>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="p-2 rounded-md hover:bg-muted/20">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Water, Education" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Short description</label>
                  <Input value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Full description</label>
                  <textarea rows="4" className="w-full rounded-md border border-border p-2 bg-card text-foreground" value={form.fullDesc} onChange={(e) => setForm({ ...form, fullDesc: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price / Funding</label>
                  <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. $500 / grant" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>

                <div className="flex items-center gap-2">
                  <input id="active" type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4" />
                  <label htmlFor="active" className="text-sm">Active</label>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                {editing && (
                  <Button variant="outline" size="sm" onClick={() => { setEditing(null); setForm(initialForm); }}>
                    Cancel Edit
                  </Button>
                )}
                <Button type="submit" className="bg-primary text-white">
                  Save Service
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* confirm delete modal */}
        {showConfirm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
            <div className="relative z-50 bg-card rounded-lg p-6 max-w-md w-full border border-border">
              <h3 className="text-lg font-semibold mb-3">Delete service?</h3>
              <p className="text-sm text-muted-foreground mb-4">Are you sure you want to permanently remove <strong>{toDelete?.title}</strong>?</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>Cancel</Button>
                <Button size="sm" className="bg-red-600 text-white" onClick={doDelete}>Delete</Button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- main list ---------- */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-card rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {s.image ? <img src={s.image} alt={s.title} className="w-full h-full object-cover" /> : <div className="text-muted-foreground">No image</div>}
                        </div>
                        <div>
                          <div className="font-medium">{s.title}</div>
                          <div className="text-sm text-muted-foreground">{s.shortDesc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{s.category}</td>
                    <td className="px-4 py-3 text-sm font-medium">{s.price}</td>
                    <td className="px-4 py-3">
                      <Badge className={s.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}>
                        {s.active ? "Active" : "Paused"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="px-2" onClick={() => startEdit(s)}>
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 px-2" onClick={() => confirmDelete(s)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                        <Button variant="outline" size="sm" className="px-2" onClick={() => toggleActive(s.id)}>
                          {s.active ? "Pause" : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
