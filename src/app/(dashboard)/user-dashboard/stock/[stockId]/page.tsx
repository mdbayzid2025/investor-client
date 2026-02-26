"use client";

import UserStockDetailsPage from "@/components/dashboard/Stock/UserStockDetailPage/UserStockDetailsPage";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MOCK_STOCK } from "../../../../../../public/data/MockStockData";

export function StockDetails() {
  

  return <UserStockDetailsPage />;
}

export default StockDetails;
