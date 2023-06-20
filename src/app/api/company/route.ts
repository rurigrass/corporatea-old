import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CompanyValidator } from "@/lib/validators/company";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }

    //converts the request to json
    const body = await req.json();
    // validated the json and destructures it.
    const { name } = CompanyValidator.parse(body);

    //check if company already exists
    const companyExists = await db.company.findFirst({
      where: {
        name,
      },
    });

    if (companyExists) {
      return new Response("Company already exists", { status: 409 });
    }

    //push to db
    const company = await db.company.create({
      data: {
        name,
        creatorId: session.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.id,
        companyId: company.id,
      },
    });

    return new Response(company.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not add company", { status: 500 });
  }
}