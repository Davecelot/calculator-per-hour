import React from 'react';

export default function MarketTelemetry({ currentRate, marketRange, currency }) {
    if (!marketRange) return null;

    const { min, max } = marketRange;
    // Calculate position percentage (clamped 0-100)
    const range = max - min;
    const position = Math.min(100, Math.max(0, ((currentRate - min) / range) * 100));

    let status = 'Competitive';
    let color = 'text-green-400';

    if (currentRate < min) {
        status = 'Underpriced';
        color = 'text-yellow-400';
    } else if (currentRate > max) {
        status = 'Premium';
        color = 'text-purple-400';
    }

    return (
        <div className="mt-4 p-4 border border-border rounded bg-surfaceHighlight/10">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase text-textMuted tracking-wider">
                    Market Signal
                </span>
                <span className={`text-xs font-mono ${color}`}>
                    {status}
                </span>
            </div>

            {/* Gauge Bar */}
            <div className="relative h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden">
                {/* Gradient Zone */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-green-500/20 to-purple-500/20"></div>

                {/* Indicator */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
                    style={{ left: `${position}%` }}
                ></div>
            </div>

            <div className="flex justify-between mt-1 text-[10px] font-mono text-textMuted">
                <span>{min} {currency}</span>
                <span>{max} {currency}</span>
            </div>
        </div>
    );
}
