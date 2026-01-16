import { useEffect, useState } from "react";
import { Plus, Trash, Edit, Package, Search, X, Image, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import DashboardHeader from "@/components/layout/DashboardHeader";

// Configure axios defaults for this component
axios.defaults.withCredentials = true;

const API = "https://transparifyngo.onrender.com/api/products";

// Helper function to get token from localStorage as backup
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt:desc");

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  // Fetch Products with filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("limit", "100");
      
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory) params.append("category", selectedCategory);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await axios.get(`${API}?${params.toString()}`, { 
        withCredentials: true,
        headers: getAuthHeaders()
      });
      
      const productsData = res.data?.data || res.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (error) {
      console.error("Fetch products error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please login to view products");
      } else {
        toast.error(error.response?.data?.message || "Failed to load products");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Dashboard Stats (Admin only)
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/admin/stats/dashboard`, {
        withCredentials: true,
        headers: getAuthHeaders()
      });
      
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.log("Stats fetch failed (user might not be admin):", error.response?.data?.message);
      setStats(null);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories/all`, {
        withCredentials: true,
        headers: getAuthHeaders()
      });
      const cats = res.data?.data || res.data || [];
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({ 
      name: "", 
      price: "", 
      stock: "", 
      description: "", 
      category: "", 
      imageUrl: "" 
    });
    setEditMode(false);
    setCurrentProduct(null);
  };

  const submitProduct = async () => {
    if (!form.name?.trim()) {
      toast.error("Product name is required");
      return;
    }
    
    if (!form.price || parseFloat(form.price) < 0) {
      toast.error("Valid price is required");
      return;
    }
    
    if (form.stock === "" || parseInt(form.stock) < 0) {
      toast.error("Valid stock quantity is required");
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        description: form.description?.trim() || "",
        category: form.category?.trim() || "",
        imageUrl: form.imageUrl?.trim() || "",
      };

      if (editMode && currentProduct) {
        const res = await axios.put(
          `${API}/${currentProduct._id}`, 
          payload, 
          { 
            withCredentials: true,
            headers: getAuthHeaders()
          }
        );
        
        if (res.data?.success) {
          toast.success(res.data.message || "Product updated successfully");
        }
      } else {
        const res = await axios.post(
          API, 
          payload, 
          { 
            withCredentials: true,
            headers: getAuthHeaders()
          }
        );
        
        if (res.data?.success) {
          toast.success(res.data.message || "Product added successfully");
        }
      }

      setOpen(false);
      resetForm();
      fetchProducts();
      fetchStats();
      fetchCategories();
    } catch (error) {
      console.error("Submit product error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please login to perform this action");
      } else {
        const errorMsg = error.response?.data?.message || 
                        error.response?.data?.error || 
                        "Operation failed";
        toast.error(errorMsg);
      }
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await axios.delete(`${API}/${id}`, { 
        withCredentials: true,
        headers: getAuthHeaders()
      });
      
      if (res.data?.success) {
        toast.success(res.data.message || "Product deleted successfully");
      }
      
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error("Delete product error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please login to delete products");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setForm({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
      category: product.category || "",
      imageUrl: product.imageUrl || "",
    });
    setOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setOpen(true);
  };

  const displayedProducts = products;
  const totalStock = stats?.totalStock || products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockCount = stats?.lowStockProducts || products.filter((p) => p.stock < 10).length;
  const totalProducts = stats?.totalProducts || products.length;

  return (
    <>
      <DashboardHeader title="TransparifyNGO" subtitle="Product Management" />

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalProducts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalStock}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Alert</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{lowStockCount}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {stats?.activeProducts || products.filter(p => p.isActive).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt:desc">Newest First</option>
              <option value="createdAt:asc">Oldest First</option>
              <option value="name:asc">Name (A-Z)</option>
              <option value="name:desc">Name (Z-A)</option>
              <option value="price:asc">Price (Low to High)</option>
              <option value="price:desc">Price (High to Low)</option>
              <option value="stock:asc">Stock (Low to High)</option>
              <option value="stock:desc">Stock (High to Low)</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''}
            </p>
            <Button onClick={openAddModal} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery || selectedCategory 
                  ? "No products found matching your filters" 
                  : "No products yet. Add your first product!"}
              </p>
              {(searchQuery || selectedCategory) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <Image className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{p.name}</p>
                            {p.description && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{p.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {p.category ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {p.category}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">₹{Number(p.price).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.stock === 0
                              ? "bg-gray-100 text-gray-700"
                              : p.stock < 10
                              ? "bg-red-100 text-red-700"
                              : p.stock < 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => openEditModal(p)}
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => deleteProduct(p._id)}
                            title="Delete product"
                          >
                            <Trash className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Product Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editMode ? "Edit Product" : "Add New Product"}
                </h2>
                <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Enter product name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Category
                    </label>
                    <Input
                      placeholder="e.g., Electronics, Clothing"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      list="categories-list"
                    />
                    <datalist id="categories-list">
                      {categories.map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="0.00"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="0"
                      name="stock"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter product description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    maxLength="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {form.description.length}/500 characters
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Image URL
                  </label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    name="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                  {form.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-contain border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          toast.error("Failed to load image from URL");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitProduct}>
                  {editMode ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;