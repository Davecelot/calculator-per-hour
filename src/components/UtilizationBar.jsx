import React from 'react';

export default function UtilizationBar({ billablePct, weeks, hoursPerWeek }) {
    // Calculate total hours per year
    const totalCapacity = weeks * hoursPerWeek;
    const billableHours = totalCapacity * (billablePct / 100);
    const overheadHours = totalCapacity - billableHours;

    // Calculate days (assuming 8h day for visualization context)
    const billableDays = Math.round(billableHours / 8);
    const overheadDays = Math.round(overheadHours / 8);

    return (
        <div className="mt-4 p-4 border border-border rounded bg-surfaceHighlight/10">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase text-textMuted tracking-wider">
                    System Load (Utilization)
                </span>
                <span className="text-xs font-mono text-textMuted">
                    {billablePct}% Core Load
                </span>
            </div>

            {/* Bar */}
            <div className="h-4 w-full bg-surfaceHighlight rounded-sm overflow-hidden flex">
                <div
                    className="h-full bg-white transition-all duration-500 ease-out relative group"
                    style={{ width: `${billablePct}%` }}
                >
                    {/* Dither pattern overlay for billable part */}
                    <div className="absolute inset-0 opacity-20 bg-dither"></div>
                </div>
                <div className="h-full flex-grow bg-border/30 relative">
                    {/* Diagonal stripes for overhead */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.2) 5px, rgba(0,0,0,0.2) 10px)' }}></div>
                </div>
            </div>

            {/* Legend / Stats */}
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs font-mono">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <span className="text-text">Billable</span>
                    </div>
                    <div className="text-textMuted pl-4">
                        {Math.round(billableHours)}h / {billableDays} days
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-border rounded-sm"></div>
                        <span className="text-textMuted">Overhead / Idle</span>
                    </div>
                    <div className="text-textMuted pl-4">
                        {Math.round(overheadHours)}h / {overheadDays} days
                    </div>
                </div>
            </div>
        </div>
    );
}
