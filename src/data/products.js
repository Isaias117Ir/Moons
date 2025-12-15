import avenaMielImg1 from '../assets/avena_miel_1.jpg';
import avenaMielImg2 from '../assets/avena_miel_2.jpg';
import avenaMielImg3 from '../assets/avena_miel_3.jpg';
import avenaMielImg4 from '../assets/avena_miel_4.jpg';
import mentaNuezImg from '../assets/menta_nuez.jpg';
import calendulaImg from '../assets/calendula.jpg';

export const products = [
  {
    id: 1,
    name: "Menta y cáscara de nuéz",
    price: 120,
    skinType: "Grasa",
    benefit: "Relajante",
    description: "Suave exfoliación con copos de avena natural y la hidratación profunda de la miel orgánica. Perfecto para pieles sensibles y secas que necesitan un extra de cuidado.",
    image: mentaNuezImg,
    ingredients: "Aceite de Lavanda, Manteca de Karité, Aceite de Coco, Vitamina E"
  },
  {
    id: 2,
    name: "Vino tinton y Mango",
    price: 110,
    skinType: "Seca",
    benefit: "Hidratante",
    description: "Una mezcla calmante de aceites esenciales con vino tinto y manteca de mango. Ideal para relajar los sentidos después de un día largo mientras equilibra la grasa natural de la piel.",
    image: avenaMielImg1,
    images: [avenaMielImg1, avenaMielImg2, avenaMielImg3, avenaMielImg4],
    ingredients: "Avena Coloidal, Miel Orgánica, Aceite de Almendras, Leche de Cabra"
  },
  {
    id: 3,
    name: "Carbón Activado Detox",
    price: 135,
    skinType: "Mixta",
    benefit: "Purificante",
    description: "El poder del carbón activado para eliminar impurezas y toxinas de la piel. Excelente para combatir el acné y limpiar los poros en profundidad.",
    image: "https://drive.google.com/uc?export=view&id=1WKQTbwJWqGkukP3-i4RPZdbJp_xZHEFR",
    ingredients: "Carbón Activado, Aceite de Árbol de Té, Aceite de Jojoba"
  },
  {
    id: 4,
    name: "Rosas Silvestres",
    price: 140,
    skinType: "Sensible",
    benefit: "Rejuvenecedor",
    description: "Infundido con pétalos de rosa reales y aceite de rosa mosqueta. Ayuda a regenerar la piel y aporta una luminosidad natural.",
    image: "https://drive.google.com/uc?export=view&id=1WKQTbwJWqGkukP3-i4RPZdbJp_xZHEFR",
    ingredients: "Pétalos de Rosa, Aceite de Rosa Mosqueta, Arcilla Rosa"
  },
  {
    id: 5,
    name: "Menta y cáscara de nuéz",
    price: 115,
    skinType: "Todo tipo",
    benefit: "Refrescante",
    description: "Una explosión de frescura para despertar tus mañanas. El eucalipto abre las vías respiratorias mientras la menta estimula la circulación.",
    image: mentaNuezImg,
    ingredients: "Aceite de Eucalipto, Aceite de Menta, Espirulina, Cáscara de Nuez"
  },
  {
    id: 6,
    name: "Caléndula Suave",
    price: 125,
    skinType: "Sensible",
    benefit: "Calmante",
    description: "La caléndula es conocida por sus propiedades antiinflamatorias. Este jabón es ideal para pieles irritadas o con afecciones dermatológicas leves.",
    image: calendulaImg,
    ingredients: "Flores de Caléndula, Aceite de Oliva, Manteca de Cacao"
  }
];
