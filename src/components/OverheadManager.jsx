import React, { useState, useEffect } from 'react';

export default function OverheadManager({ totalOverhead, setTotalOverhead, currency, region }) {
    const [items, setItems] = useState([
        { id: 1, name: 'Software / SaaS', cost: 0 },
        { id: 2, name: 'Hardware / Equipment', cost: 0 },
        { id: 3, name: 'Office / Coworking', cost: 0 },
        { id: 4, name: 'Insurance / Legal', cost: 0 },
    ]);

    // Reset items when region changes (new preset applied)
    useEffect(() => {
        // When region changes, we reset to a single item matching the new totalOverhead
        // This assumes the parent has already updated totalOverhead via applyPreset
        setItems([{ id: Date.now(), name: 'General Overhead (Preset)', cost: totalOverhead }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region]);

    const updateItem = (id, field, value) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setItems(newItems);
        const newTotal = newItems.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
        setTotalOverhead(newTotal);
    };

    const addItem = () => {
        const newItem = { id: Date.now(), name: 'New Expense', cost: 0 };
        const newItems = [...items, newItem];
        setItems(newItems);
    };

    const removeItem = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        const newTotal = newItems.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
        setTotalOverhead(newTotal);
    };

    return (
        <div className="col-span-1 md:col-span-2 border border-border rounded bg-surfaceHighlight/5 p-4">
            <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase text-textMuted tracking-wider">
                    System Loadout (Overhead)
                </label>
                <div className="text-xs font-mono text-text">
                    Total: <span className="text-green-400">{totalOverhead}</span> {currency}
                </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center group">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="flex-grow bg-background border border-border rounded px-2 py-1 text-xs font-mono text-text focus:border-white focus:outline-none transition-colors"
                            placeholder="Expense Name"
                        />
                        <div className="relative w-24">
                            <input
                                type="number"
                                value={item.cost}
                                onChange={(e) => updateItem(item.id, 'cost', parseFloat(e.target.value))}
                                className="w-full bg-background border border-border rounded px-2 py-1 text-xs font-mono text-text text-right focus:border-white focus:outline-none transition-colors"
                                min="0"
                            />
                        </div>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-textMuted hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                            title="Remove Module"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="mt-3 w-full py-1 border border-dashed border-border rounded text-xs text-textMuted hover:text-text hover:border-text transition-all flex items-center justify-center gap-2"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Module
            </button>
        </div>
    );
}
