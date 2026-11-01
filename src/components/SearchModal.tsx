import { useState } from 'react';
import type { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div 
        style={{
          position: 'fixed',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          background: '#ffffff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          zIndex: 60,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px' }}>Buscar na Moth</h3>
          <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <input
          type="text"
          autoFocus
          placeholder="Digite o que procura (ex: tote, socks, hat, t-shirt)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
          }}
        />

        <div style={{ marginTop: '16px', maxHeight: '300px', overflowY: 'auto' }}>
          {query.trim() && filtered.length === 0 && (
            <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '16px' }}>
              Nenhum produto encontrado para "{query}".
            </p>
          )}

          {filtered.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                onSelectProduct(prod);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <img src={prod.image} alt={prod.name} style={{ width: '48px', height: '60px', objectFit: 'cover' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>{prod.name}</p>
                <p style={{ fontSize: '13px', color: '#666' }}>{prod.priceFormatted}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
