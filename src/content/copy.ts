import type { HeadlineKey } from '../config/site'

/*
 * Todo o texto da página mora aqui.
 * Trechos entre [[ ]] dependem do cliente e aparecem sublinhados na tela.
 * Títulos, afirmações do manifesto e perguntas do FAQ são copy provisória da Horizon, para aprovação.
 */

interface EssentialItem {
  term: string
  value: string
}

interface ScheduleItem {
  time: string
  title: string
  description: string
}

interface Speaker {
  name: string
  role: string
  /** Uma frase: o que essa pessoa apresenta */
  bio: string
  /** Caminho em public/images, ou null enquanto a foto não chega */
  photo: string | null
  /** Perfil (Instagram, LinkedIn...) para onde a foto leva. null enquanto não chega. */
  social: string | null
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface Sponsor {
  name: string
  url: string
  /** Caminho em public/images, ou null enquanto a arte não chega — nesse caso o nome aparece em texto */
  logo: string | null
  /** true quando a arte original é escura (traço preto): inverte pra ficar visível sobre o fundo night */
  invert?: boolean
}

interface FaqItem {
  question: string
  answer: string
}

interface Consent {
  message: string
  accept: string
  decline: string
}

interface PrivacyPage {
  backLabel: string
  title: string
  body: string
}

interface Copy {
  skipLink: string
  cta: { label: string; exitNote: string }
  hero: { headlines: Record<HeadlineKey, string>; }
  essencial: { title: string; items: EssentialItem[] }
  manifesto: { title: string; statements: string[]; body: string }
  video: { title: string; caption: string; playLabel: string; pendingLabel: string }
  programacao: { title: string; items: ScheduleItem[] }
  palestrantes: { title: string; intro: string; items: Speaker[] }
  prova: { title: string; testimonials: Testimonial[]; supportersLabel: string; supporters: Sponsor[] }
  participar: { title: string; price: string; condition: string; includedTitle: string; included: string[] }
  faq: { title: string; items: FaqItem[] }
  consent: Consent
  privacyPage: PrivacyPage
  footer: {
    contactLabel: string
    instagramLabel: string
    emailLabel: string
    organizerLabel: string
    organizer: string
    organizerDocument: string
    privacyLabel: string
    credit: string
  }
}

export const copy: Copy = {
  skipLink: 'Pular para o conteúdo',
  cta: {
    label: 'Garantir minha vaga',
    exitNote: 'O pagamento acontece em [[nome da plataforma de venda]], com cartão ou Pix.',
  },
  hero: {
    headlines: {
      a: 'Empresários do interior no nível dos grandes centros.',
      b: 'Expandir sem sair daqui.',
    },
  },
  essencial: {
    title: 'Informações essenciais',
    items: [
      { term: 'O que é', value: 'Empresários do interior no nível dos grandes centros' },
      { term: 'Quando', value: '17/10/2026, 09:00 às 17:00' },
      { term: 'Onde', value: 'Maison Finesse, Itabaiana - PB' },
      { term: 'Quanto', value: 'R$ 179' },
    ],
  },
  manifesto: {
    title: 'Por que o Expande Interior existe',
    statements: [
      'O interior não precisa pedir licença à capital para crescer.',
      'Quando uma empresa daqui amadurece, a cidade amadurece com ela.',
      'A régua sobe para todos.',
    ],
    body: '[[Três ou quatro frases do cliente: por que o Expande Interior existe e o que muda na região.]]',
  },
  video: {
    title: 'Vídeo de apresentação',
    caption: '[[Do que trata o vídeo, em uma frase, e a duração]]',
    playLabel: 'Assistir ao vídeo',
    pendingLabel: '[[vídeo a definir]]',
  },
  programacao: {
    title: 'Programação',
    items: [
      { time: '09:00', title: 'Abertura', description: '[[O que é o Expande Interior e porque ele é o início da transformação do seu negócio?]]' },
      { time: '09:40', title: 'Palestras da Manhã', description: '[[Conteúdos práticos e objetivo que vão te gerar um turbilhão de ideias]]' },
      { time: '12:00', title: 'Intervalo pro Almoço', description: '[[Hora de dar uma pausa, absorver o conteúdo, e se preparar para muito mais]]' },
      { time: '13:30', title: 'Palestras da Tarde', description: '[[ Conteúdo em dobro, que se transforma e margem de lucro pra sua empresa]]' },
      { time: '17:00', title: 'Encerramento', description: '[[Uma surpresa muito especial te aguardaB]]' },
    ],
  },
  palestrantes: {
    title: 'Quem apresenta',
    intro: '[[Uma frase sobre a curadoria dos palestrantes convidados]]',
    items: [
      {
        name: 'Fabiano Rodrigues',
        role: 'Representante comercial, AIRGO',
        bio: 'Mais de 18 anos em vendas e Network Marketing, com passagens pela Forever Living Products e pela Niponflex — hoje representa a AIRGO, levando tecnologia e inovação às marcas.',
        photo: '/images/palestrantes/fabiano-rodrigues.jpeg',
        social: null,
      },
      {
        name: '[[nome completo]]',
        role: '[[cargo e empresa]]',
        bio: '[[uma frase sobre o que essa pessoa apresenta]]',
        photo: null,
        social: null,
      },
      {
        name: '[[nome completo]]',
        role: '[[cargo e empresa]]',
        bio: '[[uma frase sobre o que essa pessoa apresenta]]',
        photo: null,
        social: null,
      },
    ],
  },
  prova: {
    title: 'Quem já participou',
    // Vazio de propósito: prova social nunca é inventada. A seção só aparece com conteúdo real.
    testimonials: [],
    supportersLabel: 'Com apoio de',
    supporters: [
      { name: 'UnidasNet', url: '[[link redes sociais UnidasNet]]', logo: '/images/apoiadores/unidasnet.png' },
      { name: 'Unidas Systems', url: '[[link redes sociais Unidas Systems]]', logo: '/images/apoiadores/unidas-systems.png' },
      { name: 'Dudu Higienização', url: '[[link redes sociais Dudu Higienização]]', logo: '/images/apoiadores/dudu-higienizacao.png', invert: true },
      { name: 'Delícias da Ilha', url: '[[link redes sociais Delícias da Ilha]]', logo: '/images/apoiadores/delicias-da-ilha.png', invert: true },
      { name: 'Alavanque Consultoria', url: '[[link redes sociais Alavanque Consultoria]]', logo: '/images/apoiadores/alavanque-consultoria.png', invert: true },
    ],
  },
  participar: {
    title: 'Participar do Expande Interior',
    price: '[[R$ 179,00]]',
    condition: '[[Lote Único, até ../../2026]]',
    includedTitle: 'O que está incluso',
    included: ['[[item incluso]]', '[[item incluso]]', '[[item incluso]]'],
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        question: 'Para quem é o Expande Interior?',
        answer: 'Para empresários e empreendedores do interior que querem colocar o negócio no nível dos grandes centros.',
      },
      {
        question: 'Como funciona o pagamento?',
        answer: 'O pagamento é feito direto em [[nome da plataforma de venda]], com cartão ou Pix. [[Se houver parcelamento: em até Nx sem juros.]]',
      },
      {
        question: 'Posso transferir minha vaga para outra pessoa?',
        answer: 'Não — a vaga é pessoal e intransferível.',
      },
      {
        question: 'E se eu não puder comparecer?',
        answer:
          'Reembolso integral até 7 dias antes do evento (10/10/2026). Depois desse prazo, não há reembolso. [[Como solicitar: canal e prazo de processamento.]]',
      },
      {
        question: 'Tenho outra dúvida. Com quem falo?',
        answer: 'É só chamar pelo Instagram @expandeinterior ou pelo e-mail [[endereço de contato]] — respondemos o quanto antes.',
      },
    ],
  },
  consent: {
    message: 'Usamos cookies para entender como as pessoas chegam até esta página. Você pode aceitar ou recusar.',
    accept: 'Aceitar',
    decline: 'Recusar',
  },
  privacyPage: {
    backLabel: 'Voltar para o Expande Interior',
    title: 'Política de privacidade',
    body: '[[Texto da política de privacidade, a definir com o cliente ou o jurídico.]]',
  },
  footer: {
    contactLabel: 'Dúvidas',
    instagramLabel: '@expandeinterior',
    emailLabel: '[[e-mail de contato]]',
    organizerLabel: 'Realização',
    organizer: '[[nome do organizador]]',
    organizerDocument: '[[CNPJ]]',
    privacyLabel: 'Política de privacidade',
    credit: 'Site por Horizon',
  },
}
