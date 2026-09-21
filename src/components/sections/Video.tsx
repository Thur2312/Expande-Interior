import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isPending } from '../../content/pending'
import { Rich } from '../ui/Rich'
import { VideoFacade } from '../ui/VideoFacade'

export function Video() {
  const ready = site.video !== null && !isPending(copy.video.caption)
  if (!ready && !site.showPending) return null

  return (
    <section aria-labelledby="video-title" className="page-x pt-6 pb-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:pt-8 lg:pb-28">
      <h2 id="video-title" className="sr-only">
        {copy.video.title}
      </h2>

      <p id="video-transcript" className="sr-only">
        {copy.video.transcript}
      </p>

      <div className="lg:col-span-9">
        <VideoFacade
          video={site.video}
          title={copy.video.title}
          playLabel={copy.video.playLabel}
          pendingLabel={copy.video.pendingLabel}
          duration={copy.video.duration}
          transcriptId="video-transcript"
        />
      </div>

      <p className="mt-6 max-w-[34ch] font-serif text-[1.25rem] leading-snug text-fog lg:col-span-3 lg:col-start-10 lg:mt-0 lg:max-w-none lg:self-end lg:text-[clamp(1.25rem,0.55rem+1.1vw,1.75rem)]">
        <Rich text={copy.video.caption} />
      </p>
    </section>
  )
}
