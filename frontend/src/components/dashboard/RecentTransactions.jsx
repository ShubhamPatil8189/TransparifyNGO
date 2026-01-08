import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
  {
    date: "Oct 28, 2023",
    donor: "John Smith",
    type: "Online Donation",
    campaign: "Clean Water Project",
    amount: "$500.00",
    status: "Cleared",
  },
  {
    date: "Oct 25, 2023",
    donor: "Corporate Grant",
    type: "Wire Transfer",
    campaign: "Education Fund",
    amount: "$10,000.00",
    status: "Pending",
  },
  {
    date: "Oct 24, 2023",
    donor: "Sarah Lee",
    type: "Recurring",
    campaign: "General",
    amount: "$100.00",
    status: "Cleared",
  },
  {
    date: "Oct 23, 2023",
    donor: "Local Business",
    type: "In-Kind Goods",
    campaign: "Medical Relief",
    amount: "$2,500.00 (Value)",
    status: "Verified",
  },
];

export function RecentTransactions({ transactions = [] }) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "cleared":
      case "success":
        return "status-cleared";
      case "pending":
        return "status-pending";
      case "verified":
        return "status-verified";
      default:
        return "status-ended";
    }
  };

  return (
    <div className="dashboard-card">
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold">Recent Transactions</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Donor/Source</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm">
                  {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-sm">{tx.donor?.name || "Unknown"}</TableCell>
                <TableCell className="text-sm">{tx.type}</TableCell>
                <TableCell className="text-sm font-medium">
                  {tx.type === "in-kind"
                    ? `₹${(tx.items?.reduce((acc, item) => acc + (item.estimatedValue || 0), 0) || 0).toLocaleString()} (Est.)`
                    : `₹${(tx.amount || 0).toLocaleString()}`}
                </TableCell>
                <TableCell>
                  <span className={`status-badge ${getStatusClass(tx.status || "cleared")}`}>
                    {tx.status || "Cleared"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No recent transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
