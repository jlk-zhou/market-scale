import { useState } from "react";
import { StockSearch } from "@/components/StockSearch";
import { StockResults } from "@/components/StockResults";
import { BarChart3 } from "lucide-react";

// Dummy data for demonstration
const getDummyStockData = (ticker: string) => {
  const companies: Record<string, any> = {
    AAPL: {
      companyName: "Apple Inc.",
      industry: "Technology",
      currentRatio: 1.07,
      peRatio: 29.5,
      roe: 147.4,
      industryAvg: {
        currentRatio: 1.5,
        peRatio: 25.3,
        roe: 18.2
      }
    },
    MSFT: {
      companyName: "Microsoft Corporation",
      industry: "Technology",
      currentRatio: 1.78,
      peRatio: 35.2,
      roe: 43.5,
      industryAvg: {
        currentRatio: 1.5,
        peRatio: 25.3,
        roe: 18.2
      }
    },
    TSLA: {
      companyName: "Tesla, Inc.",
      industry: "Automotive",
      currentRatio: 1.52,
      peRatio: 71.3,
      roe: 28.1,
      industryAvg: {
        currentRatio: 1.2,
        peRatio: 12.5,
        roe: 15.4
      }
    }
  };
  return companies[ticker] || {
    companyName: `${ticker} Inc.`,
    industry: "Technology",
    currentRatio: 1.45,
    peRatio: 22.8,
    roe: 16.7,
    industryAvg: {
      currentRatio: 1.5,
      peRatio: 25.3,
      roe: 18.2
    }
  };
};
const Index = () => {
  const [stockData, setStockData] = useState<any>(null);
  const handleSearch = (ticker: string) => {
    const data = getDummyStockData(ticker);
    setStockData({
      ticker,
      ...data
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 bg-neutral-50">
          <a href="/" className="inline-block hover:opacity-70 transition-opacity">
            <BarChart3 className="h-8 w-8 text-primary" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          {!stockData && <div className="text-center space-y-6 py-12">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  <span className="handwritten-highlight">Analyze</span> Stock Fundamentals
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Compare key financial metrics against industry averages to make <span className="handwritten-underline">informed investment decisions</span>
                </p>
              </div>
            </div>}

          {/* Search */}
          <StockSearch onSearch={handleSearch} />

          {/* Results */}
          {stockData && <StockResults data={stockData} />}

          {/* Features Grid */}
          {!stockData && <div className="grid md:grid-cols-3 gap-6 pt-12">
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-2">Current Ratio</h3>
                <p className="text-sm text-muted-foreground">
                  Measure a company's ability to pay short-term obligations
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-2">P/E Ratio</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate stock valuation relative to earnings
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-2">Return on Equity</h3>
                <p className="text-sm text-muted-foreground">
                  Assess profitability and efficiency of equity investments
                </p>
              </div>
            </div>}
        </div>
      </main>
    </div>;
};
export default Index;