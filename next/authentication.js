import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Call external authentication API
  const response = await fetch(
    "https://api.example.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const data = await response.json();

  // Assuming external API returns:
  // { accessToken: "eyJ..." }

  const res = NextResponse.json({
    success: true,
  });

  res.cookies.set("access_token", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return res;
}

// app/dashboard/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await validateToken(token);

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      Welcome {user.name}
    </div>
  );
}