export type ParenthesesMotion = 'abrindo' | 'estatico'
export type HeadlineKey = 'a' | 'b'

export interface VideoConfig {
  /** Só o ID do YouTube: em youtube.com/watch?v=abc123, o ID é abc123 */
  youtubeId: string
  /** Imagem de capa em public/images. Sem ela, a capa usa a cor da superfície. */
  poster: string | null
}

export interface SiteConfig {
  /** Link da plataforma de venda. useSalesLink repassa as UTMs da URL atual. */
  salesUrl: string
  /** Container ID do Google Tag Manager (formato GTM-XXXXXXX). null enquanto não chega do cliente. */
  gtmId: string | null
  parenthesesMotion: ParenthesesMotion
  headline: HeadlineKey
  /**
   * true durante o desenvolvimento: seções com [[ ]] aparecem para revisão.
   * false antes de publicar: seções opcionais que ainda tiverem [[ ]] somem sozinhas.
   */
  showPending: boolean
  video: VideoConfig | null
  links: {
    instagram: string | null
    email: string | null
    privacy: string
  }
}

export const site: SiteConfig = {
  salesUrl: '#',
  gtmId: null,
  parenthesesMotion: 'abrindo',
  headline: 'a',
  showPending: true,
  video: null,
  links: {
    instagram: null,
    email: null,
    privacy: '/privacidade.html',
  },
}
