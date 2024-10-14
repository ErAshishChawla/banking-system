"use client";

import React from "react";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  amount: number;
}

function AnimatedCounter({ amount }: AnimatedCounterProps) {
  return <CountUp decimal={"."} prefix={"$"} end={amount} decimals={2} />;
}

export default AnimatedCounter;
