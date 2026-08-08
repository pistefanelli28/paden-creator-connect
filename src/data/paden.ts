export type Niche =
  | "Gastronomia"
  | "Moda"
  | "Beleza"
  | "Fitness"
  | "Entretenimento"
  | "Lifestyle";

export const NICHES: Niche[] = [
  "Gastronomia",
  "Moda",
  "Beleza",
  "Fitness",
  "Entretenimento",
  "Lifestyle",
];

export const REGIONS = [
  "Jardins",
  "Pinheiros",
  "Vila Madalena",
  "Itaim Bibi",
  "Moema",
  "Vila Olímpia",
  "Perdizes",
  "Tatuapé",
];

export const FORMATS = ["Reels", "Stories", "TikTok", "YouTube Shorts", "Fotos"];

export type DealType = "Cachê" | "Permuta" | "Cachê + Permuta";

export type Creator = {
  id: string;
  name: string;
  age: number;
  region: string;
  niches: Niche[];
  followers: number;
  avgViews: number;
  engagement: number;
  audience: string;
  audienceCity: string;
  formats: string[];
  verified: boolean;
  metricsVerified: boolean;
  guardianStatus?: "pendente" | "verificado";
  feeMin: number;
  feeMax: number;
  acceptsBarter: boolean;
  acceptsMixed: boolean;
  partnerships: number;
  rating: number;
  reviews: number;
  activeRecently: boolean;
  bio: string;
  instagram: string;
  tiktok: string;
  email: string;
  portfolio: string[];
  boosted?: boolean;
};

export type Company = {
  id: string;
  name: string;
  segment: Niche;
  region: string;
  verified: boolean;
  rating: number;
  reviews: number;
  about: string;
  plan: "Grátis" | "Business" | "Business PRO";
  email: string;
  instagram: string;
  activeRecently: boolean;
};

export type Opportunity = {
  id: string;
  companyId: string;
  title: string;
  niche: Niche;
  region: string;
  slots: number;
  dealType: DealType;
  offerExact?: number;
  offerMin?: number;
  offerMax?: number;
  offerExtra?: string;
  deliverables: string;
  requirements: string[];
  preferences: string[];
  minFollowers: number;
  deadlineDays: number;
  description: string;
  exclusive?: boolean;
  boosted?: boolean;
  closed?: boolean;
  cover: string;
  candidates: number;
  newCandidates: number;
  matches: number;
};

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;
const shot = (seed: string) => `https://picsum.photos/seed/${seed}/500/500`;

