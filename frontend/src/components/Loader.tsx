import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Loader = ({ styling }: { styling?: string }) => {
  return <Loader2 className={cn("w-5 h-5 animate-spin text-emerald-400", styling)} />;
};
