import { prisma } from "../prisma";

export const getAllThreads = async (userId?: string) => {
  const threads = await prisma.thread.findMany({
    where: { ...(userId !== undefined && { userId }) },
  });
  console.log(threads);
  return threads;
};

export const getThread = async (id: string) => {
  const thread = await prisma.thread.findFirst({ where: { id } });
  console.log(thread);
  return thread;
};

export const addThread = async (
  title: string,
  description: string,
  userId: string
) => {
  const newThread = await prisma.thread.create({
    data: { title, description, userId },
  });
  console.log(newThread);
  return newThread;
};

export const updateThread = async (
  id: string,
  title?: string,
  description?: string
) => {
  const updatedThread = await prisma.thread.update({
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    },
    where: { id },
  });
  console.log(updatedThread);
  return updatedThread;
};

export const deleteThread = async (id: string) => {
  const deletedThread = await prisma.thread.delete({ where: { id } });
  console.log(deletedThread);
  return deletedThread;
};
