"use client";

import { useState } from "react";

import { Check, Clipboard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function CodeSnippet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children as string);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-[#121212] rounded-lg overflow-hidden border border-zinc-800 break-all max-h-[400px] overflow-y-scroll  overflow-x-auto">
      <div className="text-white flex justify-between px-2 pl-4 py-2">
        <pre className="text-sm flex items-center">
          <code className="text-white text-nowrap">{children}</code>
        </pre>

        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? (
            <Check className="size-3" />
          ) : (
            <Clipboard className="size-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
