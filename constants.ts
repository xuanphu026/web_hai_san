import { Product } from './types';

// Using consistent seeds for picsum to keep images stable
export const PRODUCTS: Product[] = [
  // Tôm
  {
    id: 1,
    name: "Tôm Hùm Alaska",
    price: 1200000,
    category: 'tom',
    description: "Tôm hùm Alaska nhập khẩu, thịt chắc, ngọt, size 1-2kg/con.",
    image: "https://picsum.photos/seed/lobster/400/300" 
  },
  {
    id: 2,
    name: "Tôm Sú Biển",
    price: 350000,
    category: 'tom',
    description: "Tôm sú tự nhiên, tươi sống, phù hợp nướng hoặc hấp.",
    image: "https://picsum.photos/seed/shrimp/400/300"
  },
  {
    id: 3,
    name: "Tôm Mũ Ni",
    price: 850000,
    category: 'tom',
    description: "Đặc sản vùng biển, thịt ngọt đậm đà như tôm hùm.",
    image: "https://picsum.photos/seed/muni/400/300"
  },
  
  // Cua
  {
    id: 4,
    name: "Cua Cà Mau",
    price: 550000,
    category: 'cua',
    description: "Cua gạch son, chắc thịt, đặc sản nổi tiếng Cà Mau.",
    image: "https://picsum.photos/seed/crab/400/300"
  },
  {
    id: 5,
    name: "Cua Hoàng Đế (King Crab)",
    price: 2500000,
    category: 'cua',
    description: "Vua của các loại cua, nhập khẩu, size khủng.",
    image: "https://picsum.photos/seed/kingcrab/400/300"
  },
  {
    id: 6,
    name: "Ghẹ Xanh",
    price: 450000,
    category: 'cua',
    description: "Ghẹ xanh Phan Thiết, tươi rói, bao ăn.",
    image: "https://picsum.photos/seed/bluecrab/400/300"
  },

  // Cá
  {
    id: 7,
    name: "Cá Hồi Nauy",
    price: 600000,
    category: 'ca',
    description: "Fillet cá hồi tươi, giàu Omega-3, thích hợp ăn sashimi.",
    image: "https://picsum.photos/seed/salmon/400/300"
  },
  {
    id: 8,
    name: "Cá Mú Đỏ",
    price: 950000,
    category: 'ca',
    description: "Cá mú đỏ thiên nhiên, thịt trắng, dai, cực hiếm.",
    image: "https://picsum.photos/seed/grouper/400/300"
  },
  {
    id: 9,
    name: "Cá Tầm Sapa",
    price: 280000,
    category: 'ca',
    description: "Cá tầm tươi sống nguyên con, sụn giòn, nấu lẩu cực ngon.",
    image: "https://picsum.photos/seed/sturgeon/400/300"
  }
];