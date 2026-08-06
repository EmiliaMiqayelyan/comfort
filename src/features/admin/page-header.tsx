"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  createLabel?: string;
  onCreate?: () => void;
}

export function PageHeader({ title, description, createLabel, onCreate }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      </div>
      {createLabel && onCreate && (
        <Button
          onClick={onCreate}
          className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" />
          {createLabel}
        </Button>
      )}
    </div>
  );
}
