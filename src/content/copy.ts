import type { HeadlineKey } from '../config/site'

/*
 * Todo o texto da página mora aqui.
 * Trechos entre [[ ]] dependem do cliente e aparecem sublinhados na tela.
 * Títulos e perguntas do FAQ são copy provisória da Horizon, para aprovação.
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

/** Um bloco da política: um parágrafo ou uma lista. A ordem no array é a ordem na tela. */
type PolicyBlock = { paragraph: string } | { list: string[] }

interface PolicySection {
  title: string
  blocks: PolicyBlock[]
}

interface PrivacyPage {
  backLabel: string
  title: string
  updated: string
  intro: string
  sections: PolicySection[]
}

interface Copy {
  skipLink: string
  cta: { label: string; exitNote: string }
  hero: { headlines: Record<HeadlineKey, string>; }
  essencial: { title: string; items: EssentialItem[] }
  video: { title: string; caption: string; transcript: string; duration: string; playLabel: string; pendingLabel: string }
  programacao: { title: string; items: ScheduleItem[] }
  palestrantes: { title: string; intro: string; items: Speaker[] }
  prova: { title: string; testimonials: Testimonial[]; supportersLabel: string; supporters: Sponsor[] }
  participar: { title: string; price: string; condition: string; learnTitle: string; learn: string[] }
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
    exitNote: 'O pagamento acontece em Asaas, com cartão ou Pix.',
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
      { term: 'Quanto', value: 'R$ 179,00' },
    ],
  },
  video: {
    title: 'Vídeo de apresentação',
    caption: 'Seu negócio está crescendo ou você apenas está trabalhando mais? Uma imersão de um dia em Itabaiana-PB para empresários do interior que querem vender mais e crescer com posicionamento, estratégia e relacionamento.',
    // Texto alternativo para leitor de tela (a legenda visual já está queimada no vídeo).
    transcript:
      'Seu negócio está crescendo ou você apenas está trabalhando mais? Porque faturar não é o mesmo que evoluir. Chegou a hora de sair do automático. Uma imersão feita para quem quer expandir os horizontes, se posicionar melhor, vender mais e transformar conhecimento em crescimento, expansão, estratégia e relacionamento. O acesso que faltava chegou. Empresário do interior no nível dos grandes centros. Na tela final: Dia 17 de outubro, no Maison Finesse, Itabaiana-PB.',
    duration: '0:32',
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
    intro: 'Profissionais de publicidade, e-commerce, contabilidade, comunicação e design de marcas, que atendem empresas de diversos segmentos e falam do que praticam no dia a dia dos negócios.',
    items: [
      {
        name: 'Tarcísio Taos',
        role: 'Publicitário e estrategista digital, sócio-fundador da K4S',
        bio: 'Há 15 anos assina projetos para marcas como Facebook, Adidas, Lacoste, Latam e Skol, mais de 1.000 no total. Construiu e vendeu duas empresas e foi eleito Copywriter do ano pela Revista CARAS.',
        photo: '/images/palestrantes/TARCISIO.jpg',
        social: null,
      },
      {
        name: 'Samuel Souza',
        role: 'Empreendedor, mentor e estrategista de negócios',
        bio: 'Serviu ao Exército e atuou na contabilidade antes de empreender. Em e-commerce e marketplaces, geriu contas que somam mais de R$ 17 milhões em faturamento e criou operação própria com mais de R$ 1,5 milhão em vendas.',
        photo: '/images/palestrantes/SAMUEL.jpg',
        social: null,
      },
      {
        name: 'Cristyan Luís',
        role: 'Contador, especialista em contabilidade fiscal e de e-commerce',
        bio: 'Seis anos de carreira na contabilidade. Gerencia empresas internacionais e gigantes do varejo de peças automotivas de João Pessoa e é contador de um dos maiores ecossistemas de e-commerce do Brasil.',
        photo: '/images/palestrantes/Christyan.jpg',
        social: null,
      },
      {
        name: 'Luiza Rodrigues',
        role: 'Social media, graduanda em Relações Públicas',
        bio: 'Há dois anos assina estratégias de comunicação para negócios de saúde, bem-estar, estética e outros segmentos, ajudando marcas e profissionais a se posicionarem no digital e a transformar seguidores em clientes.',
        photo: '/images/palestrantes/LUIZA.jpg',
        social: null,
      },
      {
        name: 'Thácio Barbosa',
        role: 'Designer e estrategista de marcas',
        bio: 'Conheceu o design em um trabalho da escola, em 2017, e há 6 anos ajuda empresas a se comunicarem com clareza e intenção. Especialista em negócios do interior que querem se tornar referências regionais.',
        photo: '/images/palestrantes/THACIO.jpg',
        social: null,
      },
      {
        // Fora da lista de descrições enviada em 21/09. Mantido no fim até o cliente confirmar se segue como palestrante.
        name: 'Fabiano Rodrigues',
        role: 'Representante comercial, AIRGO',
        bio: 'Mais de 18 anos em vendas e Network Marketing, com passagens pela Forever Living Products e pela Niponflex. Hoje representa a AIRGO, levando tecnologia e inovação às marcas.',
        photo: '/images/palestrantes/fabiano-rodrigues.jpeg',
        social: null,
      },
    ],
  },
  prova: {
    title: 'Quem já participou',
    // Vazio de propósito: prova social nunca é inventada. A seção só aparece com conteúdo real.
    testimonials: [],
    supportersLabel: 'Com apoio',
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
    condition: '[[Lote Único]]',
    learnTitle: 'Você vai aprender sobre',
    // Temas ditos no vídeo de apresentação do cliente ("se posicionar melhor, vender mais... estratégia e relacionamento").
    // Confirmar com ele se são exatamente os temas do dia antes de publicar.
    learn: ['Posicionamento', 'Vendas', 'Estratégia', 'Relacionamento'],
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
        answer: 'O pagamento é feito direto em Asaas, com cartão ou Pix. [[Se houver parcelamento: em até 3x sem juros.]]',
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
    updated: 'Última atualização: [[data de publicação]]',
    intro:
      'Esta política explica quais dados esta página coleta, para que servem e como você controla o uso deles. O site do Expande Interior é uma página de apresentação: não tem cadastro, login nem formulário. A compra da vaga acontece em outra plataforma, com regras próprias.',
    // Baseada no que o código do site faz hoje (GTM com Consent Mode, utm_, localStorage, vídeo e fontes próprios,
    // compra na Asaas). Se algo disso mudar (ex.: vídeo no YouTube, novo formulário), revisar o texto.
    // É um rascunho técnico: o organizador ou o jurídico dele precisa revisar antes de publicar.
    sections: [
      {
        title: 'Quem é o responsável',
        blocks: [
          {
            paragraph:
              'O responsável pelos dados tratados nesta página é o organizador do evento, [[nome do organizador e CNPJ]]. O site foi desenvolvido pela Horizon LTDA. Para falar sobre privacidade, escreva para [[e-mail de contato para assuntos de privacidade]].',
          },
        ],
      },
      {
        title: 'Quais dados são tratados',
        blocks: [
          { paragraph: 'Esta página não pede nome, e-mail, telefone nem qualquer cadastro. Os únicos dados tratados aqui são:' },
          {
            list: [
              'Dados de navegação, somente se você aceitar os cookies: páginas visitadas, cliques nos botões de compra (o site registra em qual botão você clicou), tipo de aparelho e navegador, localização aproximada e a origem do acesso.',
              'Parâmetros de campanha (utm_) presentes no endereço que você abriu. Eles indicam de onde você veio e são repassados ao link da plataforma de venda.',
              'Sua escolha sobre cookies, guardada no seu próprio navegador para o aviso não aparecer de novo.',
              'Registros técnicos de acesso, como endereço IP e data e hora, gerados pelo provedor de hospedagem (Vercel) para manter o site seguro e no ar.',
            ],
          },
        ],
      },
      {
        title: 'Para que usamos e em que base legal',
        blocks: [
          {
            list: [
              'Medir quantas pessoas chegam à página e quais botões levam à compra, para melhorar a comunicação do evento. Base legal: consentimento (art. 7º, I, da LGPD). Só acontece se você aceitar.',
              'Guardar sua escolha sobre cookies e manter o site seguro e funcionando. Base legal: legítimo interesse (art. 7º, IX, da LGPD).',
            ],
          },
        ],
      },
      {
        title: 'Cookies e ferramentas de medição',
        blocks: [
          {
            paragraph:
              'Ao abrir a página, nenhum cookie de medição ou publicidade é ativado. Um aviso pergunta se você aceita. Se você recusar, essas ferramentas continuam desligadas. Se aceitar, o Google Tag Manager pode carregar as ferramentas de medição configuradas para este site: [[listar as ferramentas do contêiner, por exemplo Google Analytics 4]].',
          },
          {
            paragraph:
              'Você pode mudar de ideia quando quiser: apague os dados do site no seu navegador e o aviso volta a aparecer. Os serviços do Google podem tratar dados em servidores fora do Brasil, e nesses casos a transferência segue o que a LGPD prevê. As fontes e o vídeo de apresentação são servidos pelo próprio site, sem serviços de terceiros.',
          },
        ],
      },
      {
        title: 'Compra da vaga e links externos',
        blocks: [
          {
            paragraph:
              'O botão “Garantir minha vaga” leva você à Asaas, plataforma onde o pagamento é feito, com cartão ou Pix. Os dados que você informar lá, como nome, documento e forma de pagamento, são tratados pela plataforma conforme a política de privacidade dela. Esta página não recebe nem guarda esses dados.',
          },
          {
            paragraph:
              '[[Confirmar se o organizador recebe os dados dos participantes e para quê, por exemplo lista de presença e contato sobre o evento, e descrever aqui.]]',
          },
          { paragraph: 'Os demais links, como o do Instagram, levam a sites que seguem as próprias políticas.' },
        ],
      },
      {
        title: 'Com quem os dados são compartilhados',
        blocks: [
          {
            paragraph:
              'Esta página não vende dados e só os compartilha com quem é necessário para funcionar: o Google, para a medição, se você aceitar; a Vercel, que hospeda o site; e a Asaas, quando você vai até a plataforma para comprar.',
          },
        ],
      },
      {
        title: 'Por quanto tempo os dados ficam guardados',
        blocks: [
          {
            list: [
              'Sua escolha sobre cookies fica no navegador até você apagá-la.',
              'Dados de medição: [[prazo de retenção configurado na ferramenta de medição]].',
              'Registros técnicos de acesso: conforme a política do provedor de hospedagem.',
            ],
          },
        ],
      },
      {
        title: 'Seus direitos',
        blocks: [
          { paragraph: 'A LGPD (art. 18) garante a você, em relação aos seus dados:' },
          {
            list: [
              'confirmar se eles são tratados e ter acesso a eles;',
              'corrigir dados incompletos, inexatos ou desatualizados;',
              'pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados fora da lei;',
              'pedir a portabilidade dos dados;',
              'pedir a eliminação dos dados tratados com o seu consentimento;',
              'saber com quem os dados são compartilhados;',
              'revogar o consentimento a qualquer momento.',
            ],
          },
          {
            paragraph:
              'Para exercer qualquer um desses direitos, escreva para [[e-mail de contato para assuntos de privacidade]]. Se a resposta não resolver, você pode registrar reclamação na Autoridade Nacional de Proteção de Dados (ANPD).',
          },
        ],
      },
      {
        title: 'Segurança',
        blocks: [
          {
            paragraph:
              'Esta página não tem banco de dados nem área de login, e é servida por conexão segura (HTTPS). Coletamos o mínimo necessário e não registramos dados sensíveis.',
          },
        ],
      },
      {
        title: 'Mudanças nesta política',
        blocks: [{ paragraph: 'Esta política pode ser atualizada. A data no início da página mostra a última revisão.' }],
      },
    ],
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
