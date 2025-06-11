import * as React from "react"

// Define o breakpoint para considerar mobile (em pixels)
const MOBILE_BREAKPOINT = 768

// Hook customizado para detectar se a tela está em modo mobile
export function useIsMobile() {
  // Estado para armazenar se é mobile ou não
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Cria uma MediaQueryList para o breakpoint definido
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // Função chamada quando a largura da tela muda
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Define o estado inicial ao montar o componente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Remove o listener ao desmontar o componente
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Retorna true se for mobile, false caso contrário
  return !!isMobile
}
