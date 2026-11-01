import { useState, useMemo, useRef } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ProductCursor } from './components/ProductCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogToolbar, type SortOption } from './components/CatalogToolbar';
import { ProductCard } from './components/ProductCard';
import { ProductPage } from './components/ProductPage';
import { CartDrawer } from './components/CartDrawer';
import { FilterDrawer } from './components/FilterDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import type { Product, CartItem } from './types';
import { gsap, useGSAP } from './lib/gsap';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const catalogRef = useRef<HTMLElement>(null);

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    const itemKey = size ? `${product.id}-${size}-${color || ''}` : product.id;
    setCart((prev) => {
      const existing = prev.find((item) => (item.product as any).cartKey === itemKey || item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product: { ...product, name: size ? `${product.name} (${size})` : product.name }, quantity: 1 }];
    });
    triggerToast(`"${product.name}" ${size ? `[${size}]` : ''} adicionado à sacola!`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        triggerToast(`"${product.name}" removido dos favoritos.`);
        return prev.filter((id) => id !== product.id);
      } else {
        triggerToast(`"${product.name}" salvo nos favoritos!`);
        return [...prev, product.id];
      }
    });
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortOption]);

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (inStockOnly ? 1 : 0) || 2;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Figma node mapping for the 4 primary products
  const nodeIdsMap: Record<string, { image: string; text: string }> = {
    'prod-1': { image: '10:9', text: '10:11' },
    'prod-2': { image: '10:13', text: '10:22' },
    'prod-3': { image: '10:16', text: '10:23' },
    'prod-4': { image: '10:19', text: '10:24' },
  };

  // Product Grid Stagger Scroll Animation with useGSAP
  useGSAP(() => {
    if (currentView !== 'home' || !catalogRef.current) return;

    gsap.from('.product-card', {
      scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 70,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: catalogRef, dependencies: [processedProducts, currentView] });

  const handleSelectProduct = () => {
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className="moth-store-app" data-node-id="1:3">
        {/* Floating "Click" text only on hover over products, no circles, no border */}
        <ProductCursor />

        {/* 1. Header Navigation */}
        <Header
          cartCount={totalCartCount}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => {
            if (wishlist.length === 0) {
              triggerToast('Sua lista de favoritos está vazia.');
            } else {
              triggerToast(`${wishlist.length} item(ns) favoritados.`);
            }
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogoClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={(category) => {
            setCurrentView('home');
            triggerToast(`Coleção ${category === 'men' ? 'Masculina (Men)' : 'Feminina (Women)'} selecionada.`);
            catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <main>
          {currentView === 'home' ? (
            <>
              {/* Hero Section: Parallax & Interactive 3D "Locomotive ® drop" */}
              <Hero />

              {/* Catalog Section: Toolbar & Staggered Product Grid */}
              <section 
                ref={catalogRef} 
                className="catalog-section" 
                aria-label="Catálogo de Produtos"
              >
                {/* Order by + / [2] Filter */}
                <CatalogToolbar
                  currentSort={sortOption}
                  onSortChange={setSortOption}
                  activeFilterCount={activeFilterCount}
                  onToggleFilter={() => setIsFilterOpen(true)}
                />

                {/* Product Cards Grid */}
                <div className="products-grid">
                  {processedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      onSelectProduct={handleSelectProduct}
                      nodeIdImage={nodeIdsMap[product.id]?.image}
                      nodeIdText={nodeIdsMap[product.id]?.text}
                    />
                  ))}
                </div>
              </section>

              {/* Footer */}
              <Footer />
            </>
          ) : (
            /* Product Detail Page from Node 19:3 */
            <ProductPage
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={(prod, size, color) => handleAddToCart(prod, size, color)}
            />
          )}
        </main>

        {/* Interactive Drawers & Modals */}
        <CartDrawer
          isOpen={isCartOpen}
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
        />

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly(!inStockOnly)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(p) => {
            handleSelectProduct();
            handleAddToCart(p);
          }}
        />

        {/* Toast Feedback */}
        {toastMessage && (
          <aside className="toast-notice" role="status" aria-live="polite">
            {toastMessage}
          </aside>
        )}
      </div>
    </SmoothScroll>
  );
}
