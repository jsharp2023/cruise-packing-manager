import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Palette } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

export function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Palette className="w-4 h-4 text-current opacity-70" />
      <Select value={currentTheme.id} onValueChange={setTheme}>
        <SelectTrigger className="w-40 bg-white/10 border-white/20 text-current" data-testid="theme-selector">
          <SelectValue placeholder="Choose theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id} data-testid={`theme-option-${theme.id}`}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border" 
                  style={{ backgroundColor: theme.primary }}
                />
                {theme.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}