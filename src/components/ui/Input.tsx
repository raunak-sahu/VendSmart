import {
  InputHTMLAttributes,
} from "react";
import clsx from "clsx";

type Props =
  InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className,
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200",
        className
      )}
    />
  );
}