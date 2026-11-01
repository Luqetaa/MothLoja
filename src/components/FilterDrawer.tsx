interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  inStockOnly,
  onToggleInStock,
}) => {
  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'apparel', label: 'Roupas & Camisetas' },
    { id: 'headwear', label: 'Bonés & Chapéus' },
    { id: 'accessories', label: 'Bolsas & Acessórios' },
  ];

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="drawer-content" aria-label="Filtros de produtos">
        <div className="drawer-header">
          <h2 className="drawer-title">Filtros</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Fechar">
            &times;
          </button>
        </div>

        <div className="drawer-body">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '14px' }}>
              Categorias
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map((cat) => (
                <label 
                  key={cat.id} 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => onSelectCategory(cat.id)}
                    style={{ accentColor: '#070707' }}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '14px' }}>
              Disponibilidade
            </h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={onToggleInStock}
                style={{ accentColor: '#070707' }}
              />
              <span>Apenas em estoque (Pronta entrega)</span>
            </label>
          </div>
        </div>

        <div className="drawer-footer">
          <button 
            type="button" 
            className="checkout-btn" 
            onClick={onClose}
          >
            Aplicar Filtros
          </button>
        </div>
      </aside>
    </>
  );
};
