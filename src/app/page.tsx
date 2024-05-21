import NoSSR from "./NoSSR";
import { Slice } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import App from "@/components/App";

export default function HomePage() {
  return (
    <NoSSR>
      <div className="h-full flex flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">
            <div className="flex">
              <div className="w-8 flex-none">
                <Slice />
              </div>
              <div className="flex-grow">Katana</div>
            </div>
          </h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
              <a
                className="text-sm font-medium transition-colors hover:text-primary"
                href="https://github.com/callmephilip/katana"
                target="_blank"
              >
                Source
              </a>
            </nav>
          </div>
        </div>

        <Separator />

        <div className="container h-full py-6">
          <div className="grid h-full items-stretch">
            <App />
          </div>
        </div>
      </div>
    </NoSSR>
  );
}
