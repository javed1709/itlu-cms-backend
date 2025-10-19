const { createServer } = require("http");
const menuController = require("./controllers/menu.controller");

async function registerRoutes(app) {
  // Menu routes
  app.get("/api/menu", menuController.getAllMenuItems);
  app.get("/api/menu/category/:category", menuController.getMenuItemByCategory);
  app.get("/api/menu/:id", menuController.getMenuItemById);
  app.post("/api/menu", menuController.createMenuItem);
  app.put("/api/menu/:id", menuController.updateMenuItem);
  app.delete("/api/menu/:id", menuController.deleteMenuItem);

  const httpServer = createServer(app);
  return httpServer;
}

module.exports = { registerRoutes };
