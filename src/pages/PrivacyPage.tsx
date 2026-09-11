import { copy } from '../content/copy'
import { Rich } from '../components/ui/Rich'

export function PrivacyPage() {
  const { privacyPage } = copy

  return (
    <main className="page-x mx-auto max-w-[64rem] py-16 lg:py-24">
      <a href="/" className="text-[0.9375rem] text-mist underline-offset-4 hover:underline">
        {privacyPage.backLabel}
      </a>

      <h1 className="title-section mt-8">{privacyPage.title}</h1>

      <div className="mt-8 max-w-[70ch] text-mist">
        <Rich text={privacyPage.body} />
      </div>
    </main>
  )
}
