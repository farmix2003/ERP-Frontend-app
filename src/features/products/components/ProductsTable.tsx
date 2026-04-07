import type { ProductItem } from "../../../data/Products";

interface ProductsTableProps {
    products: ProductItem[];
}

const ProductsTable = ({ products }:ProductsTableProps) => {
 if(products.length === 0) {
    return (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center shadow-sm dark:shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No products found
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try changing your search or filters.
        </p>
      </div>
    )
    }
    const getStatusColor = (status: ProductItem["status"]) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
            case "Out of Stock":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
            default:
                return "";
        }
    };
    return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-2xl">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                                {product.status}
                              </span>
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