export const creators: Creator[] = [
  {
    id: "c1",
    name: "Lucas Ferreira",
    age: 24,
    region: "Pinheiros",
    niches: ["Lifestyle", "Gastronomia"],
    followers: 18700,
    avgViews: 12400,
    engagement: 4.8,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Stories", "TikTok"],
    verified: true,
    metricsVerified: true,
    feeMin: 300,
    feeMax: 800,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 4,
    rating: 4.8,
    reviews: 3,
    activeRecently: true,
    bio: "Conteúdo de rotina em SP, restaurantes novos e cafeterias de bairro.",
    instagram: "@lucasferreira",
    tiktok: "@lucasferreira",
    email: "lucas@exemplo.com",
    portfolio: [shot("lucas1"), shot("lucas2"), shot("lucas3"), shot("lucas4")],
  },
  {
    id: "c2",
    name: "Marina Prado",
    age: 27,
    region: "Jardins",
    niches: ["Moda", "Beleza"],
    followers: 42300,
    avgViews: 25800,
    engagement: 3.9,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Fotos"],
    verified: true,
    metricsVerified: true,
    feeMin: 800,
    feeMax: 1800,
    acceptsBarter: false,
    acceptsMixed: true,
    partnerships: 9,
    rating: 4.9,
    reviews: 7,
    activeRecently: true,
    bio: "Moda autoral, looks do dia e achados de brechó em SP.",
    instagram: "@marinaprado",
    tiktok: "@marinaprado",
    email: "marina@exemplo.com",
    portfolio: [shot("marina1"), shot("marina2"), shot("marina3")],
    boosted: true,
  },
  {
    id: "c3",
    name: "Rafa Nogueira",
    age: 17,
    region: "Tatuapé",
    niches: ["Entretenimento"],
    followers: 9200,
    avgViews: 8100,
    engagement: 6.4,
    audience: "13–24 anos",
    audienceCity: "São Paulo",
    formats: ["TikTok", "Reels"],
    verified: false,
    metricsVerified: false,
    guardianStatus: "pendente",
    feeMin: 150,
    feeMax: 400,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 0,
    rating: 0,
    reviews: 0,
    activeRecently: true,
    bio: "Humor rápido e trends. Faço muito TikTok.",
    instagram: "@rafanogueira",
    tiktok: "@rafanogueira",
    email: "rafa@exemplo.com",
    portfolio: [shot("rafa1"), shot("rafa2")],
  },
  {
    id: "c4",
    name: "Bianca Souza",
    age: 22,
    region: "Vila Madalena",
    niches: ["Gastronomia", "Lifestyle"],
    followers: 15400,
    avgViews: 11200,
    engagement: 5.2,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Stories"],
    verified: true,
    metricsVerified: false,
    feeMin: 250,
    feeMax: 600,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 3,
    rating: 4.7,
    reviews: 3,
    activeRecently: true,
    bio: "Cafeterias, brunch e bares escondidos da Vila.",
    instagram: "@biancasouza",
    tiktok: "@biancasouza",
    email: "bianca@exemplo.com",
    portfolio: [shot("bia1"), shot("bia2"), shot("bia3")],
  },
  {
    id: "c5",
    name: "Diego Martins",
    age: 30,
    region: "Moema",
    niches: ["Fitness"],
    followers: 63800,
    avgViews: 39000,
    engagement: 3.4,
    audience: "25–44 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "YouTube Shorts"],
    verified: true,
    metricsVerified: true,
    feeMin: 1200,
    feeMax: 2500,
    acceptsBarter: false,
    acceptsMixed: false,
    partnerships: 12,
    rating: 4.6,
    reviews: 9,
    activeRecently: false,
    bio: "Treino, performance e nutrição prática.",
    instagram: "@diegomartins",
    tiktok: "@diegomartins",
    email: "diego@exemplo.com",
    portfolio: [shot("diego1"), shot("diego2"), shot("diego3")],
  },
  {
    id: "c6",
    name: "Yasmin Alves",
    age: 25,
    region: "Itaim Bibi",
    niches: ["Beleza", "Lifestyle"],
    followers: 28900,
    avgViews: 17600,
    engagement: 4.4,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Stories", "TikTok"],
    verified: true,
    metricsVerified: true,
    feeMin: 600,
    feeMax: 1400,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 6,
    rating: 4.9,
    reviews: 5,
    activeRecently: true,
    bio: "Skincare acessível e rotinas de beleza sem firula.",
    instagram: "@yasminalves",
    tiktok: "@yasminalves",
    email: "yasmin@exemplo.com",
    portfolio: [shot("yas1"), shot("yas2"), shot("yas3"), shot("yas4")],
  },
  {
    id: "c7",
    name: "Pedro Kimura",
    age: 29,
    region: "Perdizes",
    niches: ["Gastronomia"],
    followers: 11800,
    avgViews: 9400,
    engagement: 5.8,
    audience: "25–44 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Fotos"],
    verified: false,
    metricsVerified: false,
    feeMin: 200,
    feeMax: 500,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 2,
    rating: 4.5,
    reviews: 2,
    activeRecently: true,
    bio: "Comida japonesa, izakayas e cozinha de bairro.",
    instagram: "@pedrokimura",
    tiktok: "@pedrokimura",
    email: "pedro@exemplo.com",
    portfolio: [shot("pedro1"), shot("pedro2")],
  },
  {
    id: "c8",
    name: "Camila Rocha",
    age: 21,
    region: "Vila Olímpia",
    niches: ["Moda", "Entretenimento"],
    followers: 34500,
    avgViews: 22100,
    engagement: 4.1,
    audience: "18–24 anos",
    audienceCity: "São Paulo",
    formats: ["TikTok", "Reels"],
    verified: true,
    metricsVerified: false,
    feeMin: 700,
    feeMax: 1500,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 5,
    rating: 4.8,
    reviews: 4,
    activeRecently: true,
    bio: "Trends, looks e eventos da cidade.",
    instagram: "@camilarocha",
    tiktok: "@camilarocha",
    email: "camila@exemplo.com",
    portfolio: [shot("cami1"), shot("cami2"), shot("cami3")],
  },
  {
    id: "c9",
    name: "João Vitor Lima",
    age: 16,
    region: "Pinheiros",
    niches: ["Entretenimento", "Lifestyle"],
    followers: 7600,
    avgViews: 6900,
    engagement: 7.1,
    audience: "13–24 anos",
    audienceCity: "São Paulo",
    formats: ["TikTok"],
    verified: false,
    metricsVerified: false,
    guardianStatus: "verificado",
    feeMin: 120,
    feeMax: 350,
    acceptsBarter: true,
    acceptsMixed: false,
    partnerships: 1,
    rating: 5,
    reviews: 1,
    activeRecently: true,
    bio: "Skate, música e rolês em SP.",
    instagram: "@joaovitorlima",
    tiktok: "@joaovitorlima",
    email: "joao@exemplo.com",
    portfolio: [shot("joao1"), shot("joao2")],
  },
  {
    id: "c10",
    name: "Tatiana Reis",
    age: 33,
    region: "Jardins",
    niches: ["Lifestyle", "Beleza"],
    followers: 51200,
    avgViews: 30400,
    engagement: 3.2,
    audience: "25–44 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Stories"],
    verified: true,
    metricsVerified: true,
    feeMin: 1000,
    feeMax: 2200,
    acceptsBarter: false,
    acceptsMixed: true,
    partnerships: 11,
    rating: 4.7,
    reviews: 8,
    activeRecently: false,
    bio: "Maternidade real, casa e bem-estar.",
    instagram: "@tatianareis",
    tiktok: "@tatianareis",
    email: "tatiana@exemplo.com",
    portfolio: [shot("tati1"), shot("tati2"), shot("tati3")],
  },
  {
    id: "c11",
    name: "Gustavo Peixoto",
    age: 26,
    region: "Moema",
    niches: ["Fitness", "Gastronomia"],
    followers: 13300,
    avgViews: 10200,
    engagement: 5,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "TikTok"],
    verified: false,
    metricsVerified: true,
    feeMin: 250,
    feeMax: 700,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 2,
    rating: 4.4,
    reviews: 2,
    activeRecently: true,
    bio: "Bulking com sabor: treino + comida boa em SP.",
    instagram: "@gustavopeixoto",
    tiktok: "@gustavopeixoto",
    email: "gustavo@exemplo.com",
    portfolio: [shot("gus1"), shot("gus2"), shot("gus3")],
  },
  {
    id: "c12",
    name: "Isabela Duarte",
    age: 23,
    region: "Vila Madalena",
    niches: ["Beleza", "Moda"],
    followers: 22400,
    avgViews: 14800,
    engagement: 4.6,
    audience: "18–34 anos",
    audienceCity: "São Paulo",
    formats: ["Reels", "Stories", "Fotos"],
    verified: true,
    metricsVerified: true,
    feeMin: 500,
    feeMax: 1100,
    acceptsBarter: true,
    acceptsMixed: true,
    partnerships: 4,
    rating: 4.9,
    reviews: 4,
    activeRecently: true,
    bio: "Make colorida, unhas e moda criativa.",
    instagram: "@isabeladuarte",
    tiktok: "@isabeladuarte",
    email: "isabela@exemplo.com",
    portfolio: [shot("isa1"), shot("isa2"), shot("isa3"), shot("isa4")],
  },
];

