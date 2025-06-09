import { NextResponse } from 'next/server';
import {
  getPostById,
  updatePost,
  deletePost,
} from '@/services/postService';
import { requireAuth, verifyToken } from '@/lib/auth';

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
  // Authorise route for only authenticated users
  const authResult = await requireAuth(req);
  if (authResult instanceof Response) {
    return authResult; // Early return if unauthorized
  }

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