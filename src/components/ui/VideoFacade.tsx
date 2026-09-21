import { useEffect, useRef, useState } from 'react'
import type { VideoConfig } from '../../config/site'
import { Rich } from './Rich'

interface VideoFacadeProps {
  video: VideoConfig | null
  title: string
  playLabel: string
  pendingLabel: string
  /** Duração exibida no selo da capa, ex.: '0:32' */
  duration?: string
  /** id do texto que descreve o vídeo para leitor de tela */
  transcriptId?: string
}

/**
 * Facade: mostra só uma capa com botão. O iframe do YouTube (pesado e com cookies)
 * só é carregado depois do clique.
 */
export function VideoFacade({ video, title, playLabel, pendingLabel, duration, transcriptId }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const fileRef = useRef<HTMLVideoElement>(null)

  // Depois do clique, o foco vai para o player: quem usa teclado não fica perdido.
  useEffect(() => {
    if (playing) (iframeRef.current ?? fileRef.current)?.focus()
  }, [playing])

  if (playing && video?.src !== undefined) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-night-raised">
        <video
          ref={fileRef}
          src={video.src}
          poster={video.poster ?? undefined}
          aria-label={title}
          aria-describedby={transcriptId}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full"
        >
          {video.captions && <track kind="captions" src={video.captions} srcLang="pt-BR" label="Português" default />}
        </video>
      </div>
    )
  }

  if (playing && video?.youtubeId) {
    const params = new URLSearchParams({ autoplay: '1', rel: '0', cc_load_policy: '1', cc_lang_pref: 'pt', hl: 'pt-BR' })

    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-night-raised">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      disabled={!video}
      aria-label={video ? `${playLabel}: ${title}` : undefined}
      aria-describedby={video ? transcriptId : undefined}
      className="group relative block aspect-video w-full overflow-hidden rounded-md bg-night-raised text-left disabled:cursor-default"
    >
      {video?.poster ? (
        <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        video?.src && (
          // Sem capa própria, o navegador mostra um quadro do vídeo (#t=0.5) como thumbnail.
          // preload="metadata" baixa só o começo, não o arquivo inteiro.
          <video
            src={`${video.src}#t=0.5`}
            preload="metadata"
            muted
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale"
          />
        )
      )}
      {video && !video.poster && <span className="absolute inset-0 bg-night/35" aria-hidden="true" />}

      <span className="absolute bottom-4 left-4 flex items-center gap-4 lg:bottom-8 lg:left-8">
        <span className="flex size-12 items-center justify-center rounded-md bg-fog text-wine transition-colors duration-200 group-enabled:group-hover:bg-fog-hover lg:size-16">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="ml-0.5 size-4 lg:size-5">
            <path d="M3 1.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-fog">{video ? playLabel : <Rich text={pendingLabel} />}</span>
      </span>

      {video && duration && (
        <span className="absolute right-4 bottom-4 rounded-sm bg-night/80 px-2 py-1 text-[0.875rem] text-fog tabular-nums lg:right-8 lg:bottom-8">
          {duration}
        </span>
      )}
    </button>
  )
}
