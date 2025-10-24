import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StockSearchProps {
  onSearch: (ticker: string) => void;
}

export const StockSearch = ({ onSearch }: StockSearchProps) => {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      onSearch(ticker.toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter stock ticker (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="pl-12 h-14 text-lg bg-card border-glass backdrop-blur-sm"
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="h-14 px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Analyze
        </Button>
      </div>
    </form>
  );
};
