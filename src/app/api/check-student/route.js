import { NextResponse } from "next/server";

const baseUrl = "https://churchill.galaxy360.com.au/api/v3/students";

export async function POST(req) {
  try {
    const { studentId } = await req.json();

    const token = process.env.TOKEN;
    if (!token) throw new Error("No token");

    const res = await fetch(`${baseUrl}/${studentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json(
        { message: "Student Found", data: data.data },
        { status: 200 }
      );
    } else {
      throw new Error(data?.message || "Student not found");
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
