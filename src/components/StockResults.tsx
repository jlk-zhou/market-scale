import { MetricScale } from "./MetricScale";
import { TrendingUp } from "lucide-react";

interface StockData {
  ticker: string;
  companyName: string;
  industry: string;
  currentRatio: number;
  peRatio: number;
  roe: number;
  industryAvg: {
    currentRatio: number;
    peRatio: number;
    roe: number;
  };
}

interface StockResultsProps {
  data: StockData;
}

export const StockResults = ({ data }: StockResultsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="p-6 rounded-xl bg-glass border border-glass backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-foreground">{data.ticker}</h2>
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <p className="text-lg text-muted-foreground mt-1">{data.companyName}</p>
            <p className="text-sm text-muted-foreground mt-1">Industry: {data.industry}</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground px-1">
          Fundamental Metrics vs Industry Average
        </h3>
        
        <MetricScale
          label="Current Ratio"
          value={data.currentRatio}
          industryAvg={data.industryAvg.currentRatio}
        />
        
        <MetricScale
          label="Price-to-Earnings Ratio (P/E)"
          value={data.peRatio}
          industryAvg={data.industryAvg.peRatio}
        />
        
        <MetricScale
          label="Return on Equity (ROE)"
          value={data.roe}
          industryAvg={data.industryAvg.roe}
          unit="%"
        />
      </div>

      {/* Info note */}
      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Note:</span> These metrics compare {data.ticker}'s 
          fundamental performance against the {data.industry} industry average. Green indicates above-average 
          performance, while red suggests below-average metrics.
        </p>
      </div>
    </div>
  );
};
