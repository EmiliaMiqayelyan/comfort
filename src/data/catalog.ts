import type { LocalizedString, Product, ProductCategory, Collection, Project, BlogPost } from "@/types";

const img = {
  hero1:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80",
  hero2:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
  hero3:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80",
  baseboard:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  panel:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
  molding:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  profile:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  accessory:
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80",
  living:
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=80",
  factory:
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
  project1:
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=80",
  project2:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
  project3:
    "https://images.unsplash.com/photo-1600573472591-ee6981cf4216?auto=format&fit=crop&w=1400&q=80",
  catalog:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=80",
  white:
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1000&q=80",
  wood:
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80",
  modern:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  classic:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80",
  minimal:
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80",
  natural:
    "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1000&q=80",
};

const L = (
  en: string,
  ru: string,
  am: string,
): LocalizedString => ({ en, ru, am });

export const categories: ProductCategory[] = [
  {
    id: "cat-baseboards",
    slug: "baseboards",
    name: L("Baseboards", "Плинтусы", "Սալիկներ"),
    description: L(
      "Precision profiles that frame floors with quiet elegance.",
      "Точные профили, которые элегантно обрамляют пол.",
      "Ճշգրիտ պրոֆիլներ, որոնք նրբորեն շրջանակում են հատակը։",
    ),
    image: img.baseboard,
    productCount: 48,
  },
  {
    id: "cat-panels",
    slug: "wall-panels",
    name: L("Wall panels", "Стеновые панели", "Պատի վահանակներ"),
    description: L(
      "Sculptural 3D surfaces that transform architecture.",
      "Скульптурные 3D поверхности для архитектуры.",
      "Քանդակային 3D մակերեսներ ճարտարապետության համար։",
    ),
    image: img.panel,
    productCount: 36,
  },
  {
    id: "cat-moldings",
    slug: "moldings",
    name: L("Moldings", "Молдинги", "Մոլդինգներ"),
    description: L(
      "Refined lines for classic and contemporary interiors.",
      "Изящные линии для классики и современности.",
      "Նրբագեղ գծեր դասական և ժամանակակից ինտերիերի համար։",
    ),
    image: img.molding,
    productCount: 42,
  },
  {
    id: "cat-profiles",
    slug: "profiles",
    name: L("Profiles", "Профили", "Պրոֆիլներ"),
    description: L(
      "Technical profiles with LED and finishing systems.",
      "Технические профили с LED и финишными системами.",
      "Տեխնիկական պրոֆիլներ LED և հարդարման համակարգերով։",
    ),
    image: img.profile,
    productCount: 28,
  },
  {
    id: "cat-accessories",
    slug: "accessories",
    name: L("Accessories", "Аксессуары", "Աքսեսուարներ"),
    description: L(
      "Corners, connectors and installation essentials.",
      "Углы, соединители и монтажные решения.",
      "Անկյուններ, միացումներ և մոնտաժման լուծումներ։",
    ),
    image: img.accessory,
    productCount: 64,
  },
];

export const collections: Collection[] = [
  {
    id: "col-white",
    slug: "white",
    name: L("White Collection", "Белая коллекция", "Սպիտակ հավաքածու"),
    description: L("Pure light surfaces for calm architecture.", "Чистые светлые поверхности.", "Մաքուր լուսավոր մակերեսներ։"),
    image: img.white,
    style: "minimal",
    productCount: 18,
  },
  {
    id: "col-wood",
    slug: "wood",
    name: L("Wood Collection", "Деревянная коллекция", "Փայտե հավաքածու"),
    description: L("Warm natural tones and tactile grain.", "Тёплые натуральные тона.", "Ջերմ բնական երանգներ։"),
    image: img.wood,
    style: "natural",
    productCount: 14,
  },
  {
    id: "col-modern",
    slug: "modern",
    name: L("Modern Collection", "Современная коллекция", "Ժամանակակից հավաքածու"),
    description: L("Sharp geometry for contemporary spaces.", "Чёткая геометрия.", "Սուր երկրաչափություն։"),
    image: img.modern,
    style: "modern",
    productCount: 22,
  },
  {
    id: "col-classic",
    slug: "classic",
    name: L("Classic Collection", "Классическая коллекция", "Դասական հավաքածու"),
    description: L("Timeless profiles with sculpted detail.", "Вечная классика.", "Անժամանակ դասական։"),
    image: img.classic,
    style: "classic",
    productCount: 16,
  },
  {
    id: "col-minimal",
    slug: "minimal",
    name: L("Minimal Collection", "Минимальная коллекция", "Մինիմալ հավաքածու"),
    description: L("Quiet lines. Maximum presence.", "Тихие линии.", "Հանգիստ գծեր։"),
    image: img.minimal,
    style: "minimal",
    productCount: 12,
  },
  {
    id: "col-natural",
    slug: "natural",
    name: L("Natural Collection", "Натуральная коллекция", "Բնական հավաքածու"),
    description: L("Organic harmony for living interiors.", "Органическая гармония.", "Օրգանական ներդաշնակություն։"),
    image: img.natural,
    style: "natural",
    productCount: 15,
  },
];

