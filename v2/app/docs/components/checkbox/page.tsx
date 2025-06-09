import { Metadata } from "next";

import { checkboxMetaData } from "@/lib/metadata";

import { Checkbox } from "@/components/ui/8bit/checkbox";
import { Label } from "@/components/ui/8bit/label";
import { Separator } from "@/components/ui/separator";

import CodeSnippet from "../code-snippet";
import CopyCommandButton from "../copy-command-button";
import InstallationCommands from "../installation-commands";
import { OpenInV0Button } from "../open-in-v0-button";

export const metadata: Metadata = {
  title: "8-bit Checkbox",
  description: "Displays an 8-bit checkbox component.",
  openGraph: {
    images: checkboxMetaData,
  },
};

export default function CheckboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">Checkbox</h1>
        <CopyCommandButton
          copyCommand={`pnpm dlx shadcn@canary add ${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-checkbox.json`}
          command={"pnpm dlx shadcn@canary add 8bit-checkbox"}
        />
      </div>

      <p className="text-muted-foreground">
        Displays an 8-bit checkbox component.
      </p>

      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            8-bit checkbox component
          </h2>

          <div className="flex items-center gap-2">
            <OpenInV0Button name="8bit-checkbox" className="w-fit" />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <div className="flex items-center gap-4">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-xs">
              Accept terms and conditions
            </Label>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold">Installation</h3>

      <Separator />

      <InstallationCommands
        packageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-checkbox.json`}
      />

      <h3 className="text-lg font-bold mt-10">Usage</h3>

      <Separator />

      <CodeSnippet>{`import { Checkbox } from "@/components/ui/8bit/checkbox"`}</CodeSnippet>

      <CodeSnippet>{`<Checkbox />`}</CodeSnippet>
    </div>
  );
}
