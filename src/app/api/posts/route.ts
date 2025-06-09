import { NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/services/postService';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newPost = await createPost(body);
  return NextResponse.json(newPost, { status: 201 });
}