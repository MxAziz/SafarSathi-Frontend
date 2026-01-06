"use client";

import { motion } from "framer-motion";
import { Star, Plane, CreditCard, User, Activity, CheckCircle2, Clock, } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";
import { IActivity } from "@/types/activity.interface";

// 1. Helper to group activities by date
const groupActivitiesByDate = (activities: IActivity[]) => {
  const groups: { [key: string]: IActivity[] } = {};

  activities.forEach((activity) => {
    const dateKey = format(new Date(activity.createdAt), "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(activity);
  });

  return groups;
};

// 2. Icon & Color Config
const getActivityConfig = (type: string) => {
  switch (type) {
    case "REVIEW":
      return {
        icon: Star,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-100 dark:bg-amber-900/30",
        border: "border-amber-200 dark:border-amber-800",
      };
    case "TRIP_CREATE":
      return {
        icon: Plane,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-200 dark:border-blue-800",
      };
    case "PAYMENT":
      return {
        icon: CreditCard,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        border: "border-emerald-200 dark:border-emerald-800",
      };
    case "USER_REGISTER":
      return {
        icon: User,
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-100 dark:bg-violet-900/30",
        border: "border-violet-200 dark:border-violet-800",
      };
    default:
      return {
        icon: Activity,
        color: "text-slate-600 dark:text-slate-400",
        bg: "bg-slate-100 dark:bg-slate-800",
        border: "border-slate-200 dark:border-slate-700",
      };
  }
};

// 3. Date Header Component
const DateHeader = ({ dateStr }: { dateStr: string }) => {
  const date = new Date(dateStr);
  let label = format(date, "MMMM d, yyyy");

  if (isToday(date)) label = "Today";
  if (isYesterday(date)) label = "Yesterday";

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-px flex-1 bg-border/60"></div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-background px-2 border rounded-full py-1">
        {label}
      </span>
      <div className="h-px flex-1 bg-border/60"></div>
    </div>
  );
};

export default function ActivityFeed({
  activities,
}: {
  activities: IActivity[];
}) {
  if (!activities || activities.length === 0) return null;

  const groupedActivities = groupActivitiesByDate(activities);
  const sortedDates = Object.keys(groupedActivities).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="">
      {sortedDates.map((date) => (
        <div key={date} className="relative">
          {/* Date Header */}
          <DateHeader dateStr={date} />

          <div className="space-y-6 pl-4 md:pl-0">
            {groupedActivities[date].map((activity, index) => {
              const config = getActivityConfig(activity.type);
              const Icon = config.icon;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex gap-4 group"
                >
                  {/* Vertical Line Connector (Optional Visual) */}
                  <div className="absolute left-[19px] top-10 -bottom-6 w-0.5 bg-border/50 group-last:hidden md:left-[19px]" />

                  {/* Icon Circle */}
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all group-hover:scale-105",
                      config.bg,
                      config.border,
                      config.color
                    )}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                    {/* Tiny status indicator */}
                    <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-background ring-1 ring-border">
                      <CheckCircle2 className="h-2 w-2 text-green-500" />
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="flex-1 pb-2">
                    <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit",
                            config.bg,
                            config.color
                          )}
                        >
                          {activity.type.replace("_", " ")}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Clock size={12} />
                          {format(new Date(activity.createdAt), "h:mm a")}
                        </div>
                      </div>

                      <p className="text-sm font-medium text-foreground leading-snug">
                        {activity.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}