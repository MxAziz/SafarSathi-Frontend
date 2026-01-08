"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";

export function DateRangeFilter({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();


  const initialDate: DateRange | undefined =
    searchParams.get("startDate") && searchParams.get("endDate")
      ? {
          from: new Date(searchParams.get("startDate")!),
          to: new Date(searchParams.get("endDate")!),
        }
      : undefined;

  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);


  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);

    const params = new URLSearchParams(searchParams.toString());

    if (selectedDate?.from) {
      params.set("startDate", format(selectedDate.from, "yyyy-MM-dd"));
    } else {
      params.delete("startDate");
    }

    if (selectedDate?.to) {
      params.set("endDate", format(selectedDate.to, "yyyy-MM-dd"));
    } else {
      params.delete("endDate");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // ক্লিয়ার করার ফাংশন
  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate");
    params.delete("endDate");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal bg-background border-input hover:bg-accent hover:text-accent-foreground",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Filter by Date</span>
            )}
            {date && (
              <span
                onClick={clearDate}
                className="ml-auto rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <X className="h-3 w-3" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}