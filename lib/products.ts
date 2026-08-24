import { Product, Testimonial, CategoryCard } from './types';

export const WHATSAPP_PHONE = '254762446006';
export const WHATSAPP_DISPLAY = '+254 762 446 006';
export const EMAIL_ADDRESS = 'pinkpulse254@gmail.com';
export const TIKTOK_HANDLE = '@pinkpulse254';
export const TIKTOK_URL = 'https://www.tiktok.com/@pinkpulse254';
export const INSTAGRAM_HANDLE = '@pinkpulse.ke';
export const INSTAGRAM_URL = 'https://www.instagram.com/pinkpulse.ke';

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'ladies-toys',
    title: 'LADIES TOYS',
    subtitle: 'Roses, Suction & Wands',
    imageUrl: '/products/the_original_rose_toy_1787511082867.jpg',
    count: 7,
  },
  {
    id: 'men-toys',
    title: 'MEN TOYS',
    subtitle: 'Prostate & Male Pleasure',
    imageUrl: '/products/vibrating_anal_plug_1787511222908.jpg',
    count: 2,
  },
  {
    id: 'lovense',
    title: 'COUPLES & WIRELESS',
    subtitle: 'App Control & Wearables',
    imageUrl: '/products/lume.png',
    count: 2,
  },
  {
    id: 'lubricants',
    title: 'LUBES & CARE',
    subtitle: 'Water-Based & Organic',
    imageUrl: '/products/intimate_lube_tube_1787511198808.jpeg',
    count: 2,
  },
  {
    id: 'dildos',
    title: 'DILDOS & GLASS',
    subtitle: 'Suction Cups & Real Feel',
    imageUrl: '/products/suction_base_massager_1787511501533.jpg.jpeg',
    count: 2,
  },
  {
    id: 'strap-on',
    title: 'STRAP ON',
    subtitle: 'Comfort Adjustable Harness Sets',
    imageUrl: '/products/strap_on_harness_kit_1787511464951.jpg',
    count: 1,
  },
  {
    id: 'anal-toys',
    title: 'ANAL TOYS',
    subtitle: 'Smart Plugs & Bullets',
    imageUrl: '/products/vibrating_anal_plug_1787511222908.jpg',
    count: 2,
  },
  {
    id: 'bondage',
    title: 'BONDAGE TOYS',
    subtitle: 'Restraints, Cuffs & Games',
    imageUrl: '/products/strap_on_harness_kit_1787511464951.jpg',
    count: 1,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'the-original-rose-toy',
    name: 'The Rose',
    tagline: 'Inspired by oral sensations with targeted suction & gentle pulses.',
    description: 'Inspired by oral sensations, The Rose combines targeted air-pulse suction and gentle vibrations to deliver precise clitoral delight. Made of silky medical-grade silicone for profound pleasure. Whisper quiet, magnetic fast charging, and 100% waterproof.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 2500,
    salePrice: 2000,
    rating: 4.9,
    reviewCount: 142,
    badge: 'bestseller',
    isBestseller: true,
    isRestocked: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 35,
    features: [
      'Targeted air-pulse petal suction with 10 intimacy frequencies',
      'Ultra-soft medical grade hypoallergenic silicone',
      'IPX7 100% Waterproof for bath or shower play',
      'Magnetic USB fast rechargeable (up to 90 min continuous play)',
      'Whisper quiet design (< 40dB)'
    ],
    specs: {
      material: 'Silky Medical-Grade Silicone + ABS',
      vibrationModes: '10 Suction Frequencies & Pulse Modes',
      waterproof: 'IPX7 Fully Submersible Waterproof',
      battery: 'Magnetic USB Fast Rechargeable',
      noiseLevel: 'Whisper Quiet (< 40 dB)',
      dimensions: '6.5cm x 5.8cm'
    },
    colors: [
      {
        name: 'Passion Red',
        hex: '#e11d48',
        imageUrl: '/products/the_original_rose_toy_1787511082867.jpg'
      },
      {
        name: 'Blush Pink',
        hex: '#f472b6',
        imageUrl: '/products/the_original_rose_toy_1787511082867.jpg'
      },
      {
        name: 'Velvet Black',
        hex: '#18181b',
        imageUrl: '/products/rose_toy_velvet_black_1787515251372.jpg'
      },
      {
        name: 'Royal Purple',
        hex: '#7e22ce',
        imageUrl: '/products/the_original_rose_toy_1787511082867.jpg'
      }
    ],
    mainImage: '/products/the_original_rose_toy_1787511082867.jpg',
    galleryImages: ['/products/the_original_rose_toy_1787511082867.jpg']
  },
  {
    id: 'rose-tongue-licking-toy',
    name: 'Rose Tongue – Licking Toy',
    tagline: 'Revolutionary rapid silicone tongue licking with powerful vibrations.',
    description: 'This right here is revolutionary! It features rapid rhythmic tongue licking with an addition of deep vibrations across multiple speed modes to deliver breathtaking, lifelike oral sensations.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 2500,
    rating: 4.9,
    reviewCount: 98,
    badge: 'hot',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 24,
    features: [
      'Rapid oscillating silicone tongue flutter for realistic oral sensation',
      '10 Pulse and flutter frequencies',
      'Soft matte finish with illuminated water-droplet icon',
      'IPX6 Water-resistant for easy warm-water cleaning',
      'Fast USB rechargeable battery'
    ],
    specs: {
      material: 'Silky Non-Porous Body-Safe Silicone',
      vibrationModes: '10 Licking & Vibration Frequencies',
      waterproof: 'IPX6 Water-Resistant',
      battery: 'USB Fast Rechargeable',
      noiseLevel: 'Quiet Motor (< 42 dB)',
      dimensions: '8.5cm x 6.0cm'
    },
    colors: [
      {
        name: 'Blush Pink',
        hex: '#f472b6',
        imageUrl: '/products/rose_tongue_blush_1787511115218.jpg'
      }
    ],
    mainImage: '/products/rose_tongue_blush_1787511115218.jpg',
    galleryImages: ['/products/rose_tongue_blush_1787511115218.jpg']
  },
  {
    id: 'two-in-one-rose-licking-thrusting',
    name: '2 in 1 Rose (Licking & Thrusting Vibrator)',
    tagline: 'Combines licking rose tongue, thrusting wand dildo & full vibrations.',
    description: 'It combines a licking tongue, a thrusting dildo, and full-body vibrations for ultimate pleasure. With 10 modes and medical-grade silicone, this dual-ended toy gives you simultaneous internal and external stimulation.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 3500,
    rating: 5.0,
    reviewCount: 76,
    badge: 'new',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 18,
    features: [
      'Dual stimulation: Rose suction/licking head + contoured thrusting wand',
      '10 Multi-speed vibration and automated kinetic thrusting patterns',
      'Velvety soft silicone connected by an ergonomic flexible bridge',
      'Rose gold metallic luxury finish',
      'USB magnetic fast charge'
    ],
    specs: {
      material: 'Medical-Grade Silicone + Rose Gold ABS',
      vibrationModes: '10 Licking Modes + 10 Thrusting Speeds',
      waterproof: 'IPX7 Waterproof',
      battery: 'Magnetic USB Fast Charging',
      noiseLevel: 'Discreet (< 45 dB)',
      dimensions: '21cm total length'
    },
    colors: [
      {
        name: 'Passion Red',
        hex: '#dc2626',
        imageUrl: '/products/two_in_one_rose_wand_1787511130571.jpg'
      }
    ],
    mainImage: '/products/two_in_one_rose_wand_1787511130571.jpg',
    galleryImages: ['/products/two_in_one_rose_wand_1787511130571.jpg']
  },
  {
    id: 'rabbit-vibrator-dual-stimulation',
    name: 'Rabbit Vibrator (Dual Stimulation)',
    tagline: 'Dual stimulation G-Spot silicone shaft with flexible clitoral rabbit ears.',
    description: 'Upgraded rabbit massager featuring dual stimulation motors: an internal sculpted G-spot shaft and flexible clitoral rabbit ears with 10 vibration frequencies.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 2500,
    rating: 4.9,
    reviewCount: 65,
    badge: 'sale',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 19,
    features: [
      'Dual independent stimulation: Internal G-spot shaft + external clitoral rabbit ears',
      '10 Powerful vibration patterns with simple push-button controls',
      'Soft flexible medical-grade silicone',
      'IPX7 Waterproof body for wet or dry enjoyment',
      'Fast USB charging'
    ],
    specs: {
      material: 'Medical-Grade Soft Silicone + ABS',
      vibrationModes: '10 Frequency Patterns',
      waterproof: 'IPX7 Waterproof',
      battery: 'USB Fast Rechargeable',
      noiseLevel: 'Quiet (< 45 dB)',
      dimensions: '20cm x 3.6cm'
    },
    colors: [
      {
        name: 'Orchid Purple & White',
        hex: '#9333ea',
        imageUrl: '/products/rabbit_vibrator_toy_1787511157415.jpg'
      },
      {
        name: 'Sky Blue & White',
        hex: '#38bdf8',
        imageUrl: '/products/rabbit_vibrator_toy_1787511157415.jpg'
      },
      {
        name: 'Blush Pink',
        hex: '#f472b6',
        imageUrl: '/products/rabbit_vibrator_pink_toy_1787515341191.jpg'
      }
    ],
    mainImage: '/products/rabbit_vibrator_toy_1787511157415.jpg',
    galleryImages: ['/products/rabbit_vibrator_toy_1787511157415.jpg', '/products/rabbit_vibrator_pink_toy_1787515341191.jpg']
  },
  {
    id: 'g-spot-vibrator-clit-dildo',
    name: 'G-Spot Vibrator Clit Dildo',
    tagline: 'High-frequency ergonomic wand with chrome control ring handle.',
    description: 'The massager is soft and comfortable, safe and non-toxic to use. Powerful high frequency vibration motor with 10 kinds of patterns. Its sculpted contour targets the G-spot effortlessly while the base ring offers full control.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 2500,
    salePrice: 2000,
    rating: 4.8,
    reviewCount: 53,
    badge: 'sale',
    isFeatured: true,
    inStock: true,
    stockQuantity: 22,
    features: [
      'Ergonomic G-curve head targets the sweet spot directly',
      '10 High-frequency pulse and vibration variations',
      'Metallic chrome oval base ring for ergonomic one-finger grip',
      'Waterproof design for easy sanitization and shower fun',
      'USB rechargeable with long-life battery'
    ],
    specs: {
      material: 'Body-Safe Silicone + Chrome Plated ABS',
      vibrationModes: '10 Vibration Frequencies',
      waterproof: 'IPX7 Submersible Waterproof',
      battery: 'USB Fast Rechargeable',
      noiseLevel: 'Quiet (< 42 dB)',
      dimensions: '19cm x 3.5cm'
    },
    colors: [
      {
        name: 'Royal Purple',
        hex: '#7e22ce',
        imageUrl: '/products/g_spot_contour_vibrator_1787511173002.jpg'
      }
    ],
    mainImage: '/products/g_spot_contour_vibrator_1787511173002.jpg',
    galleryImages: ['/products/g_spot_contour_vibrator_1787511173002.jpg']
  },
  {
    id: 'mini-wand-massager',
    name: 'Vibrator Wind Massager (mini)',
    tagline: 'Compact power with cushioned silicone head & textured grip.',
    description: 'A compact, handheld powerhouse wand engineered for deep, targeted vibrations and full-body tension release. Features a flexible cushioned silicone head, honeycomb anti-slip grip, and chrome finish.',
    category: 'ladies-toys',
    categoryLabel: 'Ladies Toys',
    price: 2500,
    salePrice: 2000,
    rating: 4.9,
    reviewCount: 82,
    badge: 'sale',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 26,
    features: [
      'Deep, rumbly motor with 10+ intense vibration modes and speeds',
      '360° Flexible cushioned honeycomb silicone head',
      'Ergonomic non-slip textured handle with 3 intuitive buttons',
      'Metallic chrome bottom cap for luxury aesthetic',
      'USB fast rechargeable'
    ],
    specs: {
      material: 'Pure Body-Safe Silicone + Chrome ABS',
      vibrationModes: '10 Vibration Speeds & Patterns',
      waterproof: 'Water-resistant & easy to wipe clean',
      battery: 'USB Fast Rechargeable',
      noiseLevel: 'Quiet (< 48 dB)',
      dimensions: '19.5cm x 4.0cm'
    },
    colors: [
      {
        name: 'Magenta Pink',
        hex: '#ec4899',
        imageUrl: '/products/mini_wand_massagers_1787511185321.jpg'
      },
      {
        name: 'Royal Purple',
        hex: '#7e22ce',
        imageUrl: '/products/mini_wand_massagers_1787511185321.jpg'
      },
      {
        name: 'Matte Black',
        hex: '#18181b',
        imageUrl: '/products/mini_wand_massagers_1787511185321.jpg'
      }
    ],
    mainImage: '/products/mini_wand_massagers_1787511185321.jpg',
    galleryImages: ['/products/mini_wand_massagers_1787511185321.jpg']
  },
  {
    id: 'silky-intimate-lubricant-50ml',
    name: 'Silky Intimate Lubricant (50ml)',
    tagline: 'Water-based hydrating glide, toy-safe and non-staining.',
    description: 'A premium, water-soluble gentle lubricant that enhances glide and sensitivity. Non-sticky, condom-safe, toy-friendly, and naturally hydrating for sensual pleasure. Washes off easily with warm water.',
    category: 'lubricants',
    categoryLabel: 'Lubes & Care',
    price: 700,
    salePrice: 650,
    rating: 4.9,
    reviewCount: 110,
    badge: 'sale',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 50,
    features: [
      '100% Body-safe, water-based hydrating formula',
      'Non-greasy, non-staining, and easy to wash off with warm water',
      'Safe with all silicone toys and latex condoms',
      'Gentle on sensitive skin with pH balance',
      'Compact 50ml travel-friendly tube'
    ],
    specs: {
      material: 'Purified Water, Plant Cellulose, Glycerin',
      vibrationModes: 'N/A',
      waterproof: 'Water-soluble',
      battery: 'N/A',
      noiseLevel: 'N/A',
      dimensions: '50ml / 1.7 fl oz'
    },
    colors: [
      {
        name: 'Classic Pure Hydration',
        hex: '#f43f5e',
        imageUrl: '/products/intimate_lube_tube_1787511198808.jpeg'
      }
    ],
    mainImage: '/products/intimate_lube_tube_1787511198808.jpeg',
    galleryImages: ['/products/intimate_lube_tube_1787511198808.jpeg']
  },
  {
    id: 'water-based-lube',
    name: 'Water-Based Lube',
    tagline: 'Smooth, lightweight water-based glide for everyday comfort.',
    description: 'A gentle water-based lubricant that is easy to wash off, toy-friendly, condom-safe, and suitable for comfortable everyday use.',
    category: 'lubricants',
    categoryLabel: 'Lubes & Care',
    price: 500,
    rating: 4.8,
    reviewCount: 24,
    badge: 'new',
    isFeatured: true,
    inStock: true,
    stockQuantity: 30,
    features: [
      'Water-based and easy to wash off',
      'Toy-safe and condom-compatible',
      'Smooth, non-sticky formula',
      'Gentle for sensitive skin',
      'Convenient everyday size'
    ],
    specs: {
      material: 'Water-Based Formula',
      vibrationModes: 'N/A',
      waterproof: 'Water-soluble',
      battery: 'N/A',
      noiseLevel: 'N/A',
      dimensions: 'Standard bottle'
    },
    colors: [
      {
        name: 'Classic Clear',
        hex: '#f5f5f4',
        imageUrl: '/products/water_based lube.jpeg'
      }
    ],
    mainImage: '/products/water_based lube.jpeg',
    galleryImages: ['/products/water_based lube.jpeg']
  },
  {
    id: 'lush-wearable-egg-vibrator',
    name: 'Lush Wearable Egg Vibrator',
    tagline: 'Luxury app-controlled G-curved egg vibrator for near or long-distance.',
    description: 'This luxury app-controlled, G-curved, wearable egg vibrator is designed to precisely hug your internal hot spots for solo or long-distance couples play. Connect with your partner anywhere in Kenya or worldwide via smartphone app.',
    category: 'lovense',
    categoryLabel: 'Couples & Wireless',
    price: 3500,
    salePrice: 3000,
    rating: 4.9,
    reviewCount: 88,
    badge: 'bestseller',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 20,
    features: [
      'Smartphone App control: Long-distance play, music sync, & partner touch control',
      'Ergonomic flexible curved tail for comfortable all-day wearable positioning',
      'Whisper-quiet motor for discreet public or bedroom play',
      'IPX7 100% Waterproof',
      'USB fast magnetic rechargeable'
    ],
    specs: {
      material: 'Silky Pure Medical-Grade Silicone',
      vibrationModes: 'Unlimited custom modes via Mobile App',
      waterproof: 'IPX7 Fully Submersible Waterproof',
      battery: 'USB Fast Rechargeable (2+ hrs continuous)',
      noiseLevel: 'Ultra Quiet (< 38 dB)',
      dimensions: '7.6cm x 3.4cm'
    },
    colors: [
      {
        name: 'Magenta Orchid',
        hex: '#d946ef',
        imageUrl: '/products/lume.png'
      }
    ],
    mainImage: '/products/lume.png',
    galleryImages: ['/products/lume.png']
  },
  {
    id: 'smart-vibrating-butt-plug',
    name: 'Smart Vibrating Butt Plug',
    tagline: 'Silicone tapered prostate & anal plug with wireless remote control.',
    description: 'Smart Anal Plug with APP Vibrator & Wireless Remote Control. Tapered smooth body with flared metallic base featuring DC magnetic charging, designed for prostate massage and deep sensory excitement.',
    category: 'men-toys',
    categoryLabel: 'Men Toys',
    price: 3500,
    salePrice: 3300,
    rating: 4.9,
    reviewCount: 41,
    badge: 'sale',
    isFeatured: true,
    inStock: true,
    stockQuantity: 16,
    features: [
      'Smooth tapered shape for effortless and comfortable insertion',
      'Wireless remote control & smartphone app connectivity',
      'Safe flared base with polished metallic chrome finish',
      'IPX7 100% Waterproof',
      'Magnetic DC fast recharge'
    ],
    specs: {
      material: 'Medical Silicone + Metallic Base',
      vibrationModes: '10 Frequency Patterns',
      waterproof: 'IPX7 Waterproof',
      battery: 'USB Fast Rechargeable',
      noiseLevel: 'Quiet (< 40 dB)',
      dimensions: '10.5cm x 3.2cm'
    },
    colors: [
      {
        name: 'Royal Purple & Chrome',
        hex: '#7c3aed',
        imageUrl: '/products/vibrating_anal_plug_1787511222908.jpg'
      }
    ],
    mainImage: '/products/vibrating_anal_plug_1787511222908.jpg',
    galleryImages: ['/products/vibrating_anal_plug_1787511222908.jpg']
  },
  {
    id: 'luxury-strap-on-harness-set',
    name: 'Luxury Strap-On Comfort Harness',
    tagline: 'Plush vegan leather & satin set with reinforced O-ring attachments.',
    description: 'Universal adjustable vegan leather & satin strap-on harness with secure O-ring attachments. Ergonomic, soft padded lining, and easy release metal buckles for couples adventure and solo harness play.',
    category: 'strap-on',
    categoryLabel: 'Strap On',
    price: 3000,
    rating: 4.8,
    reviewCount: 39,
    badge: 'new',
    isFeatured: true,
    inStock: true,
    stockQuantity: 14,
    features: [
      'Fully adjustable waist & thigh straps fitting sizes XS to XXL',
      'Plush padded interior preventing skin chafing',
      'Interchangeable O-rings compatible with all standard flared base dildos',
      'Heavy-duty rose gold metal hardware and quick snap buckles'
    ],
    specs: {
      material: 'Vegan Leather, Soft Satin & Alloy Hardware',
      vibrationModes: 'N/A',
      waterproof: 'Wipe clean',
      battery: 'N/A',
      noiseLevel: 'Silent',
      dimensions: 'Universal adjustable sizing'
    },
    colors: [
      {
        name: 'Noir Velvet & Rose Gold',
        hex: '#18181b',
        imageUrl: '/products/strap_on_harness_kit_1787511464951.jpg'
      }
    ],
    mainImage: '/products/strap_on_harness_kit_1787511464951.jpg',
    galleryImages: ['/products/strap_on_harness_kit_1787511464951.jpg']
  },
  {
    id: 'realistic-suction-cup-dildo',
    name: 'Realistic Suction-Cup Dildo',
    tagline: 'Dual-density lifelike silicone with ultra-strong suction base.',
    description: 'Lifelike ergonomic silicone dildo with strong hands-free suction-cup base that mounts firmly to any smooth flat surface (tiles, glass, chairs) or compatible strap-on harness. Soft outer layer with firm inner core.',
    category: 'dildos',
    categoryLabel: 'Dildos & Glass',
    price: 3000,
    rating: 4.9,
    reviewCount: 45,
    badge: 'hot',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 15,
    features: [
      'Heavy-duty suction cup base mounts securely to smooth surfaces & harness sets',
      'Realistic texture with anatomical contour and firm core',
      'Non-porous, hypoallergenic body-safe silicone',
      '100% Submersible waterproof and dishwasher safe for easy sanitization'
    ],
    specs: {
      material: '100% Body-Safe Medical Silicone',
      vibrationModes: 'Manual / Harness Compatible',
      waterproof: '100% Waterproof',
      battery: 'N/A',
      noiseLevel: 'Silent',
      dimensions: '18cm length, 4.0cm diameter'
    },
    colors: [
      {
        name: 'Warm Mocha Bronze',
        hex: '#854d0e',
        imageUrl: '/products/suction_base_massager_1787511501533.jpg.jpeg'
      }
    ],
    mainImage: '/products/suction_base_massager_1787511501533.jpg.jpeg',
    galleryImages: ['/products/suction_base_massager_1787511501533.jpg.jpeg']
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    customerName: 'Client Review (Nairobi West)',
    location: 'Nairobi West, Kenya',
    productName: 'The Rose',
    date: 'Aug 1, 2026',
    rating: 5,
    comment: 'Am in Nairobi West. The rider delivered super quickly via Bolt send! Package was completely sealed in plain dark envelope with no labels. I tried the rose for the first time and honestly words cannot explain 😂🔥 It is a 10/10!',
    type: 'whatsapp',
    verifiedBuyer: true
  },
  {
    id: 'rev-2',
    customerName: 'Verified Client',
    location: 'Kilimani, Nairobi',
    productName: 'Vibrator Wind Massager (mini)',
    date: 'Aug 11, 2026',
    rating: 5,
    comment: 'Received the purple wand and the vibration power is unmatched! Customer service on WhatsApp was so patient and friendly.',
    type: 'whatsapp',
    verifiedBuyer: true
  },
  {
    id: 'rev-3',
    customerName: 'Faith M.',
    location: 'Mombasa, Kenya',
    productName: 'Rose Tongue – Licking Toy',
    date: 'Aug 14, 2026',
    rating: 5,
    comment: 'Parcel sent via modern coast parcel office. Arrived next morning intact. Discreet packaging 100%! Definitely repurchasing the lubricant next week.',
    type: 'tiktok',
    verifiedBuyer: true
  },
  {
    id: 'rev-4',
    customerName: 'Couples Review',
    location: 'Westlands, Nairobi',
    productName: 'Lush Wearable Egg Vibrator',
    date: 'Aug 18, 2026',
    rating: 5,
    comment: 'We had so much fun with the app control while out for dinner! The connection worked flawlessly. Highly recommend Pink Pulse for any couple in Kenya.',
    type: 'whatsapp',
    verifiedBuyer: true
  }
];

