import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "./pool.js";

dotenv.config();

const L = (en, ru, am) => ({ en, ru, am });
const productImage = "/products/plinth.png";
const productGallery = [
  productImage,
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
];

const colors = [
  { id: "white", name: L("Polar White", "Полярный белый", "Բևեռային սպիտակ"), hex: "#F7F7F4" },
  { id: "anthracite", name: L("Anthracite", "Антрацит", "Անտրացիտ"), hex: "#2B2F36" },
  { id: "oak", name: L("Natural Oak", "Натуральный дуб", "Բնական կաղնի"), hex: "#B8A07E" },
];

const textures = [
  { id: "matte", name: L("Matte", "Матовый", "Մատե"), mapUrl: "/textures/matte.jpg", previewUrl: productImage },
  { id: "satin", name: L("Satin", "Сатин", "Սատին"), mapUrl: "/textures/satin.jpg", previewUrl: productImage },
];

async function seed() {
  const passwordHash = await bcrypt.hash("admin", 10);

  await pool.query("SET FOREIGN_KEY_CHECKS = 0");
  for (const table of [
    "calculator_projects",
    "contact_messages",
    "media_assets",
    "blog_posts",
    "projects",
    "products",
    "collections",
    "categories",
    "certificates",
    "download_files",
    "site_settings",
    "users",
  ]) {
    try {
      await pool.query(`TRUNCATE TABLE ${table}`);
    } catch {
      /* table may not exist yet */
    }
  }
  await pool.query("SET FOREIGN_KEY_CHECKS = 1");

  try {
    await pool.query("ALTER TABLE categories ADD COLUMN parent_id CHAR(36) NULL");
  } catch {
    /* already exists */
  }

  await pool.query(
    `INSERT INTO users (id, name, email, password_hash, role) VALUES
      ('u-admin', 'Admin', 'admin@comfort.am', ?, 'admin'),
      ('u-editor', 'Editor', 'editor@comfort.am', ?, 'editor'),
      ('u-dealer', 'Dealer', 'dealer@comfort.am', ?, 'dealer')`,
    [passwordHash, passwordHash, passwordHash],
  );

  const categories = [
    ["cat-baseboards", "baseboards", L("Baseboards", "Плинтусы", "Սալիկներ"), L("Precision profiles that frame floors with quiet elegance.", "Точные профили, которые элегантно обрамляют пол.", "Ճշգրիտ պրոֆիլներ, որոնք նրբորեն շրջանակում են հատակը։"), null],
    ["cat-panels", "wall-panels", L("Pannels", "Панели", "Վահանակներ"), L("Sculptural 3D surfaces that transform architecture.", "Скульптурные 3D поверхности для архитектуры.", "Քանդակային 3D մակերեսներ ճարտարապետության համար։"), null],
    ["cat-3d-prof", "3d-prof", L("3D Prof", "3D Prof", "3D Prof"), L("3D professional wall panel profiles.", "Профессиональные 3D панели.", "3D պրոֆեսիոնալ պատի վահանակներ։"), "cat-panels"],
    ["cat-moldings", "moldings", L("Moldings", "Молдинги", "Մոլդինգներ"), L("Refined lines for classic and contemporary interiors.", "Изящные линии для классики и современности.", "Նրբագեղ գծեր դասական և ժամանակակից ինտերիերի համար։"), null],
    ["cat-profiles", "profiles", L("Profiles", "Профили", "Պրոֆիլներ"), L("Technical profiles with LED and finishing systems.", "Технические профили с LED и финишными системами.", "Տեխնիկական պրոֆիլներ LED և հարդարման համակարգերով։"), null],
    ["cat-accessories", "accessories", L("Accessories", "Аксессуары", "Աքսեսուարներ"), L("Corners, connectors and installation essentials.", "Углы, соединители и монтажные решения.", "Անկյուններ, միացումներ և մոնտաժման լուծումներ։"), null],
  ];

  for (const [id, slug, name, description, parentId] of categories) {
    await pool.query(
      "INSERT INTO categories (id, slug, name, description, image, parent_id) VALUES (?, ?, ?, ?, ?, ?)",
      [id, slug, JSON.stringify(name), JSON.stringify(description), productImage, parentId],
    );
  }

  const collections = [
    ["col-white", "white", L("White Collection", "Белая коллекция", "Սպիտակ հավաքածու"), L("Pure light surfaces for calm architecture.", "Чистые светлые поверхности.", "Մաքուր լուսավոր մակերեսներ։"), "minimal"],
    ["col-wood", "wood", L("Wood Collection", "Деревянная коллекция", "Փայտե հավաքածու"), L("Warm natural tones and tactile grain.", "Тёплые натуральные тона.", "Ջերմ բնական երանգներ։"), "natural"],
    ["col-modern", "modern", L("Modern Collection", "Современная коллекция", "Ժամանակակից հավաքածու"), L("Sharp geometry for contemporary spaces.", "Чёткая геометрия.", "Սուր երկրաչափություն։"), "modern"],
    ["col-classic", "classic", L("Classic Collection", "Классическая коллекция", "Դասական հավաքածու"), L("Timeless profiles with sculpted detail.", "Вечная классика.", "Անժամանակ դասական։"), "classic"],
    ["col-minimal", "minimal", L("Minimal Collection", "Минимальная коллекция", "Մինիմալ հավաքածու"), L("Quiet lines. Maximum presence.", "Тихие линии.", "Հանգիստ գծեր։"), "minimal"],
    ["col-natural", "natural", L("Natural Collection", "Натуральная коллекция", "Բնական հավաքածու"), L("Organic harmony for living interiors.", "Органическая гармония.", "Օրգանական ներդաշնակություն։"), "natural"],
  ];

  for (const [id, slug, name, description, style] of collections) {
    await pool.query(
      "INSERT INTO collections (id, slug, name, description, image, style) VALUES (?, ?, ?, ?, ?, ?)",
      [id, slug, JSON.stringify(name), JSON.stringify(description), productImage, style],
    );
  }

  const products = [
    ["p-md101", "plinth-md101", "MD-101", L("Plinth MD101", "Плинтус MD101", "Սալիկ MD101"), L("A refined flat baseboard with soft shadow line for contemporary interiors.", "Изящный плоский плинтус.", "Նրբագեղ հարթ սալիկ։"), "cat-baseboards", "col-modern", 80, 16, 16, 2400, 4200, 1],
    ["p-classic", "plinth-classic", "CL-080", L("Plinth Classic", "Плинтус Classic", "Սալիկ Classic"), L("Traditional curved profile with timeless proportion.", "Классический профиль.", "Դասական կոր պրոֆիլ։"), "cat-baseboards", "col-classic", 100, 18, 18, 2400, 4800, 1],
    ["p-modern", "plinth-modern", "MD-070", L("Plinth Modern", "Плинтус Modern", "Սալիկ Modern"), L("A simple rectangular block profile for contemporary interiors.", "Простой прямоугольный профиль.", "Պարզ ուղղանկյուն պրոֆիլ։"), "cat-baseboards", "col-modern", 70, 14, 14, 2400, 4100, 1],
    ["p-elegant", "plinth-elegant", "EL-090", L("Plinth Elegant", "Плинтус Elegant", "Սալիկ Elegant"), L("A profile with a smooth convex top curve.", "Профиль с мягкой выпуклой линией.", "Պրոֆիլ փափուկ գծով։"), "cat-baseboards", "col-classic", 90, 16, 16, 2400, 4500, 0],
    ["p-flat", "plinth-flat", "FL-060", L("Plinth Flat", "Плинтус Flat", "Սալիկ Flat"), L("Ultra-slim rectangular profile for minimal interiors.", "Ультратонкий прямоугольный профиль.", "Գերաբարակ ուղղանկյուն պրոֆիլ։"), "cat-baseboards", "col-minimal", 60, 12, 12, 2400, 3900, 0],
    ["p-panel-3d", "panel-fluted", "PN-3D-12", L("Fluted 3D Panel", "Фрезерованная 3D панель", "Փորագրված 3D վահանակ"), L("Vertical rhythm for feature walls.", "Вертикальный ритм для акцентов.", "Ուղղահայաց ռիթմ։"), "cat-3d-prof", "col-modern", 2800, 600, 18, 600, 18900, 1],
    ["p-molding-elegant", "molding-elegant", "ML-ELG", L("Molding Elegant", "Молдинг Elegant", "Մոլդինգ Elegant"), L("Soft convex framing for walls and ceilings.", "Мягкое обрамление стен.", "Փափուկ շրջանակ։"), "cat-moldings", "col-classic", 45, 20, 20, 2400, 3200, 0],
    ["p-molding-classic", "molding-classic", "ML-CL", L("Molding Classic", "Молдинг Classic", "Մոլդինգ Classic"), L("Elaborate decorative molding with multiple ridges.", "Декоративный молдинг.", "Դեկորատիվ մոլդինգ։"), "cat-moldings", "col-classic", 50, 22, 22, 2400, 3400, 0],
    ["p-molding-modern", "molding-modern", "ML-MD", L("Molding Modern", "Молдинг Modern", "Մոլդինգ Modern"), L("Stepped geometric profile with sharp lines.", "Геометрический профиль.", "Երկրաչափական պրոֆիլ։"), "cat-moldings", "col-modern", 40, 18, 18, 2400, 3100, 0],
    ["p-molding-flat", "molding-flat", "ML-FL", L("Molding Flat", "Молдинг Flat", "Մոլդինգ Flat"), L("A simple beveled profile for quiet detailing.", "Простой скошенный профиль.", "Պարզ թեք պրոֆիլ։"), "cat-moldings", "col-minimal", 28, 14, 14, 2400, 2800, 0],
    ["p-led-profile", "led-profile-lp20", "LP-20", L("LED Profile LP20", "LED профиль LP20", "LED պրոֆիլ LP20"), L("Integrated lighting channel for skirting.", "Световой канал.", "Լուսային ալիք։"), "cat-profiles", "col-modern", 60, 22, 22, 2000, 7600, 1],
    ["p-corner-set", "corner-accessory-set", "AC-COR-01", L("Corner Accessory Set", "Набор угловых аксессуаров", "Անկյունային աքսեսուարներ"), L("Inner and outer corners with matching connectors.", "Внутренние и внешние углы.", "Ներքին և արտաքին անկյուններ։"), "cat-accessories", "col-modern", 80, 16, 16, 80, 1800, 0],
  ];

  for (const p of products) {
    const [id, slug, sku, name, description, categoryId, collectionId, height, width, depth, length, price, featured] = p;
    await pool.query(
      `INSERT INTO products
        (id, slug, sku, name, description, category_id, collection_id, images, height, width, depth, length, material, finish, colors, textures, specs, downloads, price, featured, availability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'HD polymer', 'Matte', ?, ?, ?, '[]', ?, ?, 'in_stock')`,
      [
        id, slug, sku, JSON.stringify(name), JSON.stringify(description), categoryId, collectionId,
        JSON.stringify(productGallery), height, width, depth, length,
        JSON.stringify(colors), JSON.stringify(textures),
        JSON.stringify([{ key: "height", label: L("Height", "Высота", "Բարձրություն"), value: String(height), unit: "mm" }]),
        price, featured,
      ],
    );
  }

  await pool.query(
    `INSERT INTO projects (id, slug, title, description, location, year, images, before_image, after_image, product_ids, category)
     VALUES
     ('pr-1', 'yerevan-residence', ?, ?, ?, 2025, ?, ?, ?, ?, 'residential'),
     ('pr-2', 'cascade-hotel', ?, ?, ?, 2024, ?, NULL, NULL, ?, 'hospitality'),
     ('pr-3', 'studio-nord', ?, ?, ?, 2024, ?, NULL, NULL, ?, 'office')`,
    [
      JSON.stringify(L("Yerevan Residence", "Резиденция в Ереване", "Երևանյան նստավայր")),
      JSON.stringify(L("A quiet residential interior framed by Comfort MD profiles.", "Спокойный жилой интерьер.", "Հանգիստ բնակելի ինտերիեր։")),
      JSON.stringify(L("Yerevan, Armenia", "Ереван, Армения", "Երևան, Հայաստան")),
      JSON.stringify([productImage]), productImage, productImage, JSON.stringify(["p-md101", "p-panel-3d"]),
      JSON.stringify(L("Cascade Hotel Lobby", "Лобби отеля Cascade", "Cascade հյուրանոցի լոբբի")),
      JSON.stringify(L("Hospitality scale detailing with fluted panels.", "Детали hospitality.", "Hospitality դետալներ։")),
      JSON.stringify(L("Yerevan", "Ереван", "Երևան")),
      JSON.stringify([productImage]), JSON.stringify(["p-panel-3d", "p-led-profile"]),
      JSON.stringify(L("Studio Nord", "Студия Nord", "Studio Nord")),
      JSON.stringify(L("Minimal office with flat skirting.", "Минималистичный офис.", "Մինիմալիստական գրասենյակ։")),
      JSON.stringify(L("Moscow", "Москва", "Մոսկվա")),
      JSON.stringify([productImage]), JSON.stringify(["p-flat", "p-molding-elegant"]),
    ],
  );

  await pool.query(
    `INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, category, tags, author, published_at)
     VALUES
     ('b1', 'choosing-baseboard-height', ?, ?, ?, ?, 'design', ?, ?, '2026-03-12'),
     ('b2', '3d-panels-in-hospitality', ?, ?, ?, ?, 'projects', ?, ?, '2026-02-02')`,
    [
      JSON.stringify(L("Choosing the right baseboard height", "Как выбрать высоту плинтуса", "Ինչպես ընտրել սալիկի բարձրությունը")),
      JSON.stringify(L("Proportion, ceiling height and style cues.", "Пропорции и стиль.", "Համամասնություն և ոճ։")),
      JSON.stringify(L("Baseboard height defines the visual weight of a room.", "Высота плинтуса задаёт визуальный вес.", "Սալիկի բարձրությունը որոշում է ծանրությունը։")),
      productImage, JSON.stringify(["baseboards", "architecture"]),
      JSON.stringify({ id: "a1", name: "Anna Petrosyan", avatar: productImage, role: L("Design Lead", "Дизайн-лид", "Դիզայն ղեկավար") }),
      JSON.stringify(L("3D panels in hospitality interiors", "3D панели в hospitality", "3D վահանակներ hospitality-ում")),
      JSON.stringify(L("How fluted panels create memorable guest journeys.", "Как панели создают опыт.", "Ինչպես վահանակները ստեղծում են փորձ։")),
      JSON.stringify(L("Feature walls guide movement and absorb acoustics.", "Акцентные стены направляют движение.", "Շեշտային պատերը ուղղորդում են շարժումը։")),
      productImage, JSON.stringify(["panels", "hospitality"]),
      JSON.stringify({ id: "a2", name: "David Hakobyan", avatar: productImage, role: L("Architect Partner", "Архитектор-партнёр", "Ճարտարապետ գործընկեր") }),
    ],
  );

  await pool.query(
    `INSERT INTO media_assets (id, name, type, url, folder, size) VALUES
     ('m1', 'plinth.png', 'image', '/products/plinth.png', 'products', 240000)`,
  );

  await pool.query(
    `INSERT INTO certificates (id, title, issuer, year, file_url, image) VALUES
     ('cert-iso', ?, 'ISO', 2015, '/products/plinth.png', '/products/plinth.png'),
     ('cert-ce', ?, 'CE', 2022, '/products/plinth.png', '/products/plinth.png')`,
    [
      JSON.stringify(L("ISO 9001:2015", "ISO 9001:2015", "ISO 9001:2015")),
      JSON.stringify(L("CE Marking", "CE Marking", "CE Marking")),
    ],
  );

  await pool.query(
    `INSERT INTO download_files (id, filename, title, category, url, file_size, downloadable) VALUES
     ('dl-catalog', 'comfort-catalog.pdf', ?, 'catalogs', '/downloads/md101.pdf', '1.2 MB', 1),
     ('dl-template', 'order-template.docx', ?, 'templates', '/downloads/md101.pdf', '240 KB', 1)`,
    [
      JSON.stringify(L("Comfort catalog", "Каталог Comfort", "Comfort կատալոգ")),
      JSON.stringify(L("Order template", "Шаблон заказа", "Պատվերի ձևանմուշ")),
    ],
  );

  await pool.query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES ('contact', ?)`,
    [
      JSON.stringify({
        phones: ["+374 00 000000"],
        emails: ["info@comfort.am"],
        address: L("Yerevan, Armenia", "Ереван, Армения", "Երևան, Հայաստան"),
        hours: L("Mon–Sat 10:00–19:00", "Пн–Сб 10:00–19:00", "Երկ–Շբ 10:00–19:00"),
        socials: [
          { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/37400000000" },
          { id: "telegram", label: "Telegram", href: "https://t.me/comfort" },
          { id: "instagram", label: "Instagram", href: "https://instagram.com" },
        ],
        showrooms: [
          {
            id: "yerevan",
            name: "Yerevan Showroom",
            address: "15 Northern Ave, Yerevan, Armenia",
            hours: "Mon–Sat 10:00–19:00",
            phone: "+374 00 000000",
          },
        ],
      }),
    ],
  );

  console.log("Seed complete. Admin: admin@comfort.am / admin");
  await pool.end();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
