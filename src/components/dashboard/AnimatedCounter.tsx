"use client";

import CountUp from "react-countup";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export default function AnimatedCounter({
  value,
  prefix,
  suffix,
}: Props) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1.6}
      separator=","
      prefix={prefix}
      suffix={suffix}
    />
  );
}