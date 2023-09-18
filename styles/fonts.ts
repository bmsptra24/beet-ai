import { Bricolage_Grotesque, Dela_Gothic_One, Jost } from "next/font/google";
import "@/app/globals.css";

export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--bricolage-grotesque",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--jost",
});

export const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--dela-gothic-one",
});
