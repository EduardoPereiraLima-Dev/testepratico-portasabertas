import * as React from "react" // Importa todas as funcionalidades do React

import { cn } from "../../lib/util" // Importa uma função utilitária para manipulação de classes

// Componente Input que usa forwardRef para permitir o acesso à referência do input
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Define o tipo do input (text, password, etc.)
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className // Permite adicionar classes personalizadas
        )}
        ref={ref} // Passa a referência para o input
        {...props} // Espalha outras propriedades (ex: onChange, value)
      />
    )
  }
)

Input.displayName = "Input" // Define o nome do componente para depuração

export { Input } // Exporta o componente para uso em outros arquivos
