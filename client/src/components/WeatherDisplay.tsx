import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Thermometer,
  Eye,
  Calendar,
  Shirt,
  Umbrella,
  ShoppingBag
} from 'lucide-react';

interface WeatherData {
  destination: string;
  date: string;
  season: string;
  temperature: {
    high: number;
    low: number;
  };
  conditions: string;
  recommendations: string[];
  clothingSuggestions: {
    tops: string[];
    bottoms: string[];
    outerwear: string[];
    footwear: string[];
    accessories: string[];
  };
  weatherEssentials: string[];
  source: string;
}

interface WeatherDisplayProps {
  destination: string;
  date: string;
}

export function WeatherDisplay({ destination, date }: WeatherDisplayProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (destination && date) {
      fetchWeatherData();
    }
  }, [destination, date]);

  const fetchWeatherData = async () => {
    if (!destination.trim() || !date) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather?destination=${encodeURIComponent(destination)}&date=${date}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Could not load weather information');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (conditions: string, season: string) => {
    if (conditions.toLowerCase().includes('rain') || conditions.toLowerCase().includes('wet')) {
      return <CloudRain className="w-5 h-5" style={{ color: 'var(--theme-secondary)' }} />;
    }
    if (conditions.toLowerCase().includes('snow') || season === 'winter') {
      return <Snowflake className="w-5 h-5" style={{ color: 'var(--theme-secondary)' }} />;
    }
    if (conditions.toLowerCase().includes('sunny') || conditions.toLowerCase().includes('warm')) {
      return <Sun className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} />;
    }
    return <Cloud className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />;
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-800';
      case 'summer': return 'bg-yellow-100 text-yellow-800';
      case 'fall': return 'bg-orange-100 text-orange-800';
      case 'winter': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!destination || !date) {
    return (
      <Card className="border-dashed border-2" style={{ backgroundColor: 'var(--theme-background)', opacity: 0.7 }}>
        <CardContent className="p-4 text-center">
          <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm text-gray-500">Enter destination and travel date to see weather predictions</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card style={{ backgroundColor: 'var(--theme-card)' }}>
        <CardContent className="p-4 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200" style={{ backgroundColor: 'var(--theme-card)' }}>
        <CardContent className="p-4 text-center">
          <Cloud className="w-6 h-6 mx-auto mb-2 text-red-400" />
          <p className="text-sm text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) return null;

  return (
    <Card style={{ backgroundColor: 'var(--theme-card)' }} className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {getWeatherIcon(weatherData.conditions, weatherData.season)}
          Weather Forecast for {weatherData.destination}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Temperature and Season */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
            <span className="text-sm font-medium">
              {weatherData.temperature.high}°F / {weatherData.temperature.low}°F
            </span>
          </div>
          <Badge className={getSeasonColor(weatherData.season)}>
            {weatherData.season.charAt(0).toUpperCase() + weatherData.season.slice(1)}
          </Badge>
        </div>

        {/* Date and Conditions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {new Date(weatherData.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          <p className="text-sm" style={{ color: 'var(--theme-primary)' }}>
            {weatherData.conditions}
          </p>
        </div>

        <Separator />

        {/* General Recommendations */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--theme-primary)' }}>
            <ShoppingBag className="w-4 h-4" />
            Quick Recommendations:
          </h4>
          <div className="flex flex-wrap gap-1">
            {weatherData.recommendations.map((item, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="text-xs"
                style={{ 
                  backgroundColor: 'var(--theme-background)', 
                  color: 'var(--theme-primary)' 
                }}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Detailed Clothing Suggestions */}
        {weatherData.clothingSuggestions && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--theme-primary)' }}>
              <Shirt className="w-4 h-4" />
              Clothing Suggestions:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Tops:</h5>
                <div className="flex flex-wrap gap-1">
                  {weatherData.clothingSuggestions.tops.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Bottoms:</h5>
                <div className="flex flex-wrap gap-1">
                  {weatherData.clothingSuggestions.bottoms.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Outerwear:</h5>
                <div className="flex flex-wrap gap-1">
                  {weatherData.clothingSuggestions.outerwear.slice(0, 2).map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Footwear:</h5>
                <div className="flex flex-wrap gap-1">
                  {weatherData.clothingSuggestions.footwear.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-1">Accessories:</h5>
              <div className="flex flex-wrap gap-1">
                {weatherData.clothingSuggestions.accessories.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Weather Essentials */}
        {weatherData.weatherEssentials && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--theme-primary)' }}>
              <Umbrella className="w-4 h-4" />
              Weather Essentials:
            </h4>
            <div className="flex flex-wrap gap-1">
              {weatherData.weatherEssentials.map((item, index) => (
                <Badge 
                  key={index} 
                  className="text-xs"
                  style={{ 
                    backgroundColor: 'var(--theme-accent)', 
                    color: 'white' 
                  }}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-2 border-t">
          Source: {weatherData.source}
        </div>
      </CardContent>
    </Card>
  );
}