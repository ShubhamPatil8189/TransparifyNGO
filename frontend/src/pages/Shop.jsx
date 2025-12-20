import { useEffect, useState } from "react";
import { ShoppingCart, Search, Filter, Heart, Star, Package, X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DonorNavbar from "@/components/layout/DonorNavbar";

axios.defaults.withCredentials = true;
const API = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("limit", "100");
      
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory) params.append("category", selectedCategory);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await axios.get(`${API}/products?${params.toString()}`, {
        withCredentials: true,
        headers: getAuthHeaders()
      });
      
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, {
        withCredentials: true,
        headers: getAuthHeaders()
      });
      setCart(res.data?.data);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/products/categories/all`);
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  // Add to Cart
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${API}/cart/add`,
        { productId, quantity: 1 },
        {
          withCredentials: true,
          headers: getAuthHeaders()
        }
      );
      
      setCart(res.data?.data);
      toast.success("Added to cart!");
      setShowCartSidebar(true);
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to add items to cart");
        navigate("/donor-login");
      } else {
        toast.error(error.response?.data?.message || "Failed to add to cart");
      }
    }
  };

  // Update Cart Item Quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(
        `${API}/cart/update`,
        { productId, quantity },
        {
          withCredentials: true,
          headers: getAuthHeaders()
        }
      );
      setCart(res.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`${API}/cart/remove/${productId}`, {
        withCredentials: true,
        headers: getAuthHeaders()
      });
      setCart(res.data?.data);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const cartItemsCount = cart?.totalItems || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DonorNavbar />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop Products</h1>
              <p className="text-gray-600 mt-1">Browse and purchase quality products</p>
            </div>
            
            <button
              onClick={() => setShowCartSidebar(true)}
              className="relative p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt:desc">Newest First</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="name:asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  
                  {product.stock < 10 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Only {product.stock} left
                    </span>
                  )}
                  
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate" title={product.name}>
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {product.category && (
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full mb-3">
                      {product.category}
                    </span>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <Button
                    onClick={() => addToCart(product._id)}
                    disabled={product.stock === 0}
                    className="w-full"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCartSidebar && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCartSidebar(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-blue-600 text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Your Cart ({cartItemsCount})
              </h2>
              <button onClick={() => setShowCartSidebar(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!cart || cart.items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item._id} className="bg-gray-50 rounded-lg p-4 flex gap-3">
                      <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.product?.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.product?.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          ₹{Number(item.price).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.product._id, item.quantity - 1)}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product._id, item.quantity + 1)}
                            disabled={item.quantity >= item.product?.stock}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{Number(cart.totalPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{Number(cart.totalPrice).toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setShowCartSidebar(false);
                    navigate("/checkout");
                  }}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;