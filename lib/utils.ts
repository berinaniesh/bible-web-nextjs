import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"
import { API_URL } from "."

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[]
}

export function getCrumb(str: string, isTranslation: boolean) {
  if (isTranslation) {
    return str.toUpperCase();
  } else {
    return str.replace("-", " ").split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ').replace("Uis", "UIs");
  }
}

export async function getNav(book: string, chapter: number) {
  //@ts-ignore
  const currentPage = {"book": book, "chapter": parseInt(chapter)}
  const res = await fetch(`${API_URL}/nav`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "*/*"},
    body: JSON.stringify(currentPage)
  });
  const nav = await res.json()
  return nav;
}