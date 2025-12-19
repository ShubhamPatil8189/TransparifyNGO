import { Link } from "react-router-dom";
import DonorNavbar from "@/components/layout/DonorNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ---------- MOCK DATA ---------- */
const user = {
  name: "Sakshi Nagare",
  totalDonated: 12500,
};

const donations = [
  {
    date: "2024-11-10",
    ngo: "Smile Foundation",
    project: "Education for All",
    amount: 2500,
    status: "Completed",
  },
  {
    date: "2024-10-05",
    ngo: "Akshaya Patra",
    project: "Mid-Day Meal Program",
    amount: 3000,
    status: "Completed",
  },
  {
    date: "2024-09-18",
    ngo: "Care India",
    project: "Healthcare Support",
    amount: 2000,
    status: "Pending",
  },
  {
    date: "2024-08-12",
    ngo: "Goonj",
    project: "Rural Development",
    amount: 1500,
    status: "Completed",
  },
  {
    date: "2024-07-01",
    ngo: "Save the Children",
    project: "Child Welfare",
    amount: 3500,
    status: "Completed",
  },
];

const DonorDonation = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <DonorNavbar userName={user.name} />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">All Donations</h1>
          <p className="text-muted-foreground">
            Complete details of all donations made by you
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-card border rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Donor Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <p className="font-semibold text-primary">₹{user.totalDonated}</p>
          </div>
        </div>

        {/* DONATIONS TABLE */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Donations
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-3 text-left">Date</th>
                  <th className="py-3 text-left">NGO</th>
                  <th className="py-3 text-left">Project</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-muted/40 transition"
                  >
                    <td className="py-3">{donation.date}</td>
                    <td>{donation.ngo}</td>
                    <td>{donation.project}</td>
                    <td className="font-medium">₹{donation.amount}</td>
                    <td>
                      <Badge
                        className={
                          donation.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {donation.status}
                      </Badge>
                    </td>
                    <td>
                      <Link to={`/donation/${index}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDonation;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DonorNavbar from "@/components/layout/DonorNavbar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// const DonorDonation = () => {
//   const [user, setUser] = useState(null);
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/user/me", {
//           credentials: "include",
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setUser(data);
//           setDonations(data.donations || []);
//         }
//       } catch (error) {
//         console.error("Failed to load donation data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading donation details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-muted/30">
//       <DonorNavbar userName={user?.name} />

//       <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
//         {/* HEADER */}
//         <div>
//           <h1 className="text-3xl font-bold">All Donations</h1>
//           <p className="text-muted-foreground">
//             Complete details of all donations made by you
//           </p>
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-card border rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground">Donor Name</p>
//             <p className="font-semibold">{user?.name || "User"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Total Donated</p>
//             <p className="font-semibold text-primary">
//               ₹{user?.totalDonated || 0}
//             </p>
//           </div>
//         </div>

//         {/* DONATIONS TABLE */}
//         <div className="bg-card border rounded-xl p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Recent Donations
//           </h2>

//           {donations.length === 0 ? (
//             <p className="text-muted-foreground text-sm">
//               No donation history available.
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b text-muted-foreground">
//                     <th className="py-3 text-left">Date</th>
//                     <th className="py-3 text-left">NGO</th>
//                     <th className="py-3 text-left">Project</th>
//                     <th className="py-3 text-left">Amount</th>
//                     <th className="py-3 text-left">Status</th>
//                     <th className="py-3 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {donations.map((donation, index) => (
//                     <tr
//                       key={index}
//                       className="border-b last:border-0 hover:bg-muted/40 transition"
//                     >
//                       <td className="py-3">{donation.date}</td>
//                       <td>{donation.ngo}</td>
//                       <td>{donation.project}</td>
//                       <td className="font-medium">₹{donation.amount}</td>
//                       <td>
//                         <Badge
//                           className={
//                             donation.status === "Completed"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }
//                         >
//                           {donation.status}
//                         </Badge>
//                       </td>
//                       <td>
//                         <Link to={`/donation/${index}`}>
//                           <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8">
//                             View
//                           </Button>
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DonorDonation;
