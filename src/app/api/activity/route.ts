import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      action: "Sold 24 units of Maggi",
      time: "5 mins ago",
    },
    {
      action: "Created Purchase Order #1021 for Pepsi",
      time: "18 mins ago",
    },
    {
      action: "Updated vendor Nestlé Suppliers",
      time: "1 hour ago",
    },
    {
      action: "Low stock alert for Coca Cola",
      time: "2 hours ago",
    },
    {
      action: "Received stock of Amul Milk",
      time: "3 hours ago",
    },
  ]);
}