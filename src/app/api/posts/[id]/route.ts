import { NextResponse } from 'next/server';
import {
  getPostById,
  updatePost,
  deletePost,
} from '@/services/postService';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPostById(Number(params.id));
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await updatePost(Number(params.id), body);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deletePost(Number(params.id));
  return NextResponse.json({ message: 'Deleted' });
}