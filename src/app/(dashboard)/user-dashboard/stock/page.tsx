import StockCard from "@/components/dashboard/StockCard";
import { MOCK_STOCK } from "../../../../../public/data/MockStockData";

export function Stock() {
  // Mock role - in real app this comes from auth context
  const userRole = "Investor"; // Options: Investor, Seller, Agent, Developer

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-white mb-2">
          Exclusive Stock
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Curated off-market opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {MOCK_STOCK.map((item) => (
          <StockCard
            key={item.id}
            item={item}
            canExpressInterest={["Investor", "Developer"].includes(userRole)}
          />
        ))}
      </div>
    </div>
  );
}

export default Stock;
