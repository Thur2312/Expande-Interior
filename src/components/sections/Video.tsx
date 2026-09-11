import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isPending } from '../../content/pending'
import { Rich } from '../ui/Rich'
import { VideoFacade } from '../ui/VideoFacade'

export function Video() {
  const ready = site.video !== null && !isPending(copy.video.caption)
  if (!ready && !site.showPending) return null

  return (
    <section aria-labelledby="video-title" className="page-x py-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-28">
      <h2 id="video-title" className="sr-only">
        {copy.video.title}
      </h2>

      <div className="lg:col-span-8">
        <VideoFacade
          video={site.video}
          title={copy.video.title}
          playLabel={copy.video.playLabel}
          pendingLabel={copy.video.pendingLabel}
        />
      </div>

      <p className="mt-5 max-w-[34ch] text-mist lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
        <Rich text={copy.video.caption} />
      </p>
    </section>
  )
}
