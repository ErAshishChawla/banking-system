"use client";

import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getColorFromString, getRandomHexColor } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountNames = accounts.map((account) => account.name);
  const balances = accounts.map((account) => account.currentBalance);
  const colors = accounts?.map((account) => getColorFromString(account.id));

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
    labels: accountNames,
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
