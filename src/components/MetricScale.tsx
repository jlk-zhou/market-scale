import { useEffect, useState } from "react";

interface MetricScaleProps {
  label: string;
  value: number;
  industryAvg: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export const MetricScale = ({ label, value, industryAvg, unit = "", higherIsBetter = true }: MetricScaleProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Calculate percentage position (0-100)
  // We'll use a range where industry average is at 50%
  const range = Math.max(Math.abs(value - industryAvg) * 2, industryAvg * 2);
  const min = Math.max(0, industryAvg - range / 2);
  const max = industryAvg + range / 2;
  
  const stockPosition = ((value - min) / (max - min)) * 100;
  
  const isAboveAverage = value > industryAvg;
  const difference = ((value - industryAvg) / industryAvg) * 100;

  // Determine whether the metric should be considered "positive".
  // By default (higherIsBetter = true) higher-than-average is positive.
  // For metrics like P/E where higher is worse, pass higherIsBetter={false}
  // from the parent so the colors are inverted.
  const isPositive = higherIsBetter ? isAboveAverage : !isAboveAverage;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(stockPosition);
    }, 100);
    return () => clearTimeout(timer);
  }, [stockPosition]);

  return (
    <div className="space-y-4 p-6 rounded-xl bg-card border border-border shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            {value.toFixed(2)}{unit}
          </span>
          <span className={`text-sm font-medium ${isPositive ? 'text-positive' : 'text-destructive'}`}>
            {isAboveAverage ? '+' : ''}{difference.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative h-3 bg-muted rounded-sm overflow-hidden">
          {/* Industry average marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/60 z-10"
            style={{ left: `50%` }}
          />
          
          {/* Stock value bar */}
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              isPositive ? 'bg-positive' : 'bg-destructive'
            }`}
            style={{ width: `${animatedValue}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Min: {min.toFixed(2)}{unit}
          </span>
          <span className="text-muted-foreground font-medium handwritten-highlight">
            Industry Avg: {industryAvg.toFixed(2)}{unit}
          </span>
          <span className="text-muted-foreground">
            Max: {max.toFixed(2)}{unit}
          </span>
        </div>
      </div>
    </div>
  );
};
