import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map(item => 
              item.productId === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...currentItems, { 
              productId: product.id, 
              productCode: product.productCode,
              name: product.name, 
              wholesalePrice: product.wholesalePrice,
              image: product.images?.[0],
              quantity 
            }]
          });
        }
      },
      
      removeFromCart: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }
        set({
          items: get().items.map(item => 
            item.productId === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        // This is a rough preview for the user. Actual calculated total happens securely on the backend.
        return get().items.reduce((total, item) => total + (item.wholesalePrice * item.quantity), 0);
      }
    }),
    {
      name: 'al-ameen-cart'
    }
  )
);
