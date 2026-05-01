import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itinerariesData from "../../components/admin/MyItineraries/data.json";

// Async thunk to simulate backend
export const fetchItineraries = createAsyncThunk(
  "filter/fetchItineraries",
  async (filters, thunkAPI) => {
    try {
      await new Promise((res) => setTimeout(res, 300)); // simulate delay
      let data = [...itinerariesData];

      const selectedTypes = Array.isArray(filters.leadTypes)
        ? filters.leadTypes.map((t) => String(t).toLowerCase())
        : [];
      if (selectedTypes.length && !selectedTypes.includes("all")) {
        data = data.filter((item) => selectedTypes.includes(String(item.type).toLowerCase()));
      }

      if (filters.city) {
        const search = String(filters.city).toLowerCase();
        data = data.filter((item) => item.name.toLowerCase().includes(search));
      }

      console.log("data",data);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Error fetching local data");
    }
  }
);

const initialState = {
  leadTypes: ["All"],
  city: "",
  travelers: "",
  duration: "",
  travelDate: { from: null, to: null },
  hotelCategories: [],
  budget: { min: 0, max: 1000000 },
  itineraries: [],
  isLoading: false,
  error: null
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleLeadType: (state, action) => {
      if (state.leadTypes.includes(action.payload)) {
        state.leadTypes = state.leadTypes.filter((t) => t !== action.payload);
      } else {
        state.leadTypes.push(action.payload);
      }
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setTravelers: (state, action) => {
      state.travelers = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setDate: (state, action) => {
      state.travelDate[action.payload.field] = action.payload.value;
    },
    toggleHotel: (state, action) => {
      if (state.hotelCategories.includes(action.payload)) {
        state.hotelCategories = state.hotelCategories.filter((h) => h !== action.payload);
      } else {
        state.hotelCategories.push(action.payload);
      }
    },
    setBudget: (state, action) => {
      state.budget[action.payload.field] = action.payload.value;
    },
    resetFilters: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itineraries = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;