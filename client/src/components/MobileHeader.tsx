import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSelector } from "./ThemeSelector";
import { 
  Ship, 
  Save, 
  FileDown, 
  Printer, 
  Menu,
  CheckCircle
} from "lucide-react";

interface MobileHeaderProps {
  onSave: () => void;
  onExportPDF: () => void;
  onPrint: () => void;
  isSaving: boolean;
}

export function MobileHeader({ onSave, onExportPDF, onPrint, isSaving }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--theme-header-bg)', color: 'var(--theme-header-text)' }} className="shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          <div className="flex items-center gap-3">
            <Ship className="w-6 h-6" style={{ color: 'var(--theme-secondary)' }} />
            <div>
              <h1 className="text-lg font-bold">Cruise Packing</h1>
              <p className="text-xs opacity-80">Your cruise checklist</p>
            </div>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-current hover:bg-white/10"
                data-testid="mobile-menu-trigger"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu & Settings</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Theme</h3>
                  <ThemeSelector />
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">Actions</h3>
                  <div className="space-y-2">
                    <Button
                      onClick={() => { onSave(); setIsOpen(false); }}
                      disabled={isSaving}
                      className="w-full justify-start"
                      style={{ 
                        backgroundColor: 'var(--theme-primary)', 
                        color: 'var(--theme-primary-foreground)'
                      }}
                      data-testid="mobile-save-button"
                    >
                      {isSaving ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {isSaving ? "Saving..." : "Save List"}
                    </Button>
                    
                    <Button
                      onClick={() => { onExportPDF(); setIsOpen(false); }}
                      variant="outline"
                      className="w-full justify-start"
                      data-testid="mobile-export-button"
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    
                    <Button
                      onClick={() => { onPrint(); setIsOpen(false); }}
                      variant="outline"
                      className="w-full justify-start"
                      data-testid="mobile-print-button"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Ship className="w-8 h-8" style={{ color: 'var(--theme-secondary)' }} />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Cruise Packing List Generator</h1>
              <p className="text-sm opacity-80">Create your perfect cruise packing checklist</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSelector />
            
            <div className="flex gap-2 no-print">
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="px-4 py-2 font-medium transition-colors duration-200 flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--theme-secondary)', 
                  color: 'var(--theme-primary-foreground)'
                }}
                data-testid="desktop-save-button"
              >
                {isSaving ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden lg:inline">{isSaving ? "Saving..." : "Save List"}</span>
              </Button>
              
              <Button
                onClick={onExportPDF}
                className="px-4 py-2 font-medium transition-colors duration-200 flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--theme-accent)', 
                  color: 'var(--theme-primary-foreground)'
                }}
                data-testid="desktop-export-button"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden lg:inline">Export PDF</span>
              </Button>
              
              <Button
                onClick={onPrint}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 font-medium transition-colors duration-200 flex items-center gap-2 text-white"
                data-testid="desktop-print-button"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden lg:inline">Print</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}