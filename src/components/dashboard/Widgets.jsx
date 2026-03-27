/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility function to merge tailwind classes */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children }) => (
  <div className={cn("relative rounded-2xl border border-[#00C2D1]/30 dark:border-blue-500/30 bg-white/20 dark:bg-[#0B1120]/40 backdrop-blur-3xl transition-all duration-300 shadow-[0_0_40px_rgba(0,194,209,0.15)] dark:shadow-[0_0_50px_rgba(37,99,235,0.15)] hover:shadow-[0_0_60px_rgba(0,194,209,0.3)] dark:hover:shadow-[0_0_70px_rgba(37,99,235,0.3)] overflow-hidden", className)}>
    {/* Subtle Inner Glow */}
    <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-[#00C2D1]/70 to-transparent opacity-80" />
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

export const StatCard = ({ title, value, trend, trendLabel, className }) => {
  return (
    <Card className={cn("group overflow-hidden relative", className)}>
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C2D1]/[0.02] via-transparent to-[#7C3AED]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-5 px-5">
        <CardTitle className="text-[14px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="text-[2.2rem] font-bold tracking-tight text-gray-900 dark:text-white leading-none">
          {value}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider",
                trend === "up" 
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                  : trend === "down" 
                  ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" 
                  : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendLabel}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide mt-0.5">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const Table = ({ className, children, unwrapped, ...props }) => {
  const table = (
    <table className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </table>
  );
  if (unwrapped) return table;
  return (
    <div className="w-full overflow-auto">
      {table}
    </div>
  );
};

export const TableHeader = ({ className, children }) => (
  <thead className={cn("[&_tr]:border-b border-gray-100 dark:border-gray-800/60", className)}>
    {children}
  </thead>
);

export const TableBody = ({ className, children, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ className, children, ...props }) => (
  <tr className={cn("border-b border-gray-100 dark:border-gray-800/60 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/20 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800", className)} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ className, children, ...props }) => (
  <th className={cn("h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0", className)} {...props}>
    {children}
  </th>
);

export const TableCell = ({ className, children, ...props }) => (
  <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props}>
    {children}
  </td>
);

export const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-400",
    primary: "bg-[#00C2D1]/10 text-[#009BA7] dark:bg-[#00C2D1]/15 dark:text-[#00C2D1]",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-400",
    ghost: "bg-transparent text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
  };
  
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider", variants[variant], className)}>
      {children}
    </span>
  );
};
