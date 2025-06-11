"use client" // Indica que este código deve ser executado no lado do cliente

import * as React from "react" // Importa todas as funcionalidades do React
import * as LabelPrimitive from "@radix-ui/react-label" // Importa componentes de rótulo da Radix UI
import { cva, type VariantProps } from "class-variance-authority" // Importa utilitários para variáveis de classe

import { cn } from "../../lib/util" // Importa uma função utilitária para manipulação de classes

// Define variantes de estilo para o componente Label
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70")

// Componente Label que usa forwardRef para permitir a passagem de referências
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))

Label.displayName = LabelPrimitive.Root.displayName // Define o nome do componente para depuração

export { Label } // Exporta o componente para uso em outros arquivos
