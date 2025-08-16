import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackingListSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const { destination, date } = req.query;
      
      if (!destination || !date) {
        return res.status(400).json({ error: "Destination and date are required" });
      }

      const weatherData = getHistoricalWeatherData(destination as string, date as string);
      res.json(weatherData);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Get all packing lists
  app.get("/api/packing-lists", async (req, res) => {
    try {
      const lists = await storage.getAllPackingLists();
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packing lists" });
    }
  });

  // Get a specific packing list
  app.get("/api/packing-lists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const list = await storage.getPackingList(id);
      
      if (!list) {
        return res.status(404).json({ message: "Packing list not found" });
      }
      
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packing list" });
    }
  });

  // Create a new packing list
  app.post("/api/packing-lists", async (req, res) => {
    try {
      const validatedData = insertPackingListSchema.parse(req.body);
      const newList = await storage.createPackingList(validatedData);
      res.status(201).json(newList);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create packing list" });
    }
  });

  // Update a packing list
  app.put("/api/packing-lists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPackingListSchema.partial().parse(req.body);
      const updatedList = await storage.updatePackingList(id, validatedData);
      
      if (!updatedList) {
        return res.status(404).json({ message: "Packing list not found" });
      }
      
      res.json(updatedList);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update packing list" });
    }
  });

  // Delete a packing list
  app.delete("/api/packing-lists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePackingList(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Packing list not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete packing list" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getHistoricalWeatherData(destination: string, date: string) {
  const month = new Date(date).getMonth();
  
  // Historical weather patterns for popular cruise destinations
  const weatherPatterns: Record<string, any> = {
    // Caribbean destinations
    "caribbean": {
      temperatures: { 
        winter: { high: 82, low: 73 }, 
        spring: { high: 85, low: 76 }, 
        summer: { high: 88, low: 79 }, 
        fall: { high: 86, low: 77 } 
      },
      conditions: month >= 6 && month <= 11 ? "Hurricane season - pack rain gear" : "Generally sunny and warm",
      recommendations: ["Lightweight clothing", "Sunscreen", "Hat", "Swimwear", "Rain jacket (if hurricane season)"],
      clothingSuggestions: {
        tops: ["Cotton t-shirts", "Tank tops", "Light blouses", "Short-sleeve shirts", "Cover-ups"],
        bottoms: ["Shorts", "Light pants", "Capris", "Sundresses", "Swimwear"],
        outerwear: month >= 6 && month <= 11 ? ["Light rain jacket", "Windbreaker"] : ["Light cardigan", "Thin sweater"],
        footwear: ["Sandals", "Flip-flops", "Boat shoes", "Water shoes", "Light sneakers"],
        accessories: ["Sun hat", "Sunglasses", "Beach bag", "Waterproof phone case"]
      },
      weatherEssentials: ["SPF 30+ sunscreen", "After-sun lotion", "Insect repellent", "Umbrella", "Portable fan"]
    },
    "bahamas": {
      temperatures: { 
        winter: { high: 77, low: 65 }, 
        spring: { high: 81, low: 71 }, 
        summer: { high: 87, low: 78 }, 
        fall: { high: 83, low: 74 } 
      },
      conditions: month >= 6 && month <= 11 ? "Hurricane season possible" : "Pleasant weather",
      recommendations: ["Beach attire", "Light jacket for evening", "Sunglasses", "Flip-flops"],
      clothingSuggestions: {
        tops: ["Lightweight shirts", "Tank tops", "Beach cover-ups", "Polo shirts"],
        bottoms: ["Swim shorts", "Board shorts", "Light dresses", "Casual shorts"],
        outerwear: ["Light sweater for evening", "Windbreaker"],
        footwear: ["Beach sandals", "Water shoes", "Canvas sneakers"],
        accessories: ["Sun hat", "Beach towel", "Waterproof watch"]
      },
      weatherEssentials: ["Reef-safe sunscreen", "Aloe vera gel", "Beach umbrella", "Cooler bag"]
    },
    // Mediterranean destinations
    "mediterranean": {
      temperatures: { 
        winter: { high: 59, low: 43 }, 
        spring: { high: 68, low: 54 }, 
        summer: { high: 82, low: 68 }, 
        fall: { high: 73, low: 59 } 
      },
      conditions: month >= 6 && month <= 8 ? "Hot and dry" : month >= 11 || month <= 2 ? "Cool and possibly rainy" : "Mild weather",
      recommendations: ["Layered clothing", "Comfortable walking shoes", "Light rain jacket", "Sun hat"],
      clothingSuggestions: {
        tops: month >= 6 && month <= 8 ? ["Linen shirts", "Cotton blouses", "Light tops"] : ["Long-sleeve shirts", "Light sweaters", "Cardigans"],
        bottoms: month >= 6 && month <= 8 ? ["Linen pants", "Light shorts", "Maxi dresses"] : ["Jeans", "Pants", "Long dresses with tights"],
        outerwear: month >= 6 && month <= 8 ? ["Light shawl", "Thin cardigan"] : ["Jacket", "Trench coat", "Warm sweater"],
        footwear: ["Comfortable walking shoes", "Sandals", "Boat shoes", "Sneakers"],
        accessories: ["Sun hat", "Scarf", "Crossbody bag", "Sunglasses"]
      },
      weatherEssentials: month >= 6 && month <= 8 ? ["High SPF sunscreen", "Cooling towel", "Hand fan"] : ["Compact umbrella", "Moisturizer", "Lip balm", "Rain poncho"]
    },
    // Alaska
    "alaska": {
      temperatures: { 
        winter: { high: 23, low: 11 }, 
        spring: { high: 46, low: 32 }, 
        summer: { high: 65, low: 50 }, 
        fall: { high: 44, low: 29 } 
      },
      conditions: "Cool temperatures year-round, possible rain",
      recommendations: ["Warm layers", "Waterproof jacket", "Warm hat and gloves", "Sturdy boots", "Thermal underwear"],
      clothingSuggestions: {
        tops: ["Thermal base layers", "Fleece jackets", "Wool sweaters", "Long-sleeve shirts", "Insulated vests"],
        bottoms: ["Thermal leggings", "Warm pants", "Jeans", "Waterproof pants", "Long underwear"],
        outerwear: ["Waterproof parka", "Insulated jacket", "Rain poncho", "Wind-resistant shell"],
        footwear: ["Waterproof hiking boots", "Warm socks", "Boot warmers", "Non-slip sole shoes"],
        accessories: ["Warm hat", "Insulated gloves", "Scarf", "Neck warmer", "Waterproof gloves"]
      },
      weatherEssentials: ["Hand/foot warmers", "Waterproof phone case", "Thermal blanket", "Lip balm with SPF", "Moisturizing lotion", "Binoculars for wildlife"]
    },
    // Northern Europe/Scandinavia
    "norway": {
      temperatures: { 
        winter: { high: 30, low: 19 }, 
        spring: { high: 50, low: 36 }, 
        summer: { high: 66, low: 52 }, 
        fall: { high: 48, low: 37 } 
      },
      conditions: "Cool and potentially wet",
      recommendations: ["Warm clothing", "Waterproof outerwear", "Thermal layers", "Warm accessories", "Waterproof boots"],
      clothingSuggestions: {
        tops: ["Merino wool base layers", "Fleece mid-layers", "Waterproof shell jacket", "Warm sweaters"],
        bottoms: ["Thermal pants", "Waterproof trousers", "Warm jeans", "Leggings for layering"],
        outerwear: ["Gore-Tex jacket", "Insulated parka", "Wool coat", "Rain jacket"],
        footwear: ["Waterproof hiking boots", "Warm wool socks", "Insulated boots", "Grip-sole shoes"],
        accessories: ["Wool hat", "Waterproof gloves", "Warm scarf", "Rain hat with brim"]
      },
      weatherEssentials: ["Waterproof backpack cover", "Quick-dry towel", "Travel umbrella", "Vitamin D supplements", "Warm thermos"]
    },
    // Default for other destinations
    "tropical": {
      temperatures: { 
        winter: { high: 80, low: 70 }, 
        spring: { high: 83, low: 73 }, 
        summer: { high: 86, low: 76 }, 
        fall: { high: 84, low: 74 } 
      },
      conditions: "Warm tropical climate",
      recommendations: ["Light clothing", "Sunscreen", "Hat", "Swimwear", "Sandals"],
      clothingSuggestions: {
        tops: ["Breathable cotton shirts", "Tank tops", "Linen blouses", "UV protection shirts"],
        bottoms: ["Light shorts", "Flowing pants", "Beach wraps", "Swimwear"],
        outerwear: ["Light cardigan for AC", "Beach cover-up"],
        footwear: ["Comfortable sandals", "Water shoes", "Breathable sneakers"],
        accessories: ["Wide-brim hat", "Beach bag", "Sunglasses", "Sarong"]
      },
      weatherEssentials: ["High SPF sunscreen", "After-sun care", "Insect repellent", "Cooling towel", "Electrolyte drinks"]
    }
  };

  // Find matching destination pattern
  const destKey = Object.keys(weatherPatterns).find(key => 
    destination.toLowerCase().includes(key) || 
    key.includes(destination.toLowerCase().substring(0, 6))
  );

  const pattern = weatherPatterns[destKey || "tropical"];
  const season = month >= 3 && month <= 5 ? "spring" :
                month >= 6 && month <= 8 ? "summer" :
                month >= 9 && month <= 11 ? "fall" : "winter";

  return {
    destination,
    date,
    season,
    temperature: pattern.temperatures[season] || pattern.temperatures.summer,
    conditions: pattern.conditions,
    recommendations: pattern.recommendations,
    clothingSuggestions: pattern.clothingSuggestions,
    weatherEssentials: pattern.weatherEssentials,
    source: "Historical weather patterns"
  };
}
