"use server";

import { prisma } from "../prisma";

export const getAllUsersAction = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } });
  console.log(user);
  return user;
};

export const addUser = async (username: string, password: string) => {
  const newUser = await prisma.user.create({ data: { username, password } });
  console.log(newUser);
  return newUser;
};

export const updateUser = async (
  id: string,
  username?: string,
  password?: string
) => {
  const updatedUser = await prisma.user.update({
    data: {
      ...(username !== undefined && { username }),
      ...(password !== undefined && { password }),
    },
    where: { id },
  });
  console.log(updatedUser);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({ where: { id } });
  console.log(deletedUser);
  return deletedUser;
};
