import { prisma } from '@/lib/prisma';
import { Post } from '@/types/post';

export const getAllPosts = () => prisma.post.findMany();

export const getPostById = (id: number) =>
  prisma.post.findUnique({ where: { id } });

export const createPost = (data: Post) =>
  prisma.post.create({ data });

export const updatePost = (id: number, data: Post) =>
  prisma.post.update({ where: { id }, data });

export const deletePost = (id: number) =>
  prisma.post.delete({ where: { id } });