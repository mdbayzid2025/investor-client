import StockCard from "@/components/dashboard/StockCard";
import { MOCK_STOCK } from "../../../../../public/data/MockStockData";
import StockPage from "@/components/dashboard/Stock";

export function Stock() {
  // Mock role - in real app this comes from auth context
  const userRole = "Investor"; // Options: Investor, Seller, Agent, Developer

  return <StockPage />
}

export default Stock;
