import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook = new Map<string, recipe | ingredient>();

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  recipeName = recipeName.replace(/[-_]/g, ' ');
  recipeName = recipeName.replace(/[^a-zA-Z\s]/g, '');
  recipeName = recipeName.replace(/\s+/g, ' ').trim();
  recipeName = recipeName.toLowerCase();
  recipeName = recipeName.replace(/\b\w/g, char => char.toUpperCase());
  return recipeName.length > 0 ? recipeName : null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const entry = req.body;

  if (entry.type != "recipe" && entry.type != "ingredient") {
    res.status(400).send("invalid type");
    return;
  }

  if (entry.type == "ingredient" && entry.cookTime < 0) {
    res.status(400).send("invalid cooktime for ingredient");
    return;
  }

  if (cookbook.has(entry.name)) {
    res.status(400).send("non unique entry name");
    return;
  }

  if (entry.type == "recipe") {
    const t = new Map<string, number>();
    for (const item of entry.requiredItems) {
      if (t.has(item)) {
        res.status(400).send("non unique required item");
        return;
      }
      t.set(item, 1);
    }
  }

  cookbook.set(entry.name, entry.type == "recipe" ? {
    name: entry.name,
    type: entry.type,
    requiredItems: entry.requiredItems.map((item: any) => ({
      name: item.name,
      quantiy: item.quantity
    }))} :
    {
      name: entry.name,
      type: entry.type,
      cookTime: entry.cookTime,
    }
  );

  res.status(200).send()
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Response) => {
  const input = req.query.name as string;
  console.log(input);
  const entry = cookbook.get(input);
  if (!entry) {
    res.status(400).send("doesnt exist");
    return;
  }

  console.log(cookbook);

  if (entry.type == "ingredient") {
    res.status(400).send("can't be requesting a ingredient");
    return;
  }

  const summary = processSummary(entry);
  if (summary == null) {
    res.status(400).send("an ingredient doesnt exist");
    return;
  }
  res.status(200).send(summary)
});

function processSummary(entry: recipe | ingredient) {
  let cooktime = 0;
  const map = new Map<string, number>();

  function recursion(items: requiredItem[], multiplier = 1) {
    for (const item of items) {
      const entry = cookbook.get(item.name);
      if (!entry) { 
        throw new Error('Required item doesnt exist');
      }
      if (entry.type === "ingredient") {
        const ingredient = entry as ingredient;
        cooktime += ingredient.cookTime;
        map.set(ingredient.name, map.has(ingredient.name) ? map.get(ingredient.name) : item.quantity * multiplier);
      } else {
        recursion((entry as recipe).requiredItems, item.quantity * multiplier);
      }
    }
  }

  try {
    recursion((entry as recipe).requiredItems);
  } catch (error) {
    return null;
  }

  return { name: entry.name, cookTime: cooktime, ingredients: Array.from(map.entries()).map(([name, quantity]) => ({ name, quantity })) }
}

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
