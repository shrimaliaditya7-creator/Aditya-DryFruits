// ─── Category definitions ───────────────────────────────────
export const CATEGORIES = {
  nuts:      { label: 'Nuts',       img: 'https://images.unsplash.com/photo-1607113256158-56a934936ef9?w=300&q=80', color: '#fef9c3' },
  dryfruits: { label: 'Dry Fruits', img: 'https://images.unsplash.com/photo-1611575619048-37e7f898ef60?w=300&q=80', color: '#fce7f3' },
  seeds:     { label: 'Seeds',      img: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=300&q=80', color: '#dcfce7' },
  makhana:   { label: 'Makhana',    img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&q=80', color: '#f0f9ff' },
  flavoured: { label: 'Flavoured',  img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&q=80', color: '#fff7ed' },
  health:    { label: 'Health',     img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&q=80', color: '#f0fdf4' },
  snacks:    { label: 'Snacks',     img: 'https://images.unsplash.com/photo-1517093728584-0c8b02261d88?w=300&q=80', color: '#fef3c7' },
  spices:    { label: 'Spices',     img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80', color: '#fdf4ff' },
}

// ─── Image mapping ───────────────────────────────────────────
const IMG = {
  almond:     'https://images.unsplash.com/photo-1508061942611-df313e18c7a1?w=400&q=80&fit=crop',
  cashew:     'https://images.unsplash.com/photo-1607113256158-56a934936ef9?w=400&q=80&fit=crop',
  walnut:     'https://images.unsplash.com/photo-1572995533280-8a765fae3c8d?w=400&q=80&fit=crop',
  pistachio:  'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=400&q=80&fit=crop',
  raisin:     'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80&fit=crop',
  date:       'https://images.unsplash.com/photo-1611575619048-37e7f898ef60?w=400&q=80&fit=crop',
  fig:        'https://images.unsplash.com/photo-1601493700631-2851bdff2bfc?w=400&q=80&fit=crop',
  makhana:    'https://images.unsplash.com/photo-1630409346824-4f2a6a2d5a5e?w=400&q=80&fit=crop',
  seed:       'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&q=80&fit=crop',
  chia:       'https://images.unsplash.com/photo-1511909525232-61113c912358?w=400&q=80&fit=crop',
  sunflower:  'https://images.unsplash.com/photo-1585378882523-a674f28c1875?w=400&q=80&fit=crop',
  pumpkin:    'https://images.unsplash.com/photo-1602777924123-8888ee4e6e67?w=400&q=80&fit=crop',
  mango:      'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400&q=80&fit=crop',
  cranberry:  'https://images.unsplash.com/photo-1596591406635-4e37d8f51f4d?w=400&q=80&fit=crop',
  blueberry:  'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80&fit=crop',
  strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80&fit=crop',
  cherry:     'https://images.unsplash.com/photo-1528821154435-9b037ad2a38d?w=400&q=80&fit=crop',
  kiwi:       'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&q=80&fit=crop',
  coconut:    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=80&fit=crop',
  chocolate:  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80&fit=crop',
  oats:       'https://images.unsplash.com/photo-1517093728584-0c8b02261d88?w=400&q=80&fit=crop',
  millet:     'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80&fit=crop',
  spice:      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80&fit=crop',
  mix:        'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80&fit=crop',
  default:    'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&q=80&fit=crop',
}

function img(name) {
  const n = name.toLowerCase()
  if (n.includes('almond') || n.includes('badam'))             return IMG.almond
  if (n.includes('cashew') || n.includes('kaju'))              return IMG.cashew
  if (n.includes('walnut') || n.includes('akharod'))           return IMG.walnut
  if (n.includes('pista'))                                     return IMG.pistachio
  if (n.includes('raisin') || n.includes('kishmish') || n.includes('munnka')) return IMG.raisin
  if (n.includes('dates') || n.includes('khajur') || n.includes('medjoul') || n.includes('kharik')) return IMG.date
  if (n.includes('anjeer') || n.includes('fig'))               return IMG.fig
  if (n.includes('makhana'))                                   return IMG.makhana
  if (n.includes('chia'))                                      return IMG.chia
  if (n.includes('sunflower'))                                 return IMG.sunflower
  if (n.includes('pumpkin') || n.includes('pumkin'))           return IMG.pumpkin
  if (n.includes('seed'))                                      return IMG.seed
  if (n.includes('mango'))                                     return IMG.mango
  if (n.includes('cranberry'))                                 return IMG.cranberry
  if (n.includes('blueberry'))                                 return IMG.blueberry
  if (n.includes('strawberry'))                                return IMG.strawberry
  if (n.includes('cherry'))                                    return IMG.cherry
  if (n.includes('kiwi'))                                      return IMG.kiwi
  if (n.includes('coconut'))                                   return IMG.coconut
  if (n.includes('chocolate') || n.includes('choco'))         return IMG.chocolate
  if (n.includes('oats'))                                      return IMG.oats
  if (n.includes('millet'))                                    return IMG.millet
  if (n.includes('mix') || n.includes('cocktail'))            return IMG.mix
  if (n.includes('masala') || n.includes('saunf') || n.includes('elaichi') || n.includes('hing') || n.includes('ajwain') || n.includes('thandai')) return IMG.spice
  return IMG.default
}

// ─── Raw data [name, price, category] ────────────────────────
const RAW = [
  ['AJWAIN 250GM', 110, 'spices'],
  ['AKHAROD GIRI 250GM', 450, 'nuts'],
  ['ALMOND DIVYAM 250GM', 270, 'nuts'],
  ['Almond Divyam (Big)', 285, 'nuts'],
  ['ALMOND MUKHWAS 250GM', 245, 'nuts'],
  ['ALMOND UTTAM 250GM', 240, 'nuts'],
  ['ANJEER PARAM 250GM', 495, 'dryfruits'],
  ['BADI ELAICHI 100GM', 280, 'spices'],
  ['BLACK PEPPER ALMOND 200GM', 240, 'flavoured'],
  ['BLACK PEPPER AMLA', 120, 'health'],
  ['BLACK PEPPER CASHEW 200GM', 280, 'flavoured'],
  ['BLACK PEPPER MAKHANA 70G', 195, 'makhana'],
  ['BLACK RAISINS 250GM', 160, 'dryfruits'],
  ['BLUEBERRY (WITHOUT SUGAR) 200GM', 380, 'dryfruits'],
  ['BREAKFAST KHATTA MEETHA 250GM', 220, 'snacks'],
  ['Cashew Loose', 980, 'nuts'],
  ['CASHEW ROASTED 200GM', 280, 'nuts'],
  ['CASHEW SHRESTH 250GM', 270, 'nuts'],
  ['CASHEW UTTAM 250GM', 295, 'nuts'],
  ['CHAROLI 100GM', 230, 'nuts'],
  ['CHERRY 250GM', 220, 'dryfruits'],
  ['CHIA LITCHI ALMOND 200GM', 240, 'flavoured'],
  ['CHIA SEEDS 250GM', 120, 'seeds'],
  ['CHOCOLATE OATS BAR', 220, 'snacks'],
  ['CHOCOROSE PETAL ALMOND 200GM', 240, 'flavoured'],
  ['CHOTI ELAICHI 50GM', 200, 'spices'],
  ['COCONUT POWDER 250GM', 120, 'health'],
  ['CRANBERRY 250GM', 240, 'dryfruits'],
  ['DARK CHOCOLATE ALMOND 250GM', 240, 'flavoured'],
  ['Dates Medjoul Supper Jumbo', 440, 'dryfruits'],
  ['DATES SHREESTH 250GM', 120, 'dryfruits'],
  ['DATES UTTAM 250GM', 140, 'dryfruits'],
  ['DRY STRAWBERRY (WITHOUT SUGAR) 200GM', 290, 'dryfruits'],
  ['FRUIT COCKTAIL 250GM', 195, 'dryfruits'],
  ['GIRI', 375, 'nuts'],
  ['GOND 250GM', 220, 'health'],
  ['GUAVA 250GM', 220, 'dryfruits'],
  ['HING 10GM', 350, 'spices'],
  ['IRANI MAMRA (AMOOLYA)', 880, 'nuts'],
  ['IRANI MAMRA (SARVOTTAM)', 760, 'nuts'],
  ['JAMUN 100GM', 380, 'dryfruits'],
  ['KALA KHATTA RAISINS 250GM', 195, 'flavoured'],
  ['KESAR KULFI ALMOND 200GM', 240, 'flavoured'],
  ['KESAR MILK MASALA 100GM', 240, 'spices'],
  ['KESAR THANDAI ALMOND 200GM', 240, 'flavoured'],
  ['KHAJUR 500GM', 75, 'dryfruits'],
  ['Kharik Loose', 280, 'dryfruits'],
  ['KIWI 250GM', 195, 'dryfruits'],
  ['KUNAFA BISCOFF', 290, 'snacks'],
  ['KUNAFA HAZELNUT 200GM', 290, 'snacks'],
  ['MAKHANA BOLD', 420, 'makhana'],
  ['MAKHANA DIVYAM 250GM', 395, 'makhana'],
  ['MAKHANA UTTAM', 345, 'makhana'],
  ['MANGO 250GM', 195, 'dryfruits'],
  ['MANGO CASHEW 200GM', 280, 'flavoured'],
  ['Mango Cashew Loose 100GM', 130, 'flavoured'],
  ['MEETHA AMLA', 100, 'health'],
  ['Milk Chocolate Cashew 100GM', 130, 'flavoured'],
  ['MILK CHOCOLATE CASHEW 200GM', 280, 'flavoured'],
  ['MILLET MIX 250GM', 140, 'snacks'],
  ['MILLET PUDINA 250GM', 180, 'snacks'],
  ['MILLET THAI CHILLI 250GM', 180, 'snacks'],
  ['MIX OF 10 DRY FRUITS 200GM', 290, 'dryfruits'],
  ['MIX OF 5 SEEDS 250GM', 195, 'seeds'],
  ['MIXED BERRY 200GM', 280, 'dryfruits'],
  ['MOCHA ALMOND 200GM', 240, 'flavoured'],
  ['MOSAMBI 250GM', 195, 'dryfruits'],
  ['MUNNKA PARAM 250GM', 270, 'dryfruits'],
  ['MUNNKA SHRESTH', 220, 'dryfruits'],
  ['NAMKEEN AMLA', 80, 'health'],
  ['OATS BAR 200GM', 220, 'snacks'],
  ['PAAN RAISINS', 195, 'flavoured'],
  ['PERI PERI ALMOND 250GM', 295, 'flavoured'],
  ['PISTA (SALTED) AMOOLYA 250GM', 370, 'nuts'],
  ['PISTA DIVYAM (AKHABARI)', 495, 'nuts'],
  ['PREMIUM KUNAFA TRAY', 495, 'snacks'],
  ['PROTEIN BEANS 250GM', 195, 'health'],
  ['PROTEIN BOOSTER 250GM', 195, 'health'],
  ['PUDINA MAKHANA 70G', 195, 'makhana'],
  ['PUMPKIN SEEDS 250GM', 145, 'seeds'],
  ['RAISINS 250GM', 160, 'dryfruits'],
  ['ROASTED ALMOND 250GM', 295, 'nuts'],
  ['ROASTED MIX DRYFRUITS (SALTED) 200GM', 280, 'dryfruits'],
  ['ROASTED MIX SEEDS 200GM', 145, 'seeds'],
  ['ROSE RAISINS 250GM', 195, 'flavoured'],
  ['SAHI NUT MIX 250GM', 220, 'nuts'],
  ['SALTED MUESLI 250GM', 195, 'snacks'],
  ['SAUNF BARIK 250GM', 110, 'spices'],
  ['SAUNF MOTI 250GM', 110, 'spices'],
  ['SUNFLOWER SEEDS 250GM', 95, 'seeds'],
  ['THAI CHILLI CASHEW 200GM', 280, 'flavoured'],
  ['THANDAI MASALA 100GM', 70, 'spices'],
  ['VEGGIES MIX 200GM', 260, 'snacks'],
  ['WALNUT DIVYAM 500GM', 480, 'nuts'],
]

export const PRODUCTS = RAW.map(([name, price, cat], i) => ({
  id: `prod_${i}`,
  name,
  price,
  cat,
  img: img(name),
  discount: price > 300 ? Math.floor(Math.random() * 10) + 4 : 0,
  isNew: i < 12,
  rating: 5,
  fallback: IMG.default,
}))

export const SLIDES = [
  {
    tag: 'Freshly Sourced · Maheshwar, MP',
    h1: 'Premium Dry Fruits & Nuts',
    sub: 'Handpicked from the finest farms. 80+ varieties delivered fresh to your door.',
    img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=1400&q=80',
    cta: 'Shop Now',
  },
  {
    tag: 'Best Sellers',
    h1: 'California Almonds & Premium Cashews',
    sub: 'Protein-packed, heart-healthy, and absolutely delicious.',
    img: 'https://images.unsplash.com/photo-1508061942611-df313e18c7a1?w=1400&q=80',
    cta: 'Explore Range',
  },
  {
    tag: 'Maheshwar Special',
    h1: 'Medjoul Dates & Exotic Dry Fruits',
    sub: 'Natural sweetness, rich nutrition — straight from Maheshwar, MP.',
    img: 'https://images.unsplash.com/photo-1611575619048-37e7f898ef60?w=1400&q=80',
    cta: 'Order Now',
  },
]

export const TESTIMONIALS = [
  { quote: 'The almonds and cashews are incredibly fresh. Best quality I\'ve found in Maheshwar!', author: 'Priya Sharma', location: 'Maheshwar' },
  { quote: 'Ordered Makhana and dates — both were fresh and perfectly packaged. Will definitely reorder!', author: 'Rahul Verma', location: 'Indore' },
  { quote: 'A place with a large collection of dry fruits. The flavoured almonds are absolutely delicious.', author: 'Anita Patel', location: 'Bhopal' },
  { quote: 'WhatsApp ordering is so convenient. Got delivery the same day. Highly recommended!', author: 'Suresh Kumar', location: 'Maheshwar' },
]
