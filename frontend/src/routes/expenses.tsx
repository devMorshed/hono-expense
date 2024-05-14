import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

async function getExpenses() {
  const res = await api.expenses.$get();
  const data = res.json();
  return data;
}

function Expenses() {
  const { data, isPending } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  console.log(data);

  return (
    <div className="flex-col gap-10  space-y-3">
      {data?.expenses.map((expense) => (
        <Card
          className="cursor-pointer"
          key={expense.id}
          onClick={() => console.log(expense.title)}
        >
          <CardHeader>
            <CardTitle>{expense.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? "Loading..." : expense.balance} TAKA
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
