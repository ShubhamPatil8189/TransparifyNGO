import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Donate = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }
    // TODO: Connect to backend payment API
    alert(`Thank you for donating ₹${amount}!`);
    navigate("/donor-dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <Button onClick={handleDonate} className="w-full bg-green-600 hover:bg-green-700 text-white">
        Donate
      </Button>
    </div>
  );
};

export default Donate;
