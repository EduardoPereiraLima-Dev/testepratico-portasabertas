"use client"

import { useEffect, useState } from "react"
import { Alert } from "../components/ui/alert"
import { Button } from "./ui/button"
import { checkApiConfig } from "../sevice/api"

export function ConfigChecker() {
  const [config, setConfig] = useState<{ isValid: boolean; errors: string[] } | null>(null)
  const [showConfig, setShowConfig] = useState(false)

  useEffect(() => {
    const configStatus = checkApiConfig()
    setConfig(configStatus)
  }, [])

  if (!config || config.isValid) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">⚠️ Configuração Incompleta</h4>
        <p>Algumas variáveis de ambiente não estão configuradas:</p>
        <ul className="list-disc list-inside text-sm">
          {config.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <Button type="button" variant="outline" size="sm" onClick={() => setShowConfig(!showConfig)} className="w-fit">
          {showConfig ? "Ocultar" : "Ver"} instruções
        </Button>
        {showConfig && (
          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
            <p className="font-semibold mb-2">📝 Como configurar:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Crie um arquivo <code>.env.local</code> na raiz do projeto
              </li>
              <li>
                Adicione as variáveis:
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                  {`NEXT_PUBLIC_API_BASE_URL=https://sandbox.api.alianca.portasabertas.org.br
NEXT_PUBLIC_API_TOKEN=seu_token_aqui`}
                </pre>
              </li>
              <li>
                Substitua <code>seu_token_aqui</code> pelo token fornecido
              </li>
              <li>Reinicie o servidor de desenvolvimento</li>
            </ol>
          </div>
        )}
      </div>
    </Alert>
  )
}