const colors = [
  { id: "white", name: L("Polar White", "Полярный белый", "Բևեռային սպիտակ"), hex: "#F7F7F4" },
  { id: "anthracite", name: L("Anthracite", "Антрацит", "Անտրացիտ"), hex: "#2B2F36" },
  { id: "oak", name: L("Natural Oak", "Натуральный дуб", "Բնական կաղնի"), hex: "#B PanA07E" },
];

// Fix oak hex - I made a typo
colors[2].hex = "#B8A07E";

const textures = [
  {
    id: "matte",
    name: L("Matte", "Матовый", "Մատե"),
    mapUrl: "/textures/matte.jpg",
    previewUrl: img.white,
  },
  {
    id: "satin",
    name: L("Satin", "Сатин", "Սատին"),
    mapUrl: "/textures/satin.jpg",
    previewUrl: img.minimal,
  },
];

export const products: Product[] = [
  {
    id: "p-md101",
    slug: "plinth-md101",
    sku: "MD-101",
    name: L("Plinth MD101", "Плинтус MD101", "Սալիկ MD101"),
    description: L(
      "A refined flat baseboard with soft shadow line for contemporary interiors.",
      "Изящный плоский плинтус с мягкой теневой линией для современных интерьеров.",
      "Նրբագեղ հարթ սալիկ փափուկ ստվերային գծով ժամանակակից ինտերիերի համար։",
    ),
    categoryId: "cat-baseboards",
    collectionId: "col-modern",
    images: [img.baseboard, img.hero1, img.living],
    height: 80,
    width: 16,
    depth: 16,
    length: 2400,
    material: "HD polymer",
    finish: "Matte lacquer",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "80", unit: "mm" },
      { key: "depth", label: L("Depth", "Глубина", "Խորություն"), value: "16", unit: "mm" },
      { key: "length", label: L("Length", "Длина", "Երկարություն"), value: "2400", unit: "mm" },
      { key: "material", label: L("Material", "Материал", "Նյութ"), value: "HD Polymer" },
      { key: "finish", label: L("Finish", "Покрытие", "Ծածկույթ"), value: "Matte" },
    ],
    downloads: [
      { id: "d1", type: "pdf", label: L("Technical sheet", "Техлист", "Տեխնիկական թերթիկ"), url: "/downloads/md101.pdf", size: "1.2 MB" },
      { id: "d2", type: "dwg", label: L("AutoCAD DWG", "AutoCAD DWG", "AutoCAD DWG"), url: "/downloads/md101.dwg", size: "340 KB" },
      { id: "d3", type: "bim", label: L("BIM object", "BIM объект", "BIM օբյեկտ"), url: "/downloads/md101.rfa", size: "2.1 MB" },
      { id: "d4", type: "3ds", label: L("3ds Max", "3ds Max", "3ds Max"), url: "/downloads/md101.max", size: "4.8 MB" },
    ],
    price: 4200,
    featured: true,
    availability: "in_stock",
  },
  {
    id: "p-classic",
    slug: "plinth-classic",
    sku: "CL-080",
    name: L("Plinth Classic", "Плинтус Classic", "Սալիկ Classic"),
    description: L("Traditional curved profile with timeless proportion.", "Классический профиль с вечными пропорциями.", "Դասական կոր պրոֆիլ անժամանակ համամասնությամբ։"),
    categoryId: "cat-baseboards",
    collectionId: "col-classic",
    images: [img.classic, img.hero2],
    height: 100,
    width: 18,
    depth: 18,
    length: 2400,
    material: "HD polymer",
    finish: "Satin",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "100", unit: "mm" },
      { key: "depth", label: L("Depth", "Глубина", "Խորություն"), value: "18", unit: "mm" },
      { key: "length", label: L("Length", "Длина", "Երկարություն"), value: "2400", unit: "mm" },
    ],
    downloads: [],
    price: 4800,
    featured: true,
    availability: "in_stock",
  },
  {
    id: "p-panel-3d",
    slug: "panel-fluted",
    sku: "PN-3D-12",
    name: L("Fluted 3D Panel", "Фрезерованная 3D панель", "Փորագրված 3D վահանակ"),
    description: L("Vertical rhythm for feature walls and hospitality spaces.", "Вертикальный ритм для акцентов и hospitality.", "Ուղղահայաց ռիթմ շեշտային պատերի համար։"),
    categoryId: "cat-panels",
    collectionId: "col-modern",
    images: [img.panel, img.living],
    height: 2800,
    width: 600,
    depth: 18,
    length: 600,
    material: "MDF / Polymer",
    finish: "Paint ready",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "2800", unit: "mm" },
      { key: "width", label: L("Width", "Ширина", "Լայնություն"), value: "600", unit: "mm" },
    ],
    downloads: [],
    price: 18900,
    featured: true,
    availability: "in_stock",
  },
  {
    id: "p-molding-elegant",
    slug: "molding-elegant",
    sku: "ML-ELG",
    name: L("Molding Elegant", "Молдинг Elegant", "Մոլդինգ Elegant"),
    description: L("Soft convex framing for walls and ceilings.", "Мягкое обрамление стен и потолков.", "Փափուկ շրջանակ պատերի և առաստաղների համար։"),
    categoryId: "cat-moldings",
    collectionId: "col-classic",
    images: [img.molding, img.classic],
    height: 45,
    width: 20,
    depth: 20,
    length: 2400,
    material: "HD polymer",
    finish: "Matte",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "45", unit: "mm" },
    ],
    downloads: [],
    price: 3200,
    availability: "in_stock",
  },
  {
    id: "p-led-profile",
    slug: "led-profile-lp20",
    sku: "LP-20",
    name: L("LED Profile LP20", "LED профиль LP20", "LED պրոֆիլ LP20"),
    description: L("Integrated lighting channel for skirting and wall detailing.", "Световой канал для плинтусов и акцентов.", "Լուսային ալիք սալիկների և շեշտերի համար։"),
    categoryId: "cat-profiles",
    collectionId: "col-modern",
    images: [img.profile, img.hero3],
    height: 60,
    width: 22,
    depth: 22,
    length: 2000,
    material: "Aluminum / Polymer",
    finish: "Anodized",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "60", unit: "mm" },
    ],
    downloads: [],
    price: 7600,
    featured: true,
    availability: "limited",
  },
  {
    id: "p-flat",
    slug: "plinth-flat",
    sku: "FL-060",
    name: L("Plinth Flat", "Плинтус Flat", "Սալիկ Flat"),
    description: L("Ultra-slim rectangular profile for minimal interiors.", "Ультратонкий прямоугольный профиль.", "Գերաբարակ ուղղանկյուն պրոֆիլ։"),
    categoryId: "cat-baseboards",
    collectionId: "col-minimal",
    images: [img.minimal, img.baseboard],
    height: 60,
    width: 12,
    depth: 12,
    length: 2400,
    material: "HD polymer",
    finish: "Matte",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "60", unit: "mm" },
    ],
    downloads: [],
    price: 3900,
    availability: "in_stock",
  },
  {
    id: "p-corner-set",
    slug: "corner-accessory-set",
    sku: "AC-COR-01",
    name: L("Corner Accessory Set", "Набор угловых аксессуаров", "Անկյունային աքսեսուարների հավաքածու"),
    description: L(
      "Inner and outer corners with matching connectors for clean installation.",
      "Внутренние и внешние углы с соединителями для чистого монтажа.",
      "Ներքին և արտաքին անկյուններ՝ մաքուր մոնտաժման համար։",
    ),
    categoryId: "cat-accessories",
    collectionId: "col-modern",
    images: [img.accessory, img.baseboard],
    height: 80,
    width: 16,
    depth: 16,
    length: 80,
    material: "HD polymer",
    finish: "Matte",
    colors,
    textures,
    specs: [
      { key: "height", label: L("Height", "Высота", "Բարձրություն"), value: "80", unit: "mm" },
      { key: "material", label: L("Material", "Материал", "Նյութ"), value: "HD Polymer" },
    ],
    downloads: [],
    price: 1800,
    availability: "in_stock",
  },
];