export const companies: Company[] = [
  {
    id: "e1",
    name: "Burger House",
    segment: "Gastronomia",
    region: "Jardins",
    verified: true,
    rating: 4.8,
    reviews: 6,
    about: "Hamburgueria artesanal com 3 unidades em São Paulo.",
    plan: "Business PRO",
    email: "parcerias@burgerhouse.com.br",
    instagram: "@burgerhousesp",
    activeRecently: true,
  },
  {
    id: "e2",
    name: "Café Alameda",
    segment: "Gastronomia",
    region: "Pinheiros",
    verified: true,
    rating: 4.6,
    reviews: 4,
    about: "Cafeteria de especialidade e padaria natural.",
    plan: "Business",
    email: "contato@cafealameda.com.br",
    instagram: "@cafealameda",
    activeRecently: true,
  },
  {
    id: "e3",
    name: "Studio Corpo",
    segment: "Fitness",
    region: "Moema",
    verified: true,
    rating: 4.7,
    reviews: 5,
    about: "Studio de treino funcional e pilates.",
    plan: "Business",
    email: "marketing@studiocorpo.com.br",
    instagram: "@studiocorpo",
    activeRecently: false,
  },
  {
    id: "e4",
    name: "Loja Reverso",
    segment: "Moda",
    region: "Vila Madalena",
    verified: false,
    rating: 4.5,
    reviews: 3,
    about: "Marca de roupas autorais produzidas em SP.",
    plan: "Grátis",
    email: "oi@reverso.com.br",
    instagram: "@lojareverso",
    activeRecently: true,
  },
  {
    id: "e5",
    name: "Clínica Lumia",
    segment: "Beleza",
    region: "Itaim Bibi",
    verified: true,
    rating: 4.9,
    reviews: 7,
    about: "Estética avançada e skincare clínico.",
    plan: "Business PRO",
    email: "parcerias@lumia.com.br",
    instagram: "@clinicalumia",
    activeRecently: true,
  },
  {
    id: "e6",
    name: "Casa Vibe",
    segment: "Entretenimento",
    region: "Vila Olímpia",
    verified: true,
    rating: 4.4,
    reviews: 4,
    about: "Casa de shows e eventos autorais.",
    plan: "Business",
    email: "prod@casavibe.com.br",
    instagram: "@casavibe",
    activeRecently: true,
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "o1",
    companyId: "e1",
    title: "Lançamento Nova Unidade Jardins",
    niche: "Gastronomia",
    region: "Jardins",
    slots: 5,
    dealType: "Cachê",
    offerMin: 300,
    offerMax: 600,
    deliverables: "1 Reel + 2 Stories",
    requirements: ["Mora em São Paulo capital", "Mínimo 10 mil seguidores", "Nicho Gastronomia ou Lifestyle"],
    preferences: ["Público 18–34", "Já produziu conteúdo em restaurante"],
    minFollowers: 10000,
    deadlineDays: 12,
    description:
      "Convidamos creators para a inauguração da nossa unidade nos Jardins. Rolê com acompanhante, menu completo e registro do ambiente.",
    exclusive: true,
    boosted: true,
    cover: cover("burgerhouse"),
    candidates: 23,
    newCandidates: 7,
    matches: 3,
  },
  {
    id: "o2",
    companyId: "e2",
    title: "Nova linha de cafés de verão",
    niche: "Gastronomia",
    region: "Pinheiros",
    slots: 3,
    dealType: "Permuta",
    offerExtra: "Consumação livre para 2 pessoas + kit de grãos",
    deliverables: "2 Stories + 1 Carrossel",
    requirements: ["Mora em São Paulo capital", "Mínimo 5 mil seguidores"],
    preferences: ["Nicho Gastronomia", "Região Pinheiros ou Vila Madalena"],
    minFollowers: 5000,
    deadlineDays: 9,
    description: "Degustação da linha de verão com bebidas geladas e métodos filtrados.",
    cover: cover("cafealameda"),
    candidates: 14,
    newCandidates: 4,
    matches: 2,
  },
  {
    id: "o3",
    companyId: "e3",
    title: "Desafio 21 dias de treino",
    niche: "Fitness",
    region: "Moema",
    slots: 4,
    dealType: "Cachê + Permuta",
    offerExact: 400,
    offerExtra: "3 meses de plano ilimitado",
    deliverables: "3 Reels ao longo do desafio",
    requirements: ["Nicho Fitness", "Mínimo 10 mil seguidores"],
    preferences: ["Engajamento acima de 4%", "Região Moema ou Vila Olímpia"],
    minFollowers: 10000,
    deadlineDays: 20,
    description: "Creators acompanham o desafio e documentam evolução real.",
    cover: cover("studiocorpo"),
    candidates: 11,
    newCandidates: 2,
    matches: 1,
  },
  {
    id: "o4",
    companyId: "e4",
    title: "Coleção Inverno — looks autorais",
    niche: "Moda",
    region: "Vila Madalena",
    slots: 6,
    dealType: "Permuta",
    offerExtra: "2 peças da coleção (até R$700)",
    deliverables: "1 Reel + 3 Stories",
    requirements: ["Nicho Moda", "Mora em São Paulo capital"],
    preferences: ["Público feminino 18–34"],
    minFollowers: 8000,
    deadlineDays: 15,
    description: "Buscamos creators de moda para vestir a coleção de inverno.",
    cover: cover("reverso"),
    candidates: 19,
    newCandidates: 5,
    matches: 2,
  },
  {
    id: "o5",
    companyId: "e5",
    title: "Protocolo de skincare — antes e depois",
    niche: "Beleza",
    region: "Itaim Bibi",
    slots: 3,
    dealType: "Cachê",
    offerExact: 900,
    deliverables: "2 Reels + 4 Stories",
    requirements: ["Nicho Beleza", "Mínimo 20 mil seguidores", "Métricas verificadas"],
    preferences: ["Público 25–44"],
    minFollowers: 20000,
    deadlineDays: 25,
    description: "Sessões gratuitas e conteúdo documentando o protocolo em 60 dias.",
    exclusive: true,
    cover: cover("lumia"),
    candidates: 8,
    newCandidates: 1,
    matches: 1,
  },
  {
    id: "o6",
    companyId: "e6",
    title: "Festival Casa Vibe — cobertura",
    niche: "Entretenimento",
    region: "Vila Olímpia",
    slots: 8,
    dealType: "Cachê + Permuta",
    offerMin: 250,
    offerMax: 500,
    offerExtra: "2 ingressos + área VIP",
    deliverables: "Cobertura em Stories + 1 TikTok",
    requirements: ["Mora em São Paulo capital"],
    preferences: ["Nicho Entretenimento", "Forte no TikTok"],
    minFollowers: 5000,
    deadlineDays: 6,
    description: "Cobertura do festival de dois dias com line-up nacional.",
    boosted: true,
    cover: cover("casavibe"),
    candidates: 31,
    newCandidates: 9,
    matches: 4,
  },
  {
    id: "o7",
    companyId: "e1",
    title: "Combo duplo — divulgação de sábado",
    niche: "Gastronomia",
    region: "Moema",
    slots: 4,
    dealType: "Cachê + Permuta",
    offerExact: 250,
    offerExtra: "Jantar para 2",
    deliverables: "1 Reel",
    requirements: ["Mora em São Paulo capital", "Mínimo 8 mil seguidores"],
    preferences: ["Nicho Gastronomia ou Fitness"],
    minFollowers: 8000,
    deadlineDays: 10,
    description: "Divulgação do combo de sábado com foco em público de bairro.",
    cover: cover("burgerhouse2"),
    candidates: 16,
    newCandidates: 3,
    matches: 1,
  },
  {
    id: "o8",
    companyId: "e2",
    title: "Café da manhã de domingo",
    niche: "Gastronomia",
    region: "Perdizes",
    slots: 2,
    dealType: "Permuta",
    offerExtra: "Brunch completo para 2",
    deliverables: "3 Stories",
    requirements: ["Mora em São Paulo capital"],
    preferences: ["Nicho Lifestyle", "Região Perdizes"],
    minFollowers: 3000,
    deadlineDays: 8,
    description: "Registro do brunch de domingo no clima família.",
    cover: cover("brunch"),
    candidates: 9,
    newCandidates: 2,
    matches: 0,
  },
  {
    id: "o9",
    companyId: "e5",
    title: "Lançamento sérum vitamina C",
    niche: "Beleza",
    region: "Jardins",
    slots: 5,
    dealType: "Cachê",
    offerMin: 500,
    offerMax: 1200,
    deliverables: "1 Reel + 2 Stories",
    requirements: ["Nicho Beleza", "Mínimo 15 mil seguidores"],
    preferences: ["Engajamento acima de 4%"],
    minFollowers: 15000,
    deadlineDays: 18,
    description: "Lançamento do sérum com kit exclusivo enviado para casa.",
    cover: cover("serum"),
    candidates: 12,
    newCandidates: 4,
    matches: 2,
  },
  {
    id: "o10",
    companyId: "e3",
    title: "Aulão aberto no parque",
    niche: "Fitness",
    region: "Perdizes",
    slots: 6,
    dealType: "Permuta",
    offerExtra: "1 mês de plano + kit da marca",
    deliverables: "Cobertura em Stories",
    requirements: ["Mora em São Paulo capital"],
    preferences: ["Nicho Fitness ou Lifestyle"],
    minFollowers: 4000,
    deadlineDays: 0,
    closed: true,
    description: "Aulão gratuito ao ar livre com convidados.",
    cover: cover("aulao"),
    candidates: 21,
    newCandidates: 0,
    matches: 3,
  },
];

