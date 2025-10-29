const { HeaderBanner, HeroSection, HeroScrollMenuItem, AboutSection, HowWeWorkItem, GalleryItem, FaqItem, Event, ContactSection, FooterContact } = require("../models/landing-page");

// Header Banner Controller
exports.getHeaderBanner = async (req, res) => {
  try {
    const banner = await HeaderBanner.findOne();
    if (!banner) return res.status(404).json({ error: "Header banner not found" });
    res.json(banner);
  } catch {
    res.status(500).json({ error: "Failed to fetch header banner" });
  }
};

exports.updateHeaderBanner = async (req, res) => {
  try {
    const banner = await HeaderBanner.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(banner);
  } catch {
    res.status(500).json({ error: "Failed to update header banner" });
  }
};

// Hero Section Controller
exports.getHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.findOne();
    if (!hero) return res.status(404).json({ error: "Hero section not found" });
    res.json(hero);
  } catch {
    res.status(500).json({ error: "Failed to fetch hero section" });
  }
};

exports.updateHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(hero);
  } catch {
    res.status(500).json({ error: "Failed to update hero section" });
  }
};

// Hero Scroll Menu Controller
exports.getAllHeroScrollMenuItems = async (req, res) => {
  try {
    const items = await HeroScrollMenuItem.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch scroll menu items" });
  }
};

exports.createHeroScrollMenuItem = async (req, res) => {
  try {
    const item = await HeroScrollMenuItem.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create scroll menu item" });
  }
};

exports.updateHeroScrollMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await HeroScrollMenuItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update scroll menu item" });
  }
};

exports.deleteHeroScrollMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await HeroScrollMenuItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete scroll menu item" });
  }
};

// About Section Controller
exports.getAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.findOne();
    if (!about) return res.status(404).json({ error: "About section not found" });
    res.json(about);
  } catch {
    res.status(500).json({ error: "Failed to fetch about section" });
  }
};

exports.updateAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(about);
  } catch {
    res.status(500).json({ error: "Failed to update about section" });
  }
};

// How We Work Controller
exports.getAllHowWeWorkItems = async (req, res) => {
  try {
    const items = await HowWeWorkItem.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch how we work items" });
  }
};

exports.createHowWeWorkItem = async (req, res) => {
  try {
    const item = await HowWeWorkItem.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create how we work item" });
  }
};

exports.updateHowWeWorkItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await HowWeWorkItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update how we work item" });
  }
};

exports.deleteHowWeWorkItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await HowWeWorkItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete how we work item" });
  }
};

// Gallery Controller
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch gallery items" });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create gallery item" });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GalleryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update gallery item" });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
};

// FAQ Controller
exports.getAllFaqItems = async (req, res) => {
  try {
    const items = await FaqItem.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch FAQ items" });
  }
};

exports.createFaqItem = async (req, res) => {
  try {
    const item = await FaqItem.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create FAQ item" });
  }
};

exports.updateFaqItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await FaqItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update FAQ item" });
  }
};

exports.deleteFaqItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await FaqItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete FAQ item" });
  }
};

// Events Controller
exports.getAllEvents = async (req, res) => {
  try {
    const items = await Event.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const item = await Event.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Event not found" });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Event.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Event not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete event" });
  }
};

// Contact Section Controller
exports.getContactSection = async (req, res) => {
  try {
    const contact = await ContactSection.findOne();
    if (!contact) return res.status(404).json({ error: "Contact section not found" });
    res.json(contact);
  } catch {
    res.status(500).json({ error: "Failed to fetch contact section" });
  }
};

exports.updateContactSection = async (req, res) => {
  try {
    const contact = await ContactSection.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(contact);
  } catch {
    res.status(500).json({ error: "Failed to update contact section" });
  }
};

// Footer Contact Controller
exports.getFooterContact = async (req, res) => {
  try {
    const footer = await FooterContact.findOne();
    if (!footer) return res.status(404).json({ error: "Footer contact not found" });
    res.json(footer);
  } catch {
    res.status(500).json({ error: "Failed to fetch footer contact" });
  }
};

exports.updateFooterContact = async (req, res) => {
  try {
    const footer = await FooterContact.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(footer);
  } catch {
    res.status(500).json({ error: "Failed to update footer contact" });
  }
};