import { prisma } from "../prisma";

export const getAllCommentsAction = async (userId?: string, threadId?: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      ...(userId !== undefined && { userId }),
      ...(threadId !== undefined && { threadId }),
    },
  });
  console.log(comments);
  return comments;
};

export const getCommentsAction = async (id: string) => {
  const comment = await prisma.comment.findFirst({ where: { id } });
  console.log(comment);
  return comment;
};

export const addCommentAction = async (
  content: string,
  userId: string,
  threadId: string
) => {
  const newComment = await prisma.comment.create({
    data: { content, userId, threadId },
  });
  console.log(newComment);
  return newComment;
};

export const updateCommentAction = async (id: string, content: string) => {
  const updatedComment = await prisma.comment.update({
    data: { content },
    where: { id },
  });
  console.log(updatedComment);
  return updatedComment;
};

export const deleteCommentAction = async (id: string) => {
  const deletedComment = await prisma.comment.delete({ where: { id } });
  console.log(deletedComment);
  return deletedComment;
};
