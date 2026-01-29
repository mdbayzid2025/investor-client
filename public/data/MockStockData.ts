// Mock data structure
interface StockItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location?: string;
  priceRange?: string;
  yield?: string;
  features?: string[];
  gallery?: string[];
}

// Enhanced mock data with full details
export const MOCK_STOCK: StockItem[] = [
  {
    id: "stock-001",
    title: "Prime Waterfront Development Site",
    description:
      "Exceptional 15-hectare coastal plot with approved rezoning for mixed-use development. Direct ocean access and stunning panoramic views. This rare opportunity offers investors the chance to create a landmark development in one of the most sought-after coastal regions. The site benefits from existing infrastructure connections and a streamlined approval process.",
    category: "Vacant Land",
    image: "/api/placeholder/800/600",
    location: "Western Cape Coastal Region",
    priceRange: "$8M - $12M",
    yield: "N/A",
    features: [
      "15 hectares prime land",
      "Ocean frontage",
      "Approved rezoning",
      "Utilities available",
      "Development rights",
      "Strategic location",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-002",
    title: "Historic Estate with Winelands",
    description:
      "Prestigious 50-hectare wine estate with heritage manor house, operational vineyards, and cellar. Established brand with international recognition. The estate produces award-winning wines and offers a unique blend of agricultural productivity and luxury lifestyle. Includes staff accommodation, tasting room, and event facilities.",
    category: "Agricultural",
    image: "/api/placeholder/800/600",
    location: "Stellenbosch Wine Region",
    priceRange: "$15M - $20M",
    yield: "6.5%",
    features: [
      "50 hectares vineyards",
      "Heritage manor house",
      "Wine production facility",
      "Established brand",
      "Tourism income",
      "Staff accommodation",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-003",
    title: "Luxury Marina Apartments",
    description:
      "Exclusive portfolio of 12 premium waterfront units in sought-after marina development. Fully tenanted with strong rental yields. Each apartment features high-end finishes, private balconies with marina views, and access to world-class amenities including gym, spa, and concierge services.",
    category: "Residential",
    image: "/api/placeholder/800/600",
    location: "V&A Waterfront, Cape Town",
    priceRange: "$18M - $22M",
    yield: "7.2%",
    features: [
      "12 luxury units",
      "Fully tenanted",
      "Marina views",
      "High-end finishes",
      "Premium amenities",
      "Secure parking",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-004",
    title: "Commercial Hub - City Centre",
    description:
      "Grade A office building in prime CBD location. 8,500 sqm with blue-chip tenants and parking for 200 vehicles. Strong investment returns. Modern facilities include fiber connectivity, generator backup, and sophisticated security systems. Long-term lease agreements provide stable income streams.",
    category: "Commercial",
    image: "/api/placeholder/800/600",
    location: "Sandton CBD",
    priceRange: "$45M - $55M",
    yield: "8.5%",
    features: [
      "8,500 sqm GLA",
      "Grade A building",
      "Blue-chip tenants",
      "200 parking bays",
      "Backup power",
      "Prime location",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-005",
    title: "Boutique Hotel & Spa Opportunity",
    description:
      "Turnkey 25-room boutique hotel with award-winning spa facilities. Coastal location with established clientele and excellent reviews. The property features a restaurant, conference facilities, and wellness center. Consistently high occupancy rates and strong repeat business demonstrate the hotel's market position.",
    category: "Hospitality",
    image: "/api/placeholder/800/600",
    location: "Garden Route",
    priceRange: "$12M - $16M",
    yield: "9.5%",
    features: [
      "25 luxury rooms",
      "Award-winning spa",
      "Restaurant & bar",
      "Conference facilities",
      "High occupancy rate",
      "Established brand",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-006",
    title: "Industrial Park Development Rights",
    description:
      "Strategic 35-hectare industrial zoned land near major highways. Approved for logistics and warehousing development with utilities in place. Ideal for e-commerce fulfillment centers or distribution hubs. The location provides easy access to ports and major transport routes.",
    category: "Industrial",
    image: "/api/placeholder/800/600",
    location: "Gauteng Logistics Hub",
    priceRange: "$25M - $32M",
    yield: "N/A",
    features: [
      "35 hectares land",
      "Industrial zoning",
      "Highway access",
      "Utilities ready",
      "Development approved",
      "Strategic location",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-007",
    title: "Golf Estate Residential Plots",
    description:
      "25 premium residential stands within championship golf estate. Full infrastructure, 24-hour security, and lifestyle amenities included. The estate offers residents access to an 18-hole golf course, clubhouse, tennis courts, and swimming facilities. Architectural guidelines ensure quality development.",
    category: "Residential",
    image: "/api/placeholder/800/600",
    location: "KwaZulu-Natal North Coast",
    priceRange: "$8M - $11M",
    yield: "N/A",
    features: [
      "25 prime plots",
      "Golf course access",
      "Full infrastructure",
      "24-hour security",
      "Lifestyle amenities",
      "Building guidelines",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-008",
    title: "Shopping Centre Portfolio",
    description:
      "Three regional shopping centres with anchor tenants and strong foot traffic. Excellent diversification across suburban growth nodes. Combined GLA of 45,000 sqm with major retailers and strong tenant mix. Professional management in place with proven track record.",
    category: "Retail",
    image: "/api/placeholder/800/600",
    location: "Multiple Locations - GP & WC",
    priceRange: "$85M - $95M",
    yield: "8.8%",
    features: [
      "3 shopping centres",
      "45,000 sqm GLA",
      "Anchor tenants",
      "Strong foot traffic",
      "Professional management",
      "Growth locations",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
  {
    id: "stock-009",
    title: "Mountain Retreat & Eco-Lodge",
    description:
      "8-suite luxury eco-lodge on 100 hectares of pristine mountain reserve. Sustainable operations with high-end adventure tourism focus. The property includes hiking trails, wildlife viewing areas, and eco-friendly facilities. Strong international clientele and high average daily rates.",
    category: "Hospitality",
    image: "/api/placeholder/800/600",
    location: "Mpumalanga Highlands",
    priceRange: "$6M - $8M",
    yield: "11.2%",
    features: [
      "8 luxury suites",
      "100 hectare reserve",
      "Eco-certified",
      "Adventure tourism",
      "Wildlife viewing",
      "International clientele",
    ],
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
  },
];
