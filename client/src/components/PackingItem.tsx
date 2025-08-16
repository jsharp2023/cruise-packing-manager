import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { PackingItem as PackingItemType } from "@shared/schema";

interface PackingItemProps {
  item: PackingItemType;
  onUpdate: (updates: Partial<PackingItemType>) => void;
  onRemove?: () => void;
  colorClass?: string;
}

export function PackingItem({ item, onUpdate, onRemove, colorClass = "ocean-500" }: PackingItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
      onUpdate({ quantity: newQuantity });
    }
  };

  const handleCheckedChange = (checked: boolean) => {
    onUpdate({ checked });
  };

  return (
    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <Checkbox
          checked={item.checked}
          onCheckedChange={handleCheckedChange}
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          style={{ accentColor: 'var(--theme-primary)' }}
          data-testid={`checkbox-${item.id}`}
        />
        <span className="text-xs sm:text-sm truncate">{item.name}</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-gray-400 hover:text-gray-600"
          onClick={() => handleQuantityChange(quantity - 1)}
          data-testid={`button-decrease-${item.id}`}
        >
          <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
          className="w-8 sm:w-12 text-center border border-gray-300 rounded quantity-input text-xs sm:text-sm"
          min="0"
          max="99"
          data-testid={`input-quantity-${item.id}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-gray-400 hover:text-gray-600"
          onClick={() => handleQuantityChange(quantity + 1)}
          data-testid={`button-increase-${item.id}`}
        >
          <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
        </Button>
        {item.isCustom && onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-red-500 hover:text-red-600 ml-1 sm:ml-2"
            onClick={onRemove}
            data-testid={`button-remove-${item.id}`}
          >
            <X className="w-2 h-2 sm:w-3 sm:h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
