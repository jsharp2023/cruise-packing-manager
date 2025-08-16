import { type PackingList, type InsertPackingList } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPackingList(id: string): Promise<PackingList | undefined>;
  createPackingList(packingList: InsertPackingList): Promise<PackingList>;
  updatePackingList(id: string, packingList: Partial<InsertPackingList>): Promise<PackingList | undefined>;
  deletePackingList(id: string): Promise<boolean>;
  getAllPackingLists(): Promise<PackingList[]>;
}

export class MemStorage implements IStorage {
  private packingLists: Map<string, PackingList>;

  constructor() {
    this.packingLists = new Map();
  }

  async getPackingList(id: string): Promise<PackingList | undefined> {
    return this.packingLists.get(id);
  }

  async createPackingList(insertPackingList: InsertPackingList): Promise<PackingList> {
    const id = randomUUID();
    const now = new Date();
    const packingList: PackingList = {
      ...insertPackingList,
      notes: insertPackingList.notes || null,
      cruiseName: insertPackingList.cruiseName || null,
      departureDate: insertPackingList.departureDate || null,
      cruiseLength: insertPackingList.cruiseLength || null,
      destinations: insertPackingList.destinations || null,
      cabinType: insertPackingList.cabinType || null,
      weather: insertPackingList.weather || null,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.packingLists.set(id, packingList);
    return packingList;
  }

  async updatePackingList(id: string, updates: Partial<InsertPackingList>): Promise<PackingList | undefined> {
    const existing = this.packingLists.get(id);
    if (!existing) return undefined;

    const updated: PackingList = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.packingLists.set(id, updated);
    return updated;
  }

  async deletePackingList(id: string): Promise<boolean> {
    return this.packingLists.delete(id);
  }

  async getAllPackingLists(): Promise<PackingList[]> {
    return Array.from(this.packingLists.values());
  }
}

export const storage = new MemStorage();
