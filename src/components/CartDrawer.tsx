import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="drawer-content" aria-label="Sacola de compras">
        <div className="drawer-header">
          <h2 className="drawer-title">Sua Sacola ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Fechar">
            &times;
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
              Sua sacola está vazia.
            </p>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{product.name}</h4>
                  <p className="cart-item-price">{product.priceFormatted}</p>
                  <div className="cart-qty-controls">
                    <button 
                      type="button" 
                      className="qty-btn" 
                      onClick={() => onUpdateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button 
                      type="button" 
                      className="qty-btn" 
                      onClick={() => onUpdateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      style={{ marginLeft: 'auto', fontSize: '12px', color: '#888', textDecoration: 'underline' }}
                      onClick={() => onRemoveItem(product.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
            <button 
              type="button" 
              className="checkout-btn"
              onClick={() => alert('Finalizar compra — Demonstração Moth Streetwear')}
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
