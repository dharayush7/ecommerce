import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "w-full text-lg placeholder:text-lg h-10 rounded-none border-black outline-black focus:outline-black focus:border-2",
        className
      )}
      {...props}
    />
  );
}

function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "w-full text-lg placeholder:text-lg h-10 rounded-none border-black outline-black focus:outline-black focus:border-2",
        className
      )}
      cols={props.cols ?? 2}
      {...props}
    />
  );
}

export { Input, TextArea };
