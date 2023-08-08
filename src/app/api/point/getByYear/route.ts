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

    const firstDayOfMonth = new Date(year, 0, 0);
    const lastDayOfMonth = new Date(year, 12, 0);

    const points = await db.point.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: firstDayOfMonth,
          lt: lastDayOfMonth,
        },
      },
    });

    const formatPoints = points.map((point) => ({
      ...point,
      total: point.time2 - point.time1 + (point.time4 - point.time3),
    }));

    console.log("points all", points);

    return new Response(
      JSON.stringify({
        points: formatPoints,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("invalid, please try again later", {
      status: 500,
    });
  }
}
