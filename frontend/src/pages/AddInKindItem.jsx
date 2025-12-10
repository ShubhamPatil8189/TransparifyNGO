import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import  DashboardHeader  from "@/components/layout/DashboardHeader";

const AddInKindItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    donorName: "",
    estimatedValue: "",
    donorType: "",
    dateReceived: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/inventory");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" > "}
          <Link to="/inventory" className="hover:text-foreground">Inventory</Link>
          {" > "}
          <span className="text-foreground font-medium">Add In-Kind Item</span>
        </nav>

        <h1 className="text-2xl font-bold text-primary mb-8">Add In-Kind Item</h1>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Item Details</h2>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">Description</label>
                <input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-input text-foreground px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="estimatedValue" className="block text-sm font-medium text-muted-foreground">Estimated Value (USD)</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    id="estimatedValue"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                    className="pl-7 w-full rounded-md border border-border bg-input text-foreground px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dateReceived" className="block text-sm font-medium text-muted-foreground">Date Received</label>
                <input
                  id="dateReceived"
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-input text-foreground px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground">Upload Item Images (Max 3, JPG/PNG)</label>
                <div
                  role="button"
                  tabIndex={0}
                  className="mt-1 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  onKeyDown={() => {}}
                >
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload Item Images (Max 3, JPG/PNG)</p>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Donor Information</h2>

              <div>
                <label htmlFor="donorName" className="block text-sm font-medium text-muted-foreground">Donor Name</label>
                <input
                  id="donorName"
                  value={formData.donorName}
                  onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-input text-foreground px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="donorType" className="block text-sm font-medium text-muted-foreground">Donor Type</label>
                <select
                  id="donorType"
                  value={formData.donorType}
                  onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-input text-foreground px-3 py-2"
                >
                  <option value="">(e.g., Individual, Corporate, Foundation)</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                  <option value="foundation">Foundation</option>
                  <option value="government">Government</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground">Notes/Comments</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-input text-foreground px-3 py-2 min-h-[120px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button type="submit" className="w-full bg-primary h-12 rounded-md text-primary-foreground">
              Save Item
            </button>
            <button
              type="button"
              className="w-full h-12 rounded-md border border-border bg-card"
              onClick={() => navigate("/inventory")}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddInKindItem;
