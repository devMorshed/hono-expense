import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

const App = () => {
  const [expenses, setExpenses] = useState();

  useEffect(() => {
    async function getTotal() {
      const res = await fetch("/api/v1/expenses/total");
      const data = await res.json();
      setExpenses(data);
    }

    console.log(expenses);
    getTotal();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Total Spent: {expenses?.total}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
