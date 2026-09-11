/** Um texto está pendente enquanto tiver algum trecho [[ ]]. */
export function isPending(text: string): boolean {
  return text.includes('[[')
}

/** Uma lista está pronta quando existe e nenhum dos seus textos está pendente. */
export function isReady(texts: string[]): boolean {
  return texts.length > 0 && !texts.some(isPending)
}
