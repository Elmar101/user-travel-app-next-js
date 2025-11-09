import { create } from 'zustand';
import { IHotel, IRentaCar } from "@/app/(pages)/(routes)/hotels/models";

interface RentaCarState {
    cars: IRentaCar[];
    loading: boolean;
    error: boolean;
    fetchCars: (filters?: Record<string, string>) => void;
  }

  export const useRentaCarStore = create<RentaCarState>((set) => ({
    cars: [],
    loading: false,
    error: false,
    fetchCars: async (filters) => {
      set({ loading: true, error: false });
        try {
            let url = "/api/rent-a-cars";
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
                throw new Error("Failed to fetch cars");
            }
            const data = await res.json();
            set({ cars: data, loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },
}));
