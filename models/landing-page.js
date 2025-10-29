const mongoose = require("mongoose");

// 1. Header Banner Schema
const headerBannerSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Must be a valid email",
      },
    },
    openingHours: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const HeaderBanner = mongoose.model("HeaderBanner", headerBannerSchema);

// 2. Hero Section Schema
const heroSectionSchema = new mongoose.Schema(
  {
    title1: {
      type: String,
      required: true,
      trim: true,
    },
    title2: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", heroSectionSchema);

// 3. Hero Bottom Scroll Menu Schema
const heroScrollMenuItemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title1: {
      type: String,
      required: true,
      trim: true,
    },
    title2: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const HeroScrollMenuItem = mongoose.model("HeroScrollMenuItem", heroScrollMenuItemSchema);

// 4. About Section Schema
const aboutSectionSchema = new mongoose.Schema(
  {
    leftImage: {
      type: String,
      required: true,
    },
    rightTitle1: {
      type: String,
      required: true,
      trim: true,
    },
    rightTitle2: {
      type: String,
      required: true,
      trim: true,
    },
    legendTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AboutSection = mongoose.model("AboutSection", aboutSectionSchema);

// 5. How We Work Schema
const howWeWorkItemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const HowWeWorkItem = mongoose.model("HowWeWorkItem", howWeWorkItemSchema);

// 6. Gallery Schema
const galleryItemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

// 7. FAQ Schema
const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const FaqItem = mongoose.model("FaqItem", faqItemSchema);

// 8. Events Schema
const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    mondayToThursday: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    fridayToSaturday: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

// 9. Contact Section Schema
const contactSectionSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Must be a valid email",
      },
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    openingHours: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ContactSection = mongoose.model("ContactSection", contactSectionSchema);

// 10. Footer Contact Info Schema
const footerContactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Must be a valid email",
      },
    },
  },
  { timestamps: true }
);

const FooterContact = mongoose.model("FooterContact", footerContactSchema);

module.exports = {
  HeaderBanner,
  HeroSection,
  HeroScrollMenuItem,
  AboutSection,
  HowWeWorkItem,
  GalleryItem,
  FaqItem,
  Event,
  ContactSection,
  FooterContact,
};