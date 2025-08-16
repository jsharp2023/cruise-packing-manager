import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { Ship } from "lucide-react";

interface CruiseDetailsFormProps {
  form: UseFormReturn<any>;
}

export function CruiseDetailsForm({ form }: CruiseDetailsFormProps) {
  return (
    <div style={{ backgroundColor: 'var(--theme-card)' }} className="rounded-xl card-shadow p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
        <Ship className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
        Cruise Details
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="cruiseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cruise Name/Ship</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Royal Caribbean Symphony"
                  data-testid="input-cruise-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="date"
                  data-testid="input-departure-date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cruiseLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Length</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-cruise-length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="3-4 days">3-4 days</SelectItem>
                  <SelectItem value="5-7 days">5-7 days</SelectItem>
                  <SelectItem value="8-10 days">8-10 days</SelectItem>
                  <SelectItem value="11-14 days">11-14 days</SelectItem>
                  <SelectItem value="15+ days">15+ days</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="destinations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Destination</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="e.g., Caribbean, Mediterranean, Alaska"
                  data-testid="input-destinations"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cabinType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-cabin-type">
                    <SelectValue placeholder="Select cabin type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Interior">Interior</SelectItem>
                  <SelectItem value="Ocean View">Ocean View</SelectItem>
                  <SelectItem value="Balcony">Balcony</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="weather"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Weather</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-weather">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tropical/Warm">Tropical/Warm</SelectItem>
                  <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="Cool/Alaska">Cool/Alaska</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Weather Display Section */}
      <div className="mt-6">
        <WeatherDisplay 
          destination={form.watch('destinations') || ''} 
          date={form.watch('departureDate') || ''} 
        />
      </div>
    </div>
  );
}
