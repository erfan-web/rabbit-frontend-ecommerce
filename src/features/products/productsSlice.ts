import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrorMessage } from "@/shared/lib/api/getApiErrorMessage";
import { productsApi, type ProductFilters } from "@/features/products/api";
import type { Product } from "@/shared/types";

export { type ProductFilters };
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
  async (filters: ProductFilters) => productsApi.getByFilters(filters)
);
export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (key: string) => productsApi.getBySearch(key)
);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => productsApi.getAll()
);
export const fetchHomeProducts = createAsyncThunk(
  "products/fetchHomeProducts",
  async () => productsApi.getHomeProducts()
);
export const fetchProductDetail = createAsyncThunk(
  "products/fetchDetail",
  async (id: string) => productsApi.getDetail(id)
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id: string) => productsApi.getSimilar(id)
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    productData,
  }: {
    id: string | undefined;
    productData: Partial<Product>;
  }) => productsApi.update(id, productData)
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkApi) => {
    try {
      return await productsApi.remove(id);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);

// -------------------- State Interface --------------------
interface ProductsState {
  products: Product[];
  homeProducts: Product[];
  searchProducts: Product[];
  similarProducts: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  loadingProducts: boolean;
  loadingHome: boolean;
  loadingDetail: boolean;
  loadingSimilar: boolean;
  loadingSearch: boolean;
  error: string | null | undefined;
}

// -------------------- Initial State --------------------
const initialState: ProductsState = {
  products: [],
  homeProducts: [],
  searchProducts: [],
  selectedProduct: null,
  similarProducts: [],
  filters: initialFilters,
  loadingProducts: false,
  loadingHome: false,
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
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loadingHome = true;
        state.error = null;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loadingHome = false;
        state.homeProducts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loadingHome = false;
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
