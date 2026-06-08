"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@/types";

interface LinkDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: Link | null;
}

export default function LinkDetailsModal({
  open,
  onOpenChange,
  link,
}: LinkDetailsModalProps) {
  if (!link) return null;

  const fields = [
    { label: "ID", value: link.id },
    // { label: "User ID", value: link.user_id },
    { label: "Link Name", value: link.link_name },
    { label: "URL", value: link.url },
    { label: "Description", value: link.description },
    { label: "Liked", value: link.is_liked ? "Yes" : "No" },
    // { label: "Created At", value: link.created_at },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Link Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {fields.map((field) => (
            <div
              key={field.label}
              className="grid grid-cols-[150px_1fr] gap-4 border-b pb-3"
            >
              <span className="font-medium text-muted-foreground">
                {field.label}
              </span>

              {field.label === "URL" && field.value ? (
                <a
                  href={field.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-500 hover:underline"
                >
                  {field.value}
                </a>
              ) : (
                <span className="break-words">
                  {(field.value?.toString() || "-").slice(0, 30)} {((field.value?.toString() || "-").length ?? 0) >= 30 && <span>...</span>}
                </span>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}