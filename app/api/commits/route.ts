import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js!" });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);
  const body = await request.json();
  const githubEvent = request.headers.get("x-github-event");

  if (githubEvent === "push") {
    const response = {
      author: body.head_commit.committer.username,
      email: body.head_commit.committer.email,
      commit_message: body.head_commit.message,
      avatar: body.sender.avatar_url,
      id: body.head_commit.id,
      modified_files: body.head_commit.modified,
      date: body.head_commit.timestamp,
      commit_url: body.head_commit.url,
      branch: body.ref,
    };
    console.log(response);
    const { error } = await supabase
      .from("commits")
      .insert({ commit: response });

    if (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json(
        { error: "Error inserting data" },
        { status: 500 }
      );
    }
    // POST request to /api/commits

    return NextResponse.json(response, { status: 201 });
  } else if (githubEvent === "ping") {
    console.log("GitHub sent the ping event");
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }

  return NextResponse.json({ message: "Success" }, { status: 201 });
}

/*
PORT FORWARDING CON SMEE.IO, REGISTRADO EN EL Payload URL DE GITHUB
        npm install --global smee-client
run : smee -u https://smee.io/kD9SZP8FfXp3hVX4 -t http://127.0.0.1:3000/api/commits

author body.head_commit.commiter.username
email body.head_commit.commiter.email
avatar body.head_commit.sender.avatar_url
commit message body.head_commit.message
id  body.head_commit.id
modified files body.head_commit.modified[]
date body.head_commit.timestamp
commit url body.head_commit.url
branch body.ref

*/
