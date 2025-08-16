import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "../../use-toast";
import { CruiseDetailsForm } from "@/components/CruiseDetailsForm";
import { PackingSection } from "@/components/PackingSection";
import { MobileHeader } from "@/components/MobileHeader";
import { insertPackingListSchema, PackingItem } from "@shared/schema";
import { apiRequest } from "../queryClient";
import { 
  Ship, 
  Shirt, 
  Bus, 
  Waves, 
  WashingMachine, 
  Smartphone, 
  FileText, 
  PlusCircle,
  Save,
  FileDown,
  Printer,
  Trash2,
  CheckCircle
} from "lucide-react";

// Default packing items
const defaultItems: Record<string, PackingItem[]> = {
  clothing: [
    // Formal wear
    { id: "suits", name: "Suits/Formal Dresses", category: "clothing", subcategory: "formal", checked: false, quantity: 1, isCustom: false },
    { id: "dress-shirts", name: "Dress Shirts/Blouses", category: "clothing", subcategory: "formal", checked: false, quantity: 2, isCustom: false },
    { id: "dress-shoes", name: "Dress Shoes", category: "clothing", subcategory: "formal", checked: false, quantity: 1, isCustom: false },
    { id: "ties", name: "Ties/Accessories", category: "clothing", subcategory: "formal", checked: false, quantity: 2, isCustom: false },
    
    // Casual wear
    { id: "t-shirts", name: "T-shirts/Casual Tops", category: "clothing", subcategory: "casual", checked: true, quantity: 5, isCustom: false },
    { id: "shorts-pants", name: "Shorts/Pants", category: "clothing", subcategory: "casual", checked: true, quantity: 4, isCustom: false },
    { id: "casual-shoes", name: "Casual Shoes/Sneakers", category: "clothing", subcategory: "casual", checked: true, quantity: 2, isCustom: false },
    { id: "light-jacket", name: "Light Jacket/Sweater", category: "clothing", subcategory: "casual", checked: true, quantity: 1, isCustom: false },
    
    // Swimwear
    { id: "swimsuits", name: "Swimsuits/Trunks", category: "clothing", subcategory: "swimwear", checked: true, quantity: 3, isCustom: false },
    { id: "cover-ups", name: "Cover-ups/Sarongs", category: "clothing", subcategory: "swimwear", checked: true, quantity: 2, isCustom: false },
    { id: "flip-flops", name: "Flip-flops/Sandals", category: "clothing", subcategory: "swimwear", checked: true, quantity: 2, isCustom: false },
  ],
  toiletries: [
    // Basic toiletries
    { id: "toothbrush", name: "Toothbrush & Toothpaste", category: "toiletries", subcategory: "basic", checked: true, quantity: 1, isCustom: false },
    { id: "shampoo", name: "Shampoo & Conditioner", category: "toiletries", subcategory: "basic", checked: true, quantity: 1, isCustom: false },
    { id: "body-wash", name: "Body Wash/WashingMachine", category: "toiletries", subcategory: "basic", checked: true, quantity: 1, isCustom: false },
    { id: "deodorant", name: "Deodorant", category: "toiletries", subcategory: "basic", checked: true, quantity: 1, isCustom: false },
    { id: "razor", name: "Razor & Shaving Cream", category: "toiletries", subcategory: "basic", checked: true, quantity: 1, isCustom: false },
    
    // Health & personal care
    { id: "medications", name: "Prescription Medications", category: "toiletries", subcategory: "health", checked: true, quantity: 1, isCustom: false },
    { id: "sunscreen", name: "Sunscreen (SPF 30+)", category: "toiletries", subcategory: "health", checked: true, quantity: 2, isCustom: false },
    { id: "motion-sickness", name: "Motion Sickness Pills", category: "toiletries", subcategory: "health", checked: false, quantity: 1, isCustom: false },
    { id: "first-aid", name: "Basic First Aid Kit", category: "toiletries", subcategory: "health", checked: false, quantity: 1, isCustom: false },
    { id: "contact-solution", name: "Contact Solution & Cases", category: "toiletries", subcategory: "health", checked: false, quantity: 1, isCustom: false },
  ],
  electronics: [
    { id: "phone-charger", name: "Phone & Charger", category: "electronics", checked: true, quantity: 1, isCustom: false },
    { id: "battery-pack", name: "Portable Battery Pack", category: "electronics", checked: true, quantity: 1, isCustom: false },
    { id: "camera", name: "Camera", category: "electronics", checked: false, quantity: 1, isCustom: false },
    { id: "tablet", name: "Tablet/E-reader", category: "electronics", checked: false, quantity: 1, isCustom: false },
    { id: "headphones", name: "Headphones", category: "electronics", checked: false, quantity: 1, isCustom: false },
    { id: "adapters", name: "Adapters/Converters", category: "electronics", checked: false, quantity: 1, isCustom: false },
  ],
  documents: [
    { id: "passport", name: "Passport (Valid 6+ months)", category: "documents", checked: true, quantity: 1, isCustom: false },
    { id: "cruise-tickets", name: "Cruise Tickets/Confirmation", category: "documents", checked: true, quantity: 1, isCustom: false },
    { id: "travel-insurance", name: "Travel Insurance", category: "documents", checked: true, quantity: 1, isCustom: false },
    { id: "credit-cards", name: "Credit Cards & Cash", category: "documents", checked: true, quantity: 1, isCustom: false },
    { id: "drivers-license", name: "Driver's License/ID", category: "documents", checked: false, quantity: 1, isCustom: false },
    { id: "emergency-contacts", name: "Emergency Contact Info", category: "documents", checked: false, quantity: 1, isCustom: false },
  ],
  additional: [
    { id: "sunglasses", name: "Sunglasses", category: "additional", checked: true, quantity: 2, isCustom: false },
    { id: "beach-towels", name: "Beach/Pool Towels", category: "additional", checked: true, quantity: 2, isCustom: false },
    { id: "snorkel-gear", name: "Snorkel Gear", category: "additional", checked: false, quantity: 1, isCustom: false },
    { id: "books", name: "Books/Magazines", category: "additional", checked: false, quantity: 3, isCustom: false },
    { id: "day-pack", name: "Day Pack/Bag", category: "additional", checked: false, quantity: 1, isCustom: false },
    { id: "water-bottle", name: "Reusable Water Bottle", category: "additional", checked: false, quantity: 1, isCustom: false },
  ],
};

