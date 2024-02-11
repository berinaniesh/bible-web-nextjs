import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"

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