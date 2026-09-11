import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { Rich } from '../ui/Rich'

export function Footer() {
  const { footer } = copy
  const { instagram, email, privacy } = site.links

  return (
    <footer className="page-x border-t border-rule pt-14 pb-32 lg:pt-20 lg:pb-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <img src="/brand/logo-expande-fog.svg" alt="Expande Interior" width={162} height={44} className="h-10 w-auto lg:col-span-4" />

        <div className="lg:col-span-3 lg:col-start-6">
          <p className="text-[0.9375rem] text-mist">{footer.contactLabel}</p>
          <ul className="mt-2 flex flex-col gap-1">
            <li>
              <a href={instagram ?? '#'} className="underline-offset-4 hover:underline">
                <Rich text={footer.instagramLabel} />
              </a>
            </li>
            <li>
              <a href={email ? `mailto:${email}` : '#'} className="underline-offset-4 hover:underline">
                <Rich text={footer.emailLabel} />
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 lg:col-start-10">
          <p className="text-[0.9375rem] text-mist">{footer.organizerLabel}</p>
          <p className="mt-2">
            <Rich text={footer.organizer} />
          </p>
          <p className="text-mist">
            <Rich text={footer.organizerDocument} />
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-2 text-[0.875rem] text-mist sm:flex-row sm:justify-between lg:mt-20">
        <a href={privacy} className="underline-offset-4 hover:underline">
          {footer.privacyLabel}
        </a>
        <p>{footer.credit}</p>
      </div>
    </footer>
  )
}
