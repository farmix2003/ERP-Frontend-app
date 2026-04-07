import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductsTable from "../features/products/components/ProductsTable";
import { products as mockProducts } from "../data/Products";

const ITEMS_PER_PAGE = 5;

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase();

    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.sku.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.status.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage product inventory and stock levels</p>
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white outline-none transition bg-transparent focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 outline-none transition focus:border-gray-500 dark:focus:border-gray-400"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Office">Office</option>
              <option value="Software">Software</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-500 dark:border-gray-600 dark:text-gray-300 dark:focus:border-gray-400"
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Total Products:{" "}
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>
        </div>
      </div>

      <ProductsTable products={paginatedProducts} />

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;