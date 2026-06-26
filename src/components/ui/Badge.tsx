import clsx from "clsx";

type Props = {
  color?:
    | "green"
    | "red"
    | "yellow"
    | "blue";

  children: React.ReactNode;
};

export default function Badge({
  color = "blue",
  children,
}: Props) {
  const styles = {
    green:
      "bg-green-100 text-green-700",

    red:
      "bg-red-100 text-red-700",

    yellow:
      "bg-yellow-100 text-yellow-700",

    blue:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        styles[color]
      )}
    >
      {children}
    </span>
  );
}