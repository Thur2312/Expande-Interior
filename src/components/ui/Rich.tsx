const TOKEN = /(\[\[.+?\]\])/g

/** Renderiza texto do copy.ts marcando os trechos [[ ]] como conteúdo pendente. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN)

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[\[(.+)\]\]$/)
        if (!match) return part

        return (
          <span key={index} className="placeholder" title="Conteúdo a definir com o cliente">
            {match[1]}
          </span>
        )
      })}
    </>
  )
}
