import { create } from 'zustand';
import { IHotel } from "@/app/(pages)/(routes)/hotels/models";

interface HotelsState {
    hotels: IHotel[];
    loading: boolean;
    error: boolean;
    fetchHotels: (filters?: Record<string, string>) => void;
  }

  export const useHotelsStore = create<HotelsState>((set) => ({
    hotels: [],
    loading: false,
    error: false,
    fetchHotels: async (filters) => {
      set({ loading: true, error: false }); 
        try {
            let url = "/api/hotels";
            const params = new URLSearchParams();

            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) {
                        params.append(key, value);
                    }
                });
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch hotels");
            }
            const data = await res.json();
            set({ hotels: data, loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },
}));