export const getCompany = (id: string) => companies.find((c) => c.id === id)!;
export const getCreator = (id: string) => creators.find((c) => c.id === id)!;
export const getOpportunity = (id: string) => opportunities.find((o) => o.id === id);

export const formatFollowers = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(".", ",")} mil` : String(n);

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function offerLabel(o: Opportunity) {
  const parts: string[] = [];
  if (o.offerExact) parts.push(formatBRL(o.offerExact));
  else if (o.offerMin && o.offerMax) parts.push(`${formatBRL(o.offerMin)}–${formatBRL(o.offerMax)}`);
  if (o.offerExtra) parts.push(o.offerExtra);
  return parts.join(" + ");
}

export type CompatReason = { ok: boolean; label: string };

export function compatibility(creator: Creator, o: Opportunity) {
  const reasons: CompatReason[] = [];
  const nicheOk = creator.niches.includes(o.niche);
  const regionOk = creator.region === o.region;
  const followersOk = creator.followers >= o.minFollowers;
  const engagementOk = creator.engagement >= 4;

  reasons.push({ ok: nicheOk, label: "Nicho compatível" });
  reasons.push({ ok: regionOk, label: "Localização compatível" });
  reasons.push({ ok: followersOk, label: "Faixa de seguidores compatível" });
  reasons.push({ ok: engagementOk, label: "Engajamento acima da média" });

  let score = 48;
  if (nicheOk) score += 24;
  if (regionOk) score += 12;
  else score += 6; // mesma cidade
  if (followersOk) score += 12;
  if (engagementOk) score += 6;
  if (creator.metricsVerified) score += 2;
  score = Math.max(41, Math.min(98, score));
  return { score, reasons };
}

/** Requisito obrigatório não cumprido bloqueia candidatura. */
export function blockingRequirements(creator: Creator, o: Opportunity) {
  const blocks: string[] = [];
  if (creator.followers < o.minFollowers)
    blocks.push(`Mínimo de ${formatFollowers(o.minFollowers)} seguidores`);
  if (o.requirements.some((r) => r.includes("Métricas verificadas")) && !creator.metricsVerified)
    blocks.push("Métricas verificadas");
  if (o.requirements.some((r) => r.startsWith("Nicho")) && !creator.niches.includes(o.niche))
    blocks.push(`Nicho ${o.niche}`);
  return blocks;
}
