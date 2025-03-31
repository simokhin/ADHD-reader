"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData) {
  const userId = formData.get("userId") as string;
  const content = formData.get("content") as string;
  const tag = (formData.get("tag") as string) || undefined;

  if (!userId || !content) {
    throw new Error("userId and content are required.");
  }

  try {
    await prisma.notes.create({
      data: {
        tag,
        content,
        userId,
      },
    });
  } catch (error) {
    console.error("Error adding note:", error);
    throw new Error("Failed to add note");
  }
  revalidatePath("/dashboard");
}

export async function getNotes(userId: string) {
  let notes;
  try {
    notes = await prisma.notes.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error while getting notes", error);
  }
  return notes;
}

export async function getTags(userId: string) {
  let tags;
  try {
    tags = await prisma.notes.findMany({
      where: { userId },
      select: { tag: true },
    });
    tags = tags
      .map((tag) => tag.tag)
      .filter(
        (tag, index, self) => tag !== null && self.indexOf(tag) === index
      );
    console.log(tags);
  } catch (error) {
    console.error("Error while getting tags", error);
  }
  return tags;
}

export async function deleteNote(id: string) {
  const noteId = parseInt(id, 10);
  if (isNaN(noteId)) {
    throw new Error("Invalid note ID");
  }
  console.log(noteId);
  try {
    await prisma.notes.delete({
      where: {
        id: noteId,
      },
    });
  } catch (error) {
    console.error("Error while deleting note", error);
  }
  revalidatePath("/dashboard");
}
