export type ParenthesesMotion = 'abrindo' | 'estatico'
export type HeadlineKey = 'a' | 'b'
export type HeroVariant = 'foto' | 'tipografico'

/**
 * Duas fontes possíveis para o vídeo: YouTube (youtubeId) ou arquivo próprio em public/ (src).
 * O `never` impede preencher as duas ao mesmo tempo: o TypeScript recusa.
 */
export type VideoConfig = {
  /** Imagem de capa em public/images. Sem ela, a capa usa a cor da superfície. */
  poster: string | null
} & (
  | {
      /** Só o ID do YouTube: em youtube.com/watch?v=abc123, o ID é abc123 */
      youtubeId: string
      src?: never
      captions?: never
    }
  | {
      /** Caminho do arquivo em public/, ex.: '/video-apresentacao.mp4' */
      src: string
      /** Legenda em .vtt (public/). Sem ela, o vídeo próprio fica sem legenda. */
      captions: string | null
      youtubeId?: never
    }
)

export interface SiteConfig {
  /** Link da plataforma de venda. useSalesLink repassa as UTMs da URL atual. */
  salesUrl: string
  /** Container ID do Google Tag Manager (formato GTM-XXXXXXX). null enquanto não chega do cliente. */
  gtmId: string | null
  parenthesesMotion: ParenthesesMotion
  headline: HeadlineKey
  heroVariant: HeroVariant
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
  heroVariant: 'foto',
  showPending: false,
  // Legenda já vem queimada na imagem do vídeo, por isso captions é null (um .vtt duplicaria o texto).
  video: { src: '/video-apresentacao.mp4', captions: null, poster: '/images/video-capa.jpg' },
  links: {
    instagram: 'https://www.instagram.com/expandeinterior/',
    email: 'contatoexpandeinterior@gmail.com',
    privacy: '/privacidade.html',
  },
}
