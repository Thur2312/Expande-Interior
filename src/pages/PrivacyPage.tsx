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
      <p className="mt-3 text-[0.9375rem] text-mist">
        <Rich text={privacyPage.updated} />
      </p>

      <div className="mt-10 max-w-[70ch]">
        <p className="text-fog/90">
          <Rich text={privacyPage.intro} />
        </p>

        {privacyPage.sections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="font-serif text-[1.5rem] leading-tight font-medium lg:text-[1.75rem]">{section.title}</h2>

            <div className="mt-4 flex flex-col gap-4 text-fog/90">
              {section.blocks.map((block, index) =>
                'paragraph' in block ? (
                  <p key={index}>
                    <Rich text={block.paragraph} />
                  </p>
                ) : (
                  <ul key={index} className="flex list-disc flex-col gap-2 pl-5 marker:text-mist">
                    {block.list.map((item) => (
                      <li key={item} className="pl-1">
                        <Rich text={item} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
