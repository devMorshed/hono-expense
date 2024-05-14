import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
});

async function getSpent() {
  const res = await api.expenses["total"].$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
}

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getSpent,
  });

  if (error) return "Err0r Occured";

  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Total Spent: {isPending ? "Loading" : data.total}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
