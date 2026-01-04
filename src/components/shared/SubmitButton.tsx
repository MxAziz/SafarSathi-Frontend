import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2, Save } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="gap-2 w-full sm:w-auto">
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}