export const projects: Project[] = [
  {
    id: "pr-1",
    slug: "yerevan-residence",
    title: L("Yerevan Residence", "Резиденция в Ереване", "Երևանյան նստավայր"),
    description: L("A quiet residential interior framed by Comfort MD profiles.", "Спокойный жилой интерьер с профилями Comfort.", "Հանգիստ բնակելի ինտերիեր Comfort պրոֆիլներով։"),
    location: L("Yerevan, Armenia", "Ереван, Армения", "Երևան, Հայաստան"),
    year: 2025,
    images: [img.project1, img.living, img.hero1],
    beforeImage: img.hero2,
    afterImage: img.project1,
    products: ["p-md101", "p-panel-3d"],
    category: "residential",
  },
  {
    id: "pr-2",
    slug: "cascade-hotel",
    title: L("Cascade Hotel Lobby", "Лобби отеля Cascade", "Cascade հյուրանոցի լոբբի"),
    description: L("Hospitality scale detailing with fluted panels and LED profiles.", "Детали hospitality с панелями и LED.", "Hospitality դետալներ վահանակներով և LED։"),
    location: L("Yerevan", "Ереван", "Երևան"),
    year: 2024,
    images: [img.project2, img.panel],
    products: ["p-panel-3d", "p-led-profile"],
    category: "hospitality",
  },
  {
    id: "pr-3",
    slug: "studio-nord",
    title: L("Studio Nord", "Студия Nord", "Studio Nord"),
    description: L("Minimal office with flat skirting and soft moldings.", "Минималистичный офис.", "Մինիմալիստական գրասենյակ։"),
    location: L("Moscow", "Москва", "Մոսկվա"),
    year: 2024,
    images: [img.project3, img.minimal],
    products: ["p-flat", "p-molding-elegant"],
    category: "office",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "choosing-baseboard-height",
    title: L("Choosing the right baseboard height", "Как выбрать высоту плинтуса", "Ինչպես ընտրել սալիկի բարձրությունը"),
    excerpt: L("Proportion, ceiling height and style cues that guide elegant detailing.", "Пропорции, высота потолка и стиль.", "Համամասնություն, առաստաղի բարձրություն և ոճ։"),
    content: L(
      "Baseboard height defines the visual weight of a room. In contemporary spaces, 60–80 mm keeps lines quiet. Classic rooms often prefer 100–140 mm for presence.",
      "Высота плинтуса задаёт визуальный вес комнаты.",
      "Սալիկի բարձրությունը որոշում է սենյակի տեսողական ծանրությունը։",
    ),
    coverImage: img.baseboard,
    category: "design",
    tags: ["baseboards", "architecture"],
    author: {
      id: "a1",
      name: "Anna Petrosyan",
      avatar: img.living,
      role: L("Design Lead", "Дизайн-лид", "Դիզայն ղեկավար"),
    },
    publishedAt: "2026-03-12",
  },
  {
    id: "b2",
    slug: "3d-panels-in-hospitality",
    title: L("3D panels in hospitality interiors", "3D панели в hospitality", "3D վահանակներ hospitality-ում"),
    excerpt: L("How fluted and geometric panels create memorable guest journeys.", "Как панели создают запоминающийся опыт.", "Ինչպես վահանակները ստեղծում են հիշարժան փորձ։"),
    content: L("Feature walls guide movement and absorb acoustics while elevating brand identity.", "Акцентные стены направляют движение.", "Շեշտային պատերը ուղղորդում են շարժումը։"),
    coverImage: img.panel,
    category: "projects",
    tags: ["panels", "hospitality"],
    author: {
      id: "a2",
      name: "David Hakobyan",
      avatar: img.factory,
      role: L("Architect Partner", "Архитектор-партнёр", "Ճարտարապետ գործընկեր"),
    },
    publishedAt: "2026-02-02",
  },
];

export const heroSlides = [
  {
    id: 1,
    image: img.hero1,
    videoPoster: img.hero1,
  },
  {
    id: 2,
    image: img.hero2,
    videoPoster: img.hero2,
  },
  {
    id: 3,
    image: img.hero3,
    videoPoster: img.hero3,
  },
];

export const roomPresets = [
  { id: "living-warm", name: L("Warm Living", "Тёплая гостиная", "Ջերմ հյուրասենյակ"), image: img.living },
  { id: "gallery-white", name: L("White Gallery", "Белая галерея", "Սպիտակ պատկերասրահ"), image: img.white },
  { id: "wood-suite", name: L("Wood Suite", "Деревянный suite", "Փայտե suite"), image: img.wood },
];

export const siteImages = img;

export function getLocalized<T extends LocalizedString>(value: T, locale: string) {
  if (locale in value) return value[locale as keyof LocalizedString];
  return value.en;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsByCollection(collectionId: string) {
  return products.filter((p) => p.collectionId === collectionId);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.collectionId === product.collectionId))
    .slice(0, limit);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
