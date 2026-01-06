import { Inbox } from "lucide-react";

export default function EmptyState({
  message = "No data found",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
        <Inbox className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        It&apos;s quite empty here!
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mt-2">
        {message}. Check back later for new activities.
      </p>
    </div>
  );
}