export default function CruisePackingPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [items, setItems] = useState<Record<string, PackingItem[]>>(defaultItems);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const form = useForm({
    resolver: zodResolver(insertPackingListSchema.omit({ items: true })),
    defaultValues: {
      name: "My Cruise Packing List",
      cruiseName: "",
      departureDate: "",
      cruiseLength: "",
      destinations: "",
      cabinType: "",
      weather: "",
      notes: "",
    },
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (currentListId) {
        return apiRequest("PUT", `/api/packing-lists/${currentListId}`, data);
      } else {
        return apiRequest("POST", "/api/packing-lists", data);
      }
    },
    onSuccess: async (response) => {
      const data = await response.json();
      if (!currentListId) {
        setCurrentListId(data.id);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/packing-lists"] });
      toast({
        title: "Success",
        description: "Packing list saved successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save packing list. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    const formData = form.getValues();
    const allItems: Record<string, PackingItem> = {};
    
    Object.values(items).flat().forEach(item => {
      allItems[item.id] = item;
    });

    saveMutation.mutate({
      ...formData,
      items: allItems,
      notes: notes.general || "",
    });
  };

  const handleUpdateItem = (itemId: string, updates: Partial<PackingItem>) => {
    setItems(prev => {
      const newItems = { ...prev };
      Object.keys(newItems).forEach(category => {
        const itemIndex = newItems[category].findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          newItems[category][itemIndex] = { ...newItems[category][itemIndex], ...updates };
        }
      });
      return newItems;
    });
  };

  const handleAddCustomItem = (newItem: Omit<PackingItem, 'id'>) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const item: PackingItem = { ...newItem, id };
    
    setItems(prev => ({
      ...prev,
      [newItem.category]: [...prev[newItem.category], item],
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(prev => {
      const newItems = { ...prev };
      Object.keys(newItems).forEach(category => {
        newItems[category] = newItems[category].filter(item => item.id !== itemId);
      });
      return newItems;
    });
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all items? This action cannot be undone.')) {
      setItems(defaultItems);
      form.reset();
      setNotes({});
      setCurrentListId(null);
      toast({
        title: "Cleared",
        description: "All items have been cleared.",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "PDF export functionality would be implemented here using a library like jsPDF.",
    });
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentListId && !saveMutation.isPending) {
        handleSave();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentListId, items, form.watch(), notes]);

  const clothingSubcategories = [
    {
      title: "Formal/Dress Wear",
      icon: <Bus className="w-4 h-4 text-gray-500" />,
      items: items.clothing.filter(item => item.subcategory === "formal"),
    },
    {
      title: "Casual Wear", 
      icon: <Shirt className="w-4 h-4 text-gray-500" />,
      items: items.clothing.filter(item => item.subcategory === "casual"),
    },
  ];

  const toiletrySubcategories = [
    {
      title: "Basic Toiletries",
      items: items.toiletries.filter(item => item.subcategory === "basic"),
    },
    {
      title: "Health & Personal Care",
      items: items.toiletries.filter(item => item.subcategory === "health"),
    },
  ];

  return (
    <div className="min-h-screen font-roboto">
      {/* Header */}
      <MobileHeader
        onSave={handleSave}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        isSaving={saveMutation.isPending}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6 sm:space-y-8">
            {/* Cruise Details Form */}
            <CruiseDetailsForm form={form} />

            {/* Packing Categories */}
            <div className="space-y-6 sm:space-y-8">
              {/* Clothing Section */}
              <PackingSection
                title="Clothing & Apparel"
                icon={<Shirt className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--theme-primary)' }} />}
                items={items.clothing}
                onUpdateItem={handleUpdateItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveItem={handleRemoveItem}
                category="clothing"
                subcategories={[
                  ...clothingSubcategories,
                  {
                    title: "Swimwear & Beachwear",
                    icon: <Waves className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} />,
                    items: items.clothing.filter(item => item.subcategory === "swimwear"),
                  }
                ]}
                colorClass="ocean-500"
                bgColorClass="ocean-50"
                notes={notes.clothing}
                onUpdateNotes={(value) => setNotes(prev => ({ ...prev, clothing: value }))}
              />

              {/* Toiletries Section */}
              <PackingSection
                title="Toiletries & Personal Care"
                icon={<WashingMachine className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--theme-secondary)' }} />}
                items={items.toiletries}
                onUpdateItem={handleUpdateItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveItem={handleRemoveItem}
                category="toiletries"
                subcategories={toiletrySubcategories}
                colorClass="teal-500"
                bgColorClass="teal-50"
                notes={notes.toiletries}
                onUpdateNotes={(value) => setNotes(prev => ({ ...prev, toiletries: value }))}
              />

              {/* Electronics Section */}
              <PackingSection
                title="Electronics & Technology"
                icon={<Smartphone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--theme-accent)' }} />}
                items={items.electronics}
                onUpdateItem={handleUpdateItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveItem={handleRemoveItem}
                category="electronics"
                colorClass="coral-500"
                bgColorClass="coral-50"
              />

              {/* Documents Section */}
              <PackingSection
                title="Documents & Important Items"
                icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--theme-accent)' }} />}
                items={items.documents}
                onUpdateItem={handleUpdateItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveItem={handleRemoveItem}
                category="documents"
                colorClass="purple-500"
                bgColorClass="purple-50"
              />

              {/* Additional Items Section */}
              <PackingSection
                title="Additional Items & Accessories"
                icon={<PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--theme-secondary)' }} />}
                items={items.additional}
                onUpdateItem={handleUpdateItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveItem={handleRemoveItem}
                category="additional"
                colorClass="green-500"
                bgColorClass="green-50"
                notes={notes.additional}
                onUpdateNotes={(value) => setNotes(prev => ({ ...prev, additional: value }))}
              />
            </div>
          </form>
        </Form>

        {/* Desktop Footer - Hide on mobile since we have mobile menu */}
        <div className="hidden sm:block border-t shadow-lg mt-8 sm:mt-12 no-print" style={{ backgroundColor: 'var(--theme-card)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-center sm:text-left">Your packing list is automatically saved as you make changes</span>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  data-testid="button-clear-all"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline">Clear All</span>
                </Button>
                
                <Button
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className="text-white px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  style={{ backgroundColor: 'var(--theme-secondary)' }}
                  data-testid="button-save-list-footer"
                >
                  {saveMutation.isPending ? (
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="hidden lg:inline">{saveMutation.isPending ? "Saving..." : "Save"}</span>
                </Button>
                
                <Button
                  onClick={handleExportPDF}
                  className="text-white px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                  data-testid="button-export-pdf-footer"
                >
                  <FileDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline">Export</span>
                </Button>
                
                <Button
                  onClick={handlePrint}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  data-testid="button-print-footer"
                >
                  <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline">Print</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
