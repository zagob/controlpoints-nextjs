import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { timeToMinutes } from "@/lib/hoursInMinutes";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { time1, time2, time3, time4, datePoint } = body;

    const transformTime1 = timeToMinutes(time1);
    const transformTime2 = timeToMinutes(time2);
    const transformTime3 = timeToMinutes(time3);
    const transformTime4 = timeToMinutes(time4);

    const transformDate = new Date(datePoint);
    transformDate.setUTCHours(0, 0, 0, 0);

    console.log(body);

    const data = {
      createdAt: transformDate.toISOString(),
      time1: transformTime1,
      time2: transformTime2,
      time3: transformTime3,
      time4: transformTime4,
      userId: session.user.id,
    };

    console.log("data", data);

    await db.point.create({
      data,
    });

    return new Response("", { status: 200 });
  } catch (error) {
    console.log("error", error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not add point, please try again later", {
      status: 500,
    });
  }
}
