export type PropertyType = "House" | "Apartment" | "Villa" | "Land";
export type PropertyStatus = "For Sale" | "Sold" | "New";

export interface Agent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  suburb: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  images: string[];
  agent: Agent;
}

const agents: Agent[] = [
  {
    name: "James Hartwell",
    phone: "+1 (310) 555-0142",
    email: "james.hartwell@luxprop.com",
    avatar: "https://picsum.photos/seed/agent1/200/200",
  },
  {
    name: "Sophia Beaumont",
    phone: "+1 (310) 555-0187",
    email: "sophia.beaumont@luxprop.com",
    avatar: "https://picsum.photos/seed/agent2/200/200",
  },
  {
    name: "Marcus Chen",
    phone: "+1 (310) 555-0231",
    email: "marcus.chen@luxprop.com",
    avatar: "https://picsum.photos/seed/agent3/200/200",
  },
];

export const properties: Property[] = [
  {
    id: "prop-001",
    title: "The Cliffside Residence",
    price: 4850000,
    address: "12 Cliffside Drive",
    suburb: "Pacific Palisades",
    city: "Los Angeles",
    bedrooms: 5,
    bathrooms: 4,
    sqm: 620,
    type: "Villa",
    status: "For Sale",
    description:
      "A commanding cliffside estate perched above the Pacific with sweeping ocean panoramas. Designed by an award-winning architect, the home seamlessly blends indoor and outdoor living through walls of glass that frame the horizon. Every room is a gallery of natural light and curated materials.",
    features: [
      "Ocean view",
      "Infinity pool",
      "Home theatre",
      "Chef's kitchen",
      "3-car garage",
      "Smart home system",
      "Private gym",
      "Wine cellar",
    ],
    images: [
      "https://picsum.photos/seed/prop001a/1200/800",
      "https://picsum.photos/seed/prop001b/1200/800",
      "https://picsum.photos/seed/prop001c/1200/800",
      "https://picsum.photos/seed/prop001d/1200/800",
    ],
    agent: agents[0],
  },
  {
    id: "prop-002",
    title: "Manhattan Sky Penthouse",
    price: 7200000,
    address: "1 Park Avenue, PH-40",
    suburb: "Midtown",
    city: "New York",
    bedrooms: 4,
    bathrooms: 3,
    sqm: 420,
    type: "Apartment",
    status: "New",
    description:
      "An ultra-rare full-floor penthouse crowning one of Manhattan's most celebrated residential towers. Floor-to-ceiling glass on all four sides delivers 360-degree skyline views stretching from the Hudson to the East River. Interiors are finished with Italian marble, white oak, and bespoke millwork.",
    features: [
      "360° city views",
      "Private terrace",
      "Concierge service",
      "Private elevator",
      "Marble bathrooms",
      "Sub-Zero kitchen",
      "Climate control",
      "Storage unit",
    ],
    images: [
      "https://picsum.photos/seed/prop002a/1200/800",
      "https://picsum.photos/seed/prop002b/1200/800",
      "https://picsum.photos/seed/prop002c/1200/800",
      "https://picsum.photos/seed/prop002d/1200/800",
    ],
    agent: agents[1],
  },
  {
    id: "prop-003",
    title: "Napa Valley Estate",
    price: 9500000,
    address: "800 Vineyard Ridge Road",
    suburb: "St. Helena",
    city: "Napa Valley",
    bedrooms: 7,
    bathrooms: 6,
    sqm: 1100,
    type: "Villa",
    status: "For Sale",
    description:
      "Set amid 14 acres of working vineyards, this estate is a masterwork of Californian luxury living. The main residence is complemented by a guest cottage, barrel cellar, and professional tasting room. Heritage oak trees frame a resort-style pool and outdoor kitchen designed for year-round entertaining.",
    features: [
      "14-acre vineyard",
      "Guest cottage",
      "Barrel cellar",
      "Resort pool",
      "Outdoor kitchen",
      "Tasting room",
      "Helicopter pad",
      "Staff quarters",
    ],
    images: [
      "https://picsum.photos/seed/prop003a/1200/800",
      "https://picsum.photos/seed/prop003b/1200/800",
      "https://picsum.photos/seed/prop003c/1200/800",
      "https://picsum.photos/seed/prop003d/1200/800",
    ],
    agent: agents[2],
  },
  {
    id: "prop-004",
    title: "Tribeca Loft",
    price: 3200000,
    address: "86 Franklin Street, 5F",
    suburb: "Tribeca",
    city: "New York",
    bedrooms: 3,
    bathrooms: 2,
    sqm: 280,
    type: "Apartment",
    status: "Sold",
    description:
      "A quintessential Tribeca loft occupying the entire fifth floor of a landmark cast-iron building. Soaring 14-foot ceilings, original exposed brick, and massive arched windows create an atmosphere that is simultaneously historic and contemporary. The open-plan layout is a canvas for any aesthetic.",
    features: [
      "14ft ceilings",
      "Exposed brick",
      "Cast-iron building",
      "Open plan",
      "Private storage",
      "Bike storage",
      "Doorman",
      "Roof access",
    ],
    images: [
      "https://picsum.photos/seed/prop004a/1200/800",
      "https://picsum.photos/seed/prop004b/1200/800",
      "https://picsum.photos/seed/prop004c/1200/800",
      "https://picsum.photos/seed/prop004d/1200/800",
    ],
    agent: agents[0],
  },
  {
    id: "prop-005",
    title: "Malibu Beachfront",
    price: 12800000,
    address: "21 Carbon Beach",
    suburb: "Carbon Beach",
    city: "Malibu",
    bedrooms: 6,
    bathrooms: 5,
    sqm: 780,
    type: "House",
    status: "For Sale",
    description:
      "Direct on Carbon Beach — the most exclusive stretch of sand in Malibu — this newly rebuilt residence redefines coastal luxury. An airy open floor plan dissolves the boundary between interior and the Pacific beyond. The wraparound deck, private beach access, and pool deck create a private resort on one of the world's most coveted shores.",
    features: [
      "Direct beach access",
      "Pacific frontage",
      "Wraparound deck",
      "Pool & spa",
      "4-car garage",
      "Guest suite",
      "Outdoor shower",
      "Chef's kitchen",
    ],
    images: [
      "https://picsum.photos/seed/prop005a/1200/800",
      "https://picsum.photos/seed/prop005b/1200/800",
      "https://picsum.photos/seed/prop005c/1200/800",
      "https://picsum.photos/seed/prop005d/1200/800",
    ],
    agent: agents[1],
  },
  {
    id: "prop-006",
    title: "Beverly Hills Modern",
    price: 5600000,
    address: "910 Benedict Canyon Drive",
    suburb: "Beverly Hills",
    city: "Los Angeles",
    bedrooms: 5,
    bathrooms: 5,
    sqm: 540,
    type: "House",
    status: "New",
    description:
      "A boldly geometric new build in the heart of Beverly Hills, where clean lines, raw concrete, and warm timber create a residence of quiet drama. The house unfolds around a central courtyard and negative-edge pool, with every space oriented to maximise canyon and city views. Purpose-designed for a life of effortless luxury.",
    features: [
      "Negative-edge pool",
      "Canyon views",
      "Courtyard design",
      "Smart home",
      "Media room",
      "Walk-in wardrobes",
      "2-car garage",
      "Landscaped gardens",
    ],
    images: [
      "https://picsum.photos/seed/prop006a/1200/800",
      "https://picsum.photos/seed/prop006b/1200/800",
      "https://picsum.photos/seed/prop006c/1200/800",
      "https://picsum.photos/seed/prop006d/1200/800",
    ],
    agent: agents[2],
  },
  {
    id: "prop-007",
    title: "SoHo Design Apartment",
    price: 2800000,
    address: "155 Wooster Street, 3A",
    suburb: "SoHo",
    city: "New York",
    bedrooms: 2,
    bathrooms: 2,
    sqm: 210,
    type: "Apartment",
    status: "For Sale",
    description:
      "A gallery-inspired apartment in the heart of SoHo, thoughtfully renovated by a noted interior designer. Warm walnut floors, polished plaster walls, and custom cabinetry flow seamlessly through the open plan. The building's cobblestone street and cast-iron façade set the scene for one of New York's most cultured addresses.",
    features: [
      "Designer renovation",
      "Custom millwork",
      "Polished plaster",
      "Walnut floors",
      "Live-work zoning",
      "Gallery ceilings",
      "Central HVAC",
      "Private storage",
    ],
    images: [
      "https://picsum.photos/seed/prop007a/1200/800",
      "https://picsum.photos/seed/prop007b/1200/800",
      "https://picsum.photos/seed/prop007c/1200/800",
      "https://picsum.photos/seed/prop007d/1200/800",
    ],
    agent: agents[0],
  },
  {
    id: "prop-008",
    title: "Aspen Mountain Chalet",
    price: 8900000,
    address: "45 Snowmass Road",
    suburb: "Snowmass Village",
    city: "Aspen",
    bedrooms: 6,
    bathrooms: 5,
    sqm: 720,
    type: "Villa",
    status: "For Sale",
    description:
      "A supreme ski-in/ski-out chalet commanding an unrivalled position on the slopes of Aspen Mountain. The home wraps its guests in rough-hewn stone, reclaimed timber, and a palette drawn directly from the surrounding alpine landscape. Après ski never felt so good as it does in the double-height great room around the statement fireplace.",
    features: [
      "Ski-in/ski-out",
      "Mountain views",
      "Double-height fireplace",
      "Steam sauna",
      "Boot room",
      "Heated driveway",
      "Caretaker suite",
      "Wine room",
    ],
    images: [
      "https://picsum.photos/seed/prop008a/1200/800",
      "https://picsum.photos/seed/prop008b/1200/800",
      "https://picsum.photos/seed/prop008c/1200/800",
      "https://picsum.photos/seed/prop008d/1200/800",
    ],
    agent: agents[2],
  },
  {
    id: "prop-009",
    title: "Miami Waterfront Residence",
    price: 6400000,
    address: "2401 Bay Shore Drive",
    suburb: "Coconut Grove",
    city: "Miami",
    bedrooms: 5,
    bathrooms: 4,
    sqm: 590,
    type: "House",
    status: "New",
    description:
      "Anchored on the serene shores of Biscayne Bay, this contemporary tropical residence merges indoor living with the lush landscape beyond. Brazilian hardwood, natural stone, and vaulted ceilings celebrate material richness throughout, while the dock, pool, and outdoor pavilion invite a life lived in the warmth of perpetual summer.",
    features: [
      "Private dock",
      "Bay views",
      "Outdoor pavilion",
      "Tropical landscaping",
      "Pool & spa",
      "Boat lift",
      "Gated entry",
      "Summer kitchen",
    ],
    images: [
      "https://picsum.photos/seed/prop009a/1200/800",
      "https://picsum.photos/seed/prop009b/1200/800",
      "https://picsum.photos/seed/prop009c/1200/800",
      "https://picsum.photos/seed/prop009d/1200/800",
    ],
    agent: agents[1],
  },
  {
    id: "prop-010",
    title: "Greenwich Colonial Estate",
    price: 5100000,
    address: "34 Round Hill Road",
    suburb: "Round Hill",
    city: "Greenwich",
    bedrooms: 7,
    bathrooms: 6,
    sqm: 860,
    type: "House",
    status: "Sold",
    description:
      "A grand colonial estate set on 3.4 acres of manicured grounds in Greenwich's most prestigious neighbourhood. The main residence exudes timeless elegance with a formal entry gallery, wood-panelled library, and a conservatory that looks out over the rolling lawn. The property includes a tennis court, pool house, and four-car garage.",
    features: [
      "3.4 acres",
      "Tennis court",
      "Pool house",
      "Library",
      "Conservatory",
      "Guest apartment",
      "4-car garage",
      "Formal gardens",
    ],
    images: [
      "https://picsum.photos/seed/prop010a/1200/800",
      "https://picsum.photos/seed/prop010b/1200/800",
      "https://picsum.photos/seed/prop010c/1200/800",
      "https://picsum.photos/seed/prop010d/1200/800",
    ],
    agent: agents[0],
  },
  {
    id: "prop-011",
    title: "Sunset Strip Retreat",
    price: 3750000,
    address: "9080 Sunset Boulevard",
    suburb: "West Hollywood",
    city: "Los Angeles",
    bedrooms: 4,
    bathrooms: 3,
    sqm: 380,
    type: "House",
    status: "For Sale",
    description:
      "A sleek Hollywood Hills hideaway concealed behind mature hedging on the iconic Sunset Strip. Walls of glass disappear into pocket doors to reveal a private canyon and shimmering city views below. The home's dark, moody palette — ebonised oak, honed basalt, and aged brass — creates an atmosphere of effortless cool.",
    features: [
      "Canyon views",
      "City light views",
      "Disappearing walls",
      "Plunge pool",
      "Rooftop terrace",
      "Recording room",
      "Heated floors",
      "Gated entry",
    ],
    images: [
      "https://picsum.photos/seed/prop011a/1200/800",
      "https://picsum.photos/seed/prop011b/1200/800",
      "https://picsum.photos/seed/prop011c/1200/800",
      "https://picsum.photos/seed/prop011d/1200/800",
    ],
    agent: agents[2],
  },
  {
    id: "prop-012",
    title: "Palm Beach Mediterranean",
    price: 14500000,
    address: "135 North Ocean Boulevard",
    suburb: "Palm Beach Island",
    city: "Palm Beach",
    bedrooms: 8,
    bathrooms: 7,
    sqm: 1250,
    type: "Villa",
    status: "For Sale",
    description:
      "A palatial oceanfront estate in the Mediterranean Revival style, occupying one of the last remaining large private parcels on Palm Beach Island. Lavished with Venetian plaster, hand-painted tiles, and vaulted Moorish ceilings, the residence is both museum-quality and deeply liveable. The oceanfront loggia, pool terrace, and private beach access complete the picture.",
    features: [
      "Ocean frontage",
      "Private beach",
      "Loggia & terrace",
      "Ballroom",
      "Polo room",
      "Staff wing",
      "Garage for 6",
      "Tennis court",
    ],
    images: [
      "https://picsum.photos/seed/prop012a/1200/800",
      "https://picsum.photos/seed/prop012b/1200/800",
      "https://picsum.photos/seed/prop012c/1200/800",
      "https://picsum.photos/seed/prop012d/1200/800",
    ],
    agent: agents[1],
  },
];

export const featuredProperties = properties.filter(
  (p) => p.status !== "Sold"
).slice(0, 6);
