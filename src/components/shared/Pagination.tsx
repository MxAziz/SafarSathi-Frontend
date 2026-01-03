"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPage: number;
}

const Pagination = ({ currentPage, totalPage }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full py-4 mt-4 border-t">
      {/* Mobile View Text: */}
      <span className="text-sm text-muted-foreground sm:hidden">
        Page {currentPage} of {totalPage}
      </span>

      {/* Desktop View Text:  */}
      <span className="hidden lg:inline-block text-sm text-muted-foreground">
        Showing page {currentPage} of {totalPage}
      </span>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
          className="h-8 w-8 p-0 sm:w-auto sm:px-4 lg:px-4"
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Number Buttons:  */}
        <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPage) }, (_, index) => {
            let pageNumber;

            if (totalPage <= 5) {
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              pageNumber = index + 1;
            } else if (currentPage >= totalPage - 2) {
              pageNumber = totalPage - 4 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }
            return (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(pageNumber)}
                disabled={isPending}
                className={cn(
                  "h-8 w-8 p-0",
                  pageNumber === currentPage && "pointer-events-none"
                )}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Mobile View:*/}
        <div className="flex sm:hidden items-center px-2 text-sm font-medium">
          {currentPage} / {totalPage}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPage || isPending}
          className="h-8 w-8 p-0 sm:w-auto sm:px-4 lg:px-4"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;