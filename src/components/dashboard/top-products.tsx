const products = [
  {
    name: "Pepsi 2L",
    revenue: "₹45,000",
    sold: 620,
    growth: "+12%",
  },
  {
    name: "Maggi",
    revenue: "₹32,000",
    sold: 430,
    growth: "+8%",
  },
  {
    name: "Coca Cola",
    revenue: "₹28,000",
    sold: 350,
    growth: "+5%",
  },
  {
    name: "Sprite",
    revenue: "₹22,000",
    sold: 270,
    growth: "+3%",
  },
];

export default function TopProducts() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Top Performing Products
        </h2>

        <span className="text-sm text-slate-500">
          This Month
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Revenue</th>
              <th className="p-4 text-left">Units Sold</th>
              <th className="p-4 text-left">Growth</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.name}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4 text-green-600 font-semibold">
                  {product.revenue}
                </td>

                <td className="p-4">
                  {product.sold}
                </td>

                <td className="p-4 text-green-600 font-semibold">
                  {product.growth}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}