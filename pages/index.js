import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (title && amount) {
      setExpenses([...expenses, { title, amount: parseFloat(amount) }]);
      setTitle("");
      setAmount("");
    }
  };

  const exportToGoogleSheet = async () => {
    const response = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenses }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="max-w-md mx-auto">
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Groceries" />
          </div>
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 20.00"
            />
          </div>
          <Button onClick={addExpense} className="w-full">Add Expense</Button>
          <Button onClick={exportToGoogleSheet} className="w-full" variant="secondary">
            Export to Google Sheet
          </Button>
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto">
        {expenses.map((e, i) => (
          <div key={i} className="flex justify-between py-2 border-b">
            <span>{e.title}</span>
            <span>${e.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
