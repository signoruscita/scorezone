import { LoginForm } from "@/components/ui/8bit/blocks/login-form";
import { LoginForm as LoginForm2 } from "@/components/ui/8bit/blocks/login-form-2";
import { LoginForm as LoginFormWithImage } from "@/components/ui/8bit/blocks/login-form-with-image";

import CopyCommandButton from "../../docs/components/copy-command-button";
import { OpenInV0Button } from "../../docs/components/open-in-v0-button";
import LoginPage from "../../login/page";

export default function AuthenticationBlocks() {
  return (
    <>
      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px]">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            A simple login form
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <CopyCommandButton
              command="npx shadcn@latest add 8bit-login-form"
              copyCommand={`pnpm dlx shadcn@canary add ${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-login-form.json`}
            />
            <OpenInV0Button name="8bit-login-form" className="w-fit" />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <LoginForm />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        <h2 className="text-sm text-muted-foreground sm:pl-3">
          A two column login page with a cover image.
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <CopyCommandButton
            command="npx shadcn@latest add 8bit-login-page"
            copyCommand={`pnpm dlx shadcn@canary add ${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-login-page.json`}
          />
          <OpenInV0Button name="8bit-login-page" className="w-fit" />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[400px] relative border rounded-md">
        <div className="w-full">
          <LoginPage />
        </div>
      </div>

      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px]">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            A simple login form with icons
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <CopyCommandButton
              command="npx shadcn@latest add 8bit-login-form-2"
              copyCommand={`pnpm dlx shadcn@canary add ${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-login-form-2.json`}
            />
            <OpenInV0Button name="8bit-login-form-2" className="w-fit" />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <LoginForm2 />
        </div>
      </div>

      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px]">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            A simple login form with image
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <CopyCommandButton
              command="npx shadcn@latest add 8bit-login-form-with-image"
              copyCommand={`pnpm dlx shadcn@  canary add ${process.env.NEXT_PUBLIC_BASE_URL}/r/8bit-login-form-with-image.json`}
            />
            <OpenInV0Button
              name="8bit-login-form-with-image"
              className="w-fit"
            />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative w-full max-w-sm md:max-w-4xl mx-auto">
          <LoginFormWithImage />
        </div>
      </div>
    </>
  );
}
