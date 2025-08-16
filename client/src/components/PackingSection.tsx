import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PackingItem } from "./PackingItem";
import { PackingItem as PackingItemType } from "@shared/schema";
import { Plus } from "lucide-react";

interface PackingSectionProps {
  title: string;
  icon: React.ReactNode;
  items: PackingItemType[];
  onUpdateItem: (itemId: string, updates: Partial<PackingItemType>) => void;
  onAddCustomItem: (item: Omit<PackingItemType, 'id'>) => void;
  onRemoveItem: (itemId: string) => void;
  category: string;
  subcategories?: Array<{
    title: string;
    items: PackingItemType[];
    icon?: React.ReactNode;
  }>;
  colorClass?: string;
  bgColorClass?: string;
  notes?: string;
  onUpdateNotes?: (notes: string) => void;
}

export function PackingSection({ 
  title, 
  icon, 
  items, 
  onUpdateItem, 
  onAddCustomItem, 
  onRemoveItem,
  category,
  subcategories,
  colorClass = "ocean-500",
  bgColorClass = "ocean-50",
  notes = "",
  onUpdateNotes
}: PackingSectionProps) {
  const [customItemName, setCustomItemName] = useState("");

  const handleAddCustomItem = () => {
    if (customItemName.trim()) {
      onAddCustomItem({
        name: customItemName.trim(),
        category,
        checked: true,
        quantity: 1,
        isCustom: true,
      });
      setCustomItemName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomItem();
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--theme-card)' }} className="rounded-xl card-shadow overflow-hidden print-section">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b" style={{ backgroundColor: 'var(--theme-background)' }}>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2 sm:gap-3">
          {icon}
          {title}
        </h2>
      </div>
      
      <div className="p-4 sm:p-6">
        {subcategories ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {subcategories.map((subcategory, index) => (
              <div key={index}>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  {subcategory.icon}
                  {subcategory.title}
                </h3>
                <div className="space-y-3">
                  {subcategory.items.map((item) => (
                    <PackingItem
                      key={item.id}
                      item={item}
                      onUpdate={(updates) => onUpdateItem(item.id, updates)}
                      onRemove={item.isCustom ? () => onRemoveItem(item.id) : undefined}
                      colorClass={colorClass}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={`Add custom ${subcategory.title.toLowerCase()} item...`}
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 text-sm"
                      data-testid={`input-custom-item-${subcategory.title.replace(/\s+/g, '-').toLowerCase()}`}
                    />
                    <Button
                      type="button"
                      onClick={handleAddCustomItem}
                      className="text-white text-sm"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                      data-testid={`button-add-custom-${subcategory.title.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item) => (
              <PackingItem
                key={item.id}
                item={item}
                onUpdate={(updates) => onUpdateItem(item.id, updates)}
                onRemove={item.isCustom ? () => onRemoveItem(item.id) : undefined}
                colorClass={colorClass}
              />
            ))}
          </div>
        )}
        
        {!subcategories && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add custom item..."
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                data-testid={`input-custom-item-${category.replace(/\s+/g, '-').toLowerCase()}`}
              />
              <Button
                type="button"
                onClick={handleAddCustomItem}
                className="text-white"
                style={{ backgroundColor: 'var(--theme-primary)' }}
                data-testid={`button-add-custom-${category.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {onUpdateNotes && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {title} Notes & Special Considerations
            </label>
            <Textarea
              value={notes}
              onChange={(e) => onUpdateNotes(e.target.value)}
              className="w-full resize-none focus:ring-2 focus:border-transparent"
              rows={3}
              placeholder={`Add notes about ${title.toLowerCase()}, special considerations, etc.`}
              data-testid={`textarea-notes-${category.replace(/\s+/g, '-').toLowerCase()}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
