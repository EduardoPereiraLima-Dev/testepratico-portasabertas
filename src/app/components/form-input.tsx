"use client" // Indica que este componente é um cliente React

import type React from "react" // Importa o tipo React para TypeScript
import { Input } from "../components/ui/input" // Importa o componente de entrada
import { Label } from "../components/ui/label" // Importa o componente de rótulo

// Define a interface para as propriedades do componente FormInput
interface FormInputProps {
  label: string // Rótulo do campo
  name: string // Nome do campo (usado no HTML e para gerenciamento de estado)
  type?: string // Tipo do campo (padrão é "text")
  value: string // Valor atual do campo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Função chamada quando o valor do campo muda
  error?: string // Mensagem de erro (se houver)
  required?: boolean // Indica se o campo é obrigatório
  placeholder?: string // Texto de espaço reservado para o campo
}

// Componente funcional que renderiza um campo de entrada com rótulo e validação
export function FormInput({
  label,
  name,
  type = "text", // Define o tipo padrão como "text"
  value,
  onChange,
  error,
  required = false, // Define o padrão de obrigatório como false
  placeholder,
}: FormInputProps) {
  return (
    <div className="space-y-2"> {/* Container para o campo de entrada e rótulo */}
      <div className="flex items-center justify-between"> {/* Alinha rótulo e erro */}
        <Label htmlFor={name} className="text-sm font-medium"> {/* Rótulo associado ao campo */}
          {label}
          {required && <span className="text-red-500"> *</span>} {/* Indica campos obrigatórios */}
        </Label>
        {error && <span className="text-xs text-red-500">{error}</span>} {/* Exibe mensagem de erro, se houver */}
      </div>
      <Input
        id={name} // ID do campo de entrada
        name={name} // Nome do campo de entrada
        type={type} // Tipo do campo de entrada
        value={value} // Valor do campo de entrada
        onChange={onChange} // Função chamada ao mudar o valor
        className={`w-full ${error ? "border-red-500" : ""}`} // Adiciona classe de erro, se houver
        placeholder={placeholder} // Texto de espaço reservado
        required={required} // Indica se o campo é obrigatório
      />
    </div>
  )
}
