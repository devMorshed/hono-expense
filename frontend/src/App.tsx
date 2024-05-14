import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { api } from "./lib/api";

const App = () => {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    async function getTotal() {
      const res = await api.expenses["total"].$get();
      const data = await res.json();
      setTotalExpense(data.total);
    }
    getTotal();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Total Spent: {totalExpense}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
