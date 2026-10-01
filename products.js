/*
  NEEZA — PRODUCT DATA
  ---------------------------------------------------
  This is temporary frontend-only product data.
  In the backend phase, this array will be replaced by
  data fetched from the PHP + MySQL API, but every page
  will keep reading products the same way, so no page
  code should need to change.

  Field reference:
  id        - unique number, used in product.html?id=
  name      - product title
  category  - "T-Shirts" | "Shirts" | "Trousers"
  price     - current price (PKR)
  oldPrice  - original price before discount, or null
  image     - path to product image
  sizes     - array of available sizes
  colors    - array of available colors
  badge     - "NEW" | "SALE" | null
  description - short product description for product.html
*/

// ================= PRODUCT DATA =================
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Black T-Shirt",
    category: "T-Shirts",
    price: 2499,
    oldPrice: null,
   image: "images/products/tshirts/black-tshirt.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    badge: "NEW",
    description: "A everyday essential t-shirt cut from soft, breathable cotton. Designed with a clean crew neck and a regular fit that layers well under any jacket or shirt."
  },
  {
    id: 2,
    name: "Off-White Essential Tee",
    category: "T-Shirts",
    price: 2299,
    oldPrice: null,
    image: "images/products/tshirts/offwhite-tshirt.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-White"],
    badge: "SALE",
    description: "A wardrobe basic in a soft off-white shade. Pre-shrunk fabric holds its shape wash after wash, making it a reliable everyday layer."
  },
  {
    id: 3,
    name: "Grey Melange Crew Tee",
    category: "T-Shirts",
    price: 2199,
    oldPrice: null,
    image: "images/products/tshirts/grey-tshirt.jpg",
    sizes: ["M", "L", "XL"],
    colors: ["Grey"],
    badge: null,
    description: "A heathered grey tee with a slightly heavier fabric weight, giving it a more structured drape than a standard basic tee."
  },
  {
    id: 4,
    name: "Slim Fit White Shirt",
    category: "Shirts",
    price: 3999,
    oldPrice: null,
    image: "images/products/shirts/white-shirt.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    badge: "NEW",
    description: "A crisp white shirt tailored in a slim fit, made from a cotton blend that resists creasing through a full day of wear."
  },
  {
    id: 5,
    name: "Charcoal Oxford Shirt",
    category: "Shirts",
    price: 4299,
    oldPrice: null,
    image: "images/products/shirts/charcoal-shirt.jpg",
    sizes: ["M", "L", "XL"],
    colors: ["Charcoal"],
    badge: "SALE",
    description: "A woven oxford shirt in a deep charcoal tone. Structured enough for the office, relaxed enough for the weekend."
  },
  {
    id: 6,
    name: "Light Grey Casual Shirt",
    category: "Shirts",
    price: 3799,
    oldPrice: null,
    image: "images/products/shirts/lightgrey-shirt.jpg",
    sizes: ["S", "M", "L"],
    colors: ["Light Grey"],
    badge: null,
    description: "A lightweight casual shirt in soft grey, cut with a relaxed collar and a straight hem that sits well untucked."
  },
  {
    id: 7,
    name: "Tapered Black Trousers",
    category: "Trousers",
    price: 4599,
    oldPrice: null,
   image: "images/products/trousers/black-trousers.jpg",
    sizes: ["30", "32", "34", "36"],
    colors: ["Black"],
    badge: "NEW",
    description: "Tailored trousers with a tapered leg and a mid-rise waist, built from a stretch-blend fabric that moves with you."
  },
  {
    id: 8,
    name: "Dark Grey Chinos",
    category: "Trousers",
    price: 3999,
    oldPrice: null,
   image: "images/products/trousers/darkgrey-chinos.jpg",
    sizes: ["30", "32", "34", "36"],
    colors: ["Dark Grey"],
    badge: "SALE",
    description: "Classic chinos in dark grey with a straight leg and a durable cotton twill that keeps its shape through daily wear."
  },
  {
    id: 9,
    name: "Beige Slim Trousers",
    category: "Trousers",
    price: 4299,
    oldPrice: null,
    image: "images/products/trousers/beige-trousers.jpg",
    sizes: ["30", "32", "34"],
    colors: ["Beige"],
    badge: null,
    description: "A slim-fit trouser in warm beige, finished with a clean front and a tailored ankle break."
  }
];
