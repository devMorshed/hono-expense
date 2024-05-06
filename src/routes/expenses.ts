import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Expenses = {
  id: number;
  title: string;
  balance: number;
};

const fakeExpensesDB: Expenses[] = [
  { id: 1, balance: 0, title: "Mr Gorib" },
  { id: 2, balance: 20, title: "Mr Gorib2" },
  { id: 3, balance: 30, title: "Mr Gorib3" },
  { id: 4, balance: 40, title: "Mr Gorib4" },
];

const postExpenseSchema = z.object({
  title: z.string(),
  balance: z.number(),
});

export const expensesRoute = new Hono()

  .get("/", async (c) => {
    return c.json({
      message: "Expenses",
      expenses: fakeExpensesDB,
    });
  })

  .post("/", zValidator("json", postExpenseSchema), async (c) => {
    const expenses = await c.req.valid("json");
    fakeExpensesDB.push({ id: fakeExpensesDB.length + 1, ...expenses });
    return c.json(fakeExpensesDB);
  })

  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpensesDB.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const indexToDelete = fakeExpensesDB.findIndex(
      (expense) => expense.id === id
    );
    if (indexToDelete == -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpensesDB.splice(indexToDelete, 1)[0];
    console.log(deletedExpense);
    return c.json(fakeExpensesDB);
  })
  .delete("/all", (c) => {
    fakeExpensesDB.splice(0, fakeExpensesDB.length);
    return c.json(fakeExpensesDB);
  });
