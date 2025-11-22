import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/helpers/axiosInstance";
import type { Product } from "../../types";

export interface ProductFilters {
  collection?: string;
  size?: string;
  color?: string;
  gender?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string;
  brand?: string;
  limit?: string | number;
}

export const initialFilters: ProductFilters = {
  collection: "",
  size: "",
  color: "",
  gender: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "",
  category: "",
  material: "",
  brand: "",
  limit: "",
};

// -------------------- Async Thunks --------------------
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (filters: ProductFilters) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.append(key, String(value));
      }
    });
    const res = await api.get(`/products?${query.toString()}`);
    return res.data;
  }
);
export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (key: string) => {
    const res = await api.get(`/products?search=${key}`);
    return res.data;
  }
);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await api.get(`/products`);
    return res.data;
  }
);
export const fetchProductDetail = createAsyncThunk(
  "products/fetchDetail",
  async (id: string) => {
    const res = await api.get(`/products/single/${id}`);
    return res.data;
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id: string) => {
    const res = await api.get(`/products/similar/${id}`);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    productData,
  }: {
    id: string | undefined;
    productData: Partial<Product>;
  }) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkApi) => {
    try {
      const res = await api.delete(`/products/${id}`);
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response.data.error || "server error"
      );
    }
  }
);

// -------------------- State Interface --------------------
interface ProductsState {
  products: Product[];
  searchProducts: Product[];
  similarProducts: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  loadingProducts: boolean;
  loadingDetail: boolean;
  loadingSimilar: boolean;
  loadingSearch: boolean;
  error: string | null | undefined;
}

// -------------------- Initial State --------------------
const initialState: ProductsState = {
  products: [],
  searchProducts: [],
  selectedProduct: null,
  similarProducts: [],
  filters: initialFilters,
  loadingProducts: false,
  loadingDetail: false,
  loadingSimilar: false,
  loadingSearch: false,
  error: null,
};

// -------------------- Slice --------------------
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    clearSearchProducts: (state) => {
      state.loadingSearch = false;
      state.searchProducts = [];
    },
    setProductsAfterDelete: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch by filters
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loadingProducts = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loadingSearch = true;
        state.searchProducts = [];
        state.error = null;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      });

    //  Fetch product detail
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.error.message;
      });

    //  Fetch similar products
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loadingSimilar = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loadingSimilar = false;
        state.similarProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loadingSimilar = false;
        state.error = action.error.message;
      });

    //  Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.products[index] = updated;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// -------------------- Exports --------------------
export const {
  setFilters,
  clearFilters,
  clearSearchProducts,
  setProductsAfterDelete,
} = productSlice.actions;

export default productSlice.reducer;