export const KENYA_LOCATIONS = [
  { name: 'Nairobi CBD & Environs', fee: 200, eta: 'Same-Day (2-4 hrs)' },
  { name: 'Nairobi West / Kilimani / Westlands', fee: 250, eta: 'Same-Day (1-3 hrs)' },
  { name: 'Thika / Kiambu / Ruiru', fee: 350, eta: 'Same-Day (3-5 hrs)' },
  { name: 'Mombasa / Nyali', fee: 450, eta: 'Next-Day Parcel' },
  { name: 'Kisumu / Eldoret / Nakuru', fee: 400, eta: 'Next-Day Parcel' },
  { name: 'Countrywide Doorstep / Matatu Parcel', fee: 500, eta: '1 - 2 Business Days' }
];

export const FAQS = [
  {
    q: 'How discreet is the packaging?',
    a: '100% confidential. All orders are packed in pretty customised or plain white gift bags with zero product indicators, labels, or adult novelties mentioned anywhere on the bag.'
  },
  {
    q: 'How fast is delivery in Kenya?',
    a: 'For Nairobi orders, we offer Same-Day delivery within 1-4 hours via Bolt or dedicated riders. For upcountry towns (Mombasa, Kisumu, Nakuru, Eldoret, etc.), parcels are dispatched via trusted courier/matatu parcel services within 24 hours.'
  },
  {
    q: 'How do I pay?',
    a: 'We accept M-Pesa STK Push PIN prompts directly on your phone, Pay on Delivery for Nairobi residents, or direct WhatsApp order confirmations (+254 762 446 006).'
  },
  {
    q: 'Are the products authentic & body-safe?',
    a: 'Yes! All Pink Pulse objects are made of 100% non-porous, medical-grade, hypoallergenic silicone. They are phthalate-free, latex-free, and waterproof.'
  }
];
