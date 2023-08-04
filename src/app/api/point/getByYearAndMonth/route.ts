import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { timeToMinutes } from "@/lib/hoursInMinutes";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const points = await db.point.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });

    console.log("points", points);

    return new Response("", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not add point, please try again later", {
      status: 500,
    });
  }
}
