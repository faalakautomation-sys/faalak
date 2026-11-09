import massageBusinessImage from "../assets/bg-lady-image.jpg";
import furnitureStoreImage from "../assets/teaser-work.jpeg";
import hvacBusinessImage from "../assets/category/cat-ai-receptionist.png";
import realEstateImage from "../assets/category/cat-mortgage.jpeg";
import landscapingBusinessImage from "../assets/category/cat-store.webp";

export const industryPresets = [
  {
    slug: "massage-and-spa",
    name: "Massage & Spa",
    cardImage: massageBusinessImage,
    cardImageAlt: "Local business owner speaking with a customer by phone",
    missedCalls: 40,
    conversionRate: 30,
    averageCustomerValue: 120,
    demoPhone: null,
    cardDescription: "Keep appointments booked while you focus on each client.",
  },
  {
    slug: "furniture-store",
    name: "Furniture Store",
    cardImage: furnitureStoreImage,
    cardImageAlt: "Furniture shoppers browsing a local store together",
    missedCalls: 25,
    conversionRate: 20,
    averageCustomerValue: 900,
    demoPhone: null,
    cardDescription: "Answer stock and delivery questions, and book showroom visits.",
  },
  {
    slug: "hvac",
    name: "HVAC",
    cardImage: hvacBusinessImage,
    cardImageAlt: "Local service business owner checking customer details on a phone",
    missedCalls: 30,
    conversionRate: 35,
    averageCustomerValue: 450,
    demoPhone: "+12898166716",
    cardDescription: "Capture urgent repair calls and book technician visits.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    cardImage: realEstateImage,
    cardImageAlt: "A homeowner reviewing a model house and property paperwork",
    missedCalls: 20,
    conversionRate: 10,
    averageCustomerValue: 8000,
    demoPhone: null,
    cardDescription: "Qualify property inquiries and schedule viewings.",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    cardImage: landscapingBusinessImage,
    cardImageAlt: "A local shop customer browsing products in person",
    missedCalls: 25,
    conversionRate: 30,
    averageCustomerValue: 1500,
    demoPhone: null,
    cardDescription: "Capture quote requests and book site visits.",
  },
];
