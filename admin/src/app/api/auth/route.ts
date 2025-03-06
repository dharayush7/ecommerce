import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("auth");

  if (!session) {
    return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }

  return Response.json({
    id: session.value,
  });
}
