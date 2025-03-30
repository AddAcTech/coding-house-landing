import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js!" });
}

export async function POST(request: Request) {
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
