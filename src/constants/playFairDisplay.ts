import { Playfair_Display } from "next/font/google";

const playFairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export {playFairDisplay}