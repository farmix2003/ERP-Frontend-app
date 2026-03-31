import type { ProductItem } from "../../../data/Products";

interface ProductsTableProps {
    products: ProductItem[];
}

const ProductsTable = ({ products }:ProductsTableProps) => {
 if(products.length === 0) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          No products found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    )
    }
    const getStatusColor = (status: ProductItem["status"]) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800";
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800";
            case "Out of Stock":
                return "bg-red-100 text-red-800";
            default:
                return "";
        }
    };
    return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                            <td className={`px-6 py-4 whitespace-nowrap ${getStatusColor(product.status)}`}>
                                {product.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )

}

export default ProductsTable;