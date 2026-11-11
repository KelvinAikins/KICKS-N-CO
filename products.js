// Your WhatsApp number for orders: country code first, digits only (e.g. 233241234567)
const WHATSAPP = "233000000000";

// KICKS N CO products. One line per item: edit, add or delete lines freely.
//   n   = name
//   g   = "foot" for footwear or "fit" for fits
//   c   = category (footwear: Sneakers, Slides, Trainers, Sportswear, Others)
//         (fits: Streetwear, Casuals, Official, Comfies)
//   p   = price in GHS
//   img = photo file inside the img folder, e.g. "court-classic.jpg"
//         (leave "" and the emoji in e shows until you add a photo)
const PRODUCTS = [
  { n: "Court Classic", g: "foot", c: "Sneakers", p: 520, img: "", e: "👟" },
  { n: "Cloud Runner", g: "foot", c: "Sneakers", p: 680, img: "", e: "👟" },
  { n: "Retro High", g: "foot", c: "Sneakers", p: 750, img: "", e: "👟" },
  { n: "Pool Slide", g: "foot", c: "Slides", p: 120, img: "", e: "🩴" },
  { n: "Cushion Slide", g: "foot", c: "Slides", p: 150, img: "", e: "🩴" },
  { n: "Strap Slide", g: "foot", c: "Slides", p: 180, img: "", e: "🩴" },
  { n: "Gym Flex", g: "foot", c: "Trainers", p: 420, img: "", e: "👟" },
  { n: "Cross Trainer Pro", g: "foot", c: "Trainers", p: 560, img: "", e: "👟" },
  { n: "Lift Low", g: "foot", c: "Trainers", p: 480, img: "", e: "👟" },
  { n: "Pitch Football Boots", g: "foot", c: "Sportswear", p: 600, img: "", e: "⚽" },
  { n: "Hoops Mid Basketball", g: "foot", c: "Sportswear", p: 720, img: "", e: "🏀" },
  { n: "Track Spike", g: "foot", c: "Sportswear", p: 540, img: "", e: "🏃" },
  { n: "Chelsea Boot", g: "foot", c: "Others", p: 650, img: "", e: "🥾" },
  { n: "Leather Loafer", g: "foot", c: "Others", p: 590, img: "", e: "👞" },
  { n: "Strap Sandal", g: "foot", c: "Others", p: 260, img: "", e: "🩴" },
  { n: "Work Boot", g: "foot", c: "Others", p: 700, img: "", e: "🥾" },
  { n: "Oversized Graphic Tee", g: "fit", c: "Streetwear", p: 180, img: "", e: "👕" },
  { n: "Cargo Pants", g: "fit", c: "Streetwear", p: 320, img: "", e: "👖" },
  { n: "Puffer Vest", g: "fit", c: "Streetwear", p: 450, img: "", e: "🧥" },
  { n: "Varsity Jacket", g: "fit", c: "Streetwear", p: 520, img: "", e: "🧥" },
  { n: "Linen Shirt", g: "fit", c: "Casuals", p: 240, img: "", e: "👕" },
  { n: "Chino Shorts", g: "fit", c: "Casuals", p: 200, img: "", e: "🩳" },
  { n: "Classic Polo", g: "fit", c: "Casuals", p: 190, img: "", e: "👕" },
  { n: "Denim Jacket", g: "fit", c: "Casuals", p: 380, img: "", e: "🧥" },
  { n: "Slim Blazer", g: "fit", c: "Official", p: 650, img: "", e: "🧥" },
  { n: "Oxford Shirt", g: "fit", c: "Official", p: 280, img: "", e: "👔" },
  { n: "Tailored Trousers", g: "fit", c: "Official", p: 360, img: "", e: "👖" },
  { n: "Silk Tie", g: "fit", c: "Official", p: 90, img: "", e: "👔" },
  { n: "Pullover Hoodie", g: "fit", c: "Comfies", p: 350, img: "", e: "🧥" },
  { n: "Zip Hoodie", g: "fit", c: "Comfies", p: 380, img: "", e: "🧥" },
  { n: "Jogger Set", g: "fit", c: "Comfies", p: 420, img: "", e: "👖" },
  { n: "Fleece Sweatshirt", g: "fit", c: "Comfies", p: 300, img: "", e: "🧥" },
];
