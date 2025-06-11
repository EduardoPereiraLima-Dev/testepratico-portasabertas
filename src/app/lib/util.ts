import { type ClassValue, clsx } from "clsx" // Importa tipos e a função clsx para manipulação de classes
import { twMerge } from "tailwind-merge" // Importa a função twMerge para mesclar classes do Tailwind

// Função que combina classes CSS e remove duplicatas
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)) // Combina as classes e mescla as do Tailwind
}
