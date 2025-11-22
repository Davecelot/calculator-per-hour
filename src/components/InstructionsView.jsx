import React from 'react';

export default function InstructionsView({ t }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Overview */}
            <section className="card">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                    <span className="w-1 h-5 bg-white"></span>
                    {t.instructions?.overview?.title || "Overview"}
                </h2>
                <div className="prose prose-invert max-w-none text-sm text-textMuted">
                    <p>{t.instructions?.overview?.content || "Welcome to the Rate Calculator. This tool helps you calculate your hourly rate based on your annual income goals, overhead, and project specifics."}</p>
                </div>
                {t.instructions?.overview?.example && (
                    <div className="mt-4 p-3 border border-border rounded bg-surfaceHighlight/10 font-mono text-xs text-textMuted">
                        {t.instructions?.overview?.example}
                    </div>
                )}
            </section>

            {/* Configuration Guide */}
            <section className="card">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                    <span className="w-1 h-5 bg-white"></span>
                    {t.instructions?.configuration?.title || "Configuration"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h3 className="font-bold text-white mb-2">{t.instructions?.configuration?.incomeTitle || "Annual Income"}</h3>
                        <p className="text-textMuted mb-4">{t.instructions?.configuration?.incomeDesc || "Set your desired annual income for different roles (UI Design vs UX Research). This forms the baseline for your rate calculation."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2">{t.instructions?.configuration?.overheadTitle || "Overhead & Taxes"}</h3>
                        <p className="text-textMuted mb-4">{t.instructions?.configuration?.overheadDesc || "Account for non-billable expenses (software, hardware, insurance) and taxes. These are added on top of your base rate."}</p>
                    </div>
                </div>
                {t.instructions?.configuration?.example && (
                    <div className="mt-4 p-3 border border-border rounded bg-surfaceHighlight/10 font-mono text-xs text-textMuted">
                        <span className="text-white font-bold mr-2">Example:</span>
                        {t.instructions?.configuration?.example}
                    </div>
                )}
            </section>

            {/* Scope & Mix */}
            <section className="card">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                    <span className="w-1 h-5 bg-white"></span>
                    {t.instructions?.scope?.title || "Scope & Mix"}
                </h2>
                <div className="space-y-4 text-sm text-textMuted">
                    <p>{t.instructions?.scope?.content || "Define the project scope by estimating hours for Research and UI Design. The calculator uses a blended rate based on the mix of work."}</p>
                    {t.instructions?.scope?.example ? (
                        <div className="p-4 border border-border rounded bg-surfaceHighlight/10 font-mono text-xs">
                            <p className="mb-2 text-white">Example:</p>
                            <p>{t.instructions?.scope?.example}</p>
                        </div>
                    ) : (
                        <div className="p-4 border border-border rounded bg-surfaceHighlight/10 font-mono text-xs">
                            <p className="mb-2 text-white">Example:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>10 hours Research @ $150/h</li>
                                <li>20 hours UI Design @ $120/h</li>
                                <li>Total: $3,900 (Blended Rate: $130/h)</li>
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Adjusters */}
            <section className="card">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                    <span className="w-1 h-5 bg-white"></span>
                    {t.instructions?.adjusters?.title || "Adjusters"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h3 className="font-bold text-white mb-2">{t.clientType}</h3>
                        <p className="text-textMuted mb-4">{t.instructions?.adjusters?.clientDesc || "Adjusts the rate based on client size and budget capability."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2">{t.complexity}</h3>
                        <p className="text-textMuted mb-4">{t.instructions?.adjusters?.complexityDesc || "Adds a multiplier for complex or high-risk projects."}</p>
                    </div>
                </div>
                {t.instructions?.adjusters?.example && (
                    <div className="mt-4 p-3 border border-border rounded bg-surfaceHighlight/10 font-mono text-xs text-textMuted">
                        <span className="text-white font-bold mr-2">Example:</span>
                        {t.instructions?.adjusters?.example}
                    </div>
                )}
            </section>

        </div>
    );
}
