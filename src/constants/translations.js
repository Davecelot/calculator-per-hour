export const TRANSLATIONS = {
    en: {
        configuration: "Configuration",
        businessLogic: "Business Logic",
        annualIncomeUI: "Annual Income (UI Senior)",
        annualIncomeUXR: "Annual Income (Research Senior)",
        weeksYear: "Weeks/Year",
        hoursWeek: "Hours/Week",
        billablePct: "Billable %",
        billableHelp: "Time spent on billable work",
        marginPct: "Margin %",
        contingencyPct: "Contingency %",
        taxRate: "Fiscal Tax Rate %",
        taxHelp: "Estimated effective tax rate",
        scopeMix: "Scope & Mix",
        researchHours: "Research Hours",
        uiHours: "UI/Build Hours",
        manualHours: "Total Manual Hours",
        manualHelp: "Overrides sum if > 0",
        adjusters: "Adjusters",
        clientType: "Client Type",
        complexity: "Complexity",
        valueUplift: "Value Uplift %",
        rushFee: "Rush Fee %",
        engagementModel: "Engagement Model",
        type: "Type",
        hoursMonth: "Hours/Month",
        retainerDiscount: "Retainer Discount %",
        retainerHelp: "Suggested: 15-20%",
        resetPreset: "Reset Preset",
        exportJson: "Export JSON",
        exportPdf: "Export PDF",
        telemetry: "Telemetry / Output",
        adjustedRate: "Adjusted Rate",
        netIncome: "Net Income (Est.)",
        tax: "Tax",
        fixedPrice: "Fixed Price",
        retainer: "Retainer",
        dataStream: "Data Stream",
        billableHoursYear: "Billable Hours/Year",
        baseRateUI: "Base Rate (UI)",
        baseRateUXR: "Base Rate (UXR)",
        blendedRate: "Blended Rate",
        totalProjectHours: "Total Project Hours",
        systemTip: "> SYSTEM_TIP: Adjust region presets to calibrate baseline metrics. Export configuration for persistence.",
        systemOnline: "SYSTEM ONLINE",
        clientOptions: {
            micro: "Micro / Startup",
            smb: "SMB",
            mid: "Mid-sized Company",
            enterprise: "Enterprise / Corp"
        },
        complexityOptions: {
            basic: "Basic",
            standard: "Standard / Average",
            complex: "Complex / Advanced",
            extreme: "Extreme / Critical"
        },
        engagementOptions: {
            freelance: "Freelance / Project",
            retainer: "In-house partner / Monthly Retainer"
        },
        tabs: {
            calculator: "Calculator",
            instructions: "Instructions"
        },
        instructions: {
            overview: {
                title: "Overview",
                content: "Welcome to the Rate Calculator. This tool helps you calculate your hourly rate based on your annual income goals, overhead, and project specifics.",
                example: "Example: A freelance designer wants to earn $100k/year working 30 hours/week."
            },
            configuration: {
                title: "Configuration",
                incomeTitle: "Annual Income",
                incomeDesc: "Set your desired annual income for different roles (UI Design vs UX Research). This forms the baseline for your rate calculation.",
                overheadTitle: "Overhead & Taxes",
                overheadDesc: "Account for non-billable expenses (software, hardware, insurance) and taxes. These are added on top of your base rate.",
                example: "Income: $120,000 | Overhead: $15,000 (Software, Laptop, etc.)"
            },
            scope: {
                title: "Scope & Mix",
                content: "Define the project scope by estimating hours for Research and UI Design. The calculator uses a blended rate based on the mix of work.",
                example: "Research: 10h @ $150/h | Design: 20h @ $120/h"
            },
            adjusters: {
                title: "Adjusters",
                clientDesc: "Adjusts the rate based on client size and budget capability.",
                complexityDesc: "Adds a multiplier for complex or high-risk projects.",
                example: "Client: Startup (0.8x) | Complexity: High (1.5x)"
            }
        }
    },
    es: {
        configuration: "Configuración",
        businessLogic: "Lógica de Negocio",
        annualIncomeUI: "Ingreso Anual (UI Senior)",
        annualIncomeUXR: "Ingreso Anual (Research Senior)",
        weeksYear: "Semanas/Año",
        hoursWeek: "Horas/Semana",
        billablePct: "% Facturable",
        billableHelp: "Tiempo dedicado a trabajo facturable",
        marginPct: "% Margen",
        contingencyPct: "% Contingencia",
        taxRate: "Tasa Fiscal %",
        taxHelp: "Tasa impositiva efectiva estimada",
        scopeMix: "Alcance y Mezcla",
        researchHours: "Horas de Investigación",
        uiHours: "Horas de UI/Construcción",
        manualHours: "Horas Manuales Totales",
        manualHelp: "Anula la suma si > 0",
        adjusters: "Ajustadores",
        clientType: "Tipo de Cliente",
        complexity: "Complejidad",
        valueUplift: "% Valor Agregado",
        rushFee: "% Tarifa de Urgencia",
        engagementModel: "Modelo de Compromiso",
        type: "Tipo",
        hoursMonth: "Horas/Mes",
        retainerDiscount: "% Descuento Retainer",
        retainerHelp: "Sugerido: 15-20%",
        resetPreset: "Restablecer Preajuste",
        exportJson: "Exportar JSON",
        exportPdf: "Exportar PDF",
        telemetry: "Telemetría / Salida",
        adjustedRate: "Tarifa Ajustada",
        netIncome: "Ingreso Neto (Est.)",
        tax: "Impuestos",
        fixedPrice: "Precio Fijo",
        retainer: "Retainer",
        dataStream: "Flujo de Datos",
        billableHoursYear: "Horas Facturables/Año",
        baseRateUI: "Tarifa Base (UI)",
        baseRateUXR: "Tarifa Base (UXR)",
        blendedRate: "Tarifa Combinada",
        totalProjectHours: "Horas Totales del Proyecto",
        systemTip: "> SYSTEM_TIP: Ajuste los preajustes regionales para calibrar las métricas base. Exporte la configuración para persistencia.",
        systemOnline: "SISTEMA EN LÍNEA",
        clientOptions: {
            micro: "Micro / Startup",
            smb: "PyME",
            mid: "Empresa mediana",
            enterprise: "Empresa grande / Corporación"
        },
        complexityOptions: {
            basic: "Básico",
            standard: "Estándar / Promedio",
            complex: "Complejo / Avanzado",
            extreme: "Extremo / Crítico"
        },
        engagementOptions: {
            freelance: "Freelance / Proyecto",
            retainer: "In-house partner / Retainer mensual"
        },
        tabs: {
            calculator: "Calculadora",
            instructions: "Instrucciones"
        },
        instructions: {
            overview: {
                title: "Resumen",
                content: "Bienvenido a la Calculadora de Tarifas. Esta herramienta te ayuda a calcular tu tarifa por hora basada en tus objetivos de ingresos anuales, gastos generales y detalles del proyecto.",
                example: "Ejemplo: Un diseñador freelance quiere ganar $100k/año trabajando 30 horas/semana."
            },
            configuration: {
                title: "Configuración",
                incomeTitle: "Ingreso Anual",
                incomeDesc: "Establece tu ingreso anual deseado para diferentes roles (Diseño UI vs Investigación UX). Esto forma la base para el cálculo de tu tarifa.",
                overheadTitle: "Gastos Generales e Impuestos",
                overheadDesc: "Ten en cuenta los gastos no facturables (software, hardware, seguros) e impuestos. Estos se suman a tu tarifa base.",
                example: "Ingreso: $120,000 | Gastos: $15,000 (Software, Laptop, etc.)"
            },
            scope: {
                title: "Alcance y Mezcla",
                content: "Define el alcance del proyecto estimando horas para Investigación y Diseño UI. La calculadora utiliza una tarifa combinada basada en la mezcla de trabajo.",
                example: "Investigación: 10h @ $150/h | Diseño: 20h @ $120/h"
            },
            adjusters: {
                title: "Ajustadores",
                clientDesc: "Ajusta la tarifa según el tamaño del cliente y su capacidad presupuestaria.",
                complexityDesc: "Añade un multiplicador para proyectos complejos o de alto riesgo.",
                example: "Cliente: Startup (0.8x) | Complejidad: Alta (1.5x)"
            }
        }
    },
    pt: {
        configuration: "Configuração",
        businessLogic: "Lógica de Negócios",
        annualIncomeUI: "Renda Anual (UI Sênior)",
        annualIncomeUXR: "Renda Anual (Research Sênior)",
        weeksYear: "Semanas/Ano",
        hoursWeek: "Horas/Semana",
        billablePct: "% Faturável",
        billableHelp: "Tempo gasto em trabalho faturável",
        marginPct: "% Margem",
        contingencyPct: "% Contingência",
        taxRate: "Taxa Fiscal %",
        taxHelp: "Taxa de imposto efetiva estimada",
        scopeMix: "Escopo e Mix",
        researchHours: "Horas de Pesquisa",
        uiHours: "Horas de UI/Construção",
        manualHours: "Horas Manuais Totais",
        manualHelp: "Substitui a soma se > 0",
        adjusters: "Ajustadores",
        clientType: "Tipo de Cliente",
        complexity: "Complexidade",
        valueUplift: "% Valor Agregado",
        rushFee: "% Taxa de Urgência",
        engagementModel: "Modelo de Engajamento",
        type: "Tipo",
        hoursMonth: "Horas/Mês",
        retainerDiscount: "% Desconto Retainer",
        retainerHelp: "Sugerido: 15-20%",
        resetPreset: "Redefinir Predefinição",
        exportJson: "Exportar JSON",
        exportPdf: "Exportar PDF",
        telemetry: "Telemetria / Saída",
        adjustedRate: "Taxa Ajustada",
        netIncome: "Renda Líquida (Est.)",
        tax: "Impostos",
        fixedPrice: "Preço Fixo",
        retainer: "Retainer",
        dataStream: "Fluxo de Dados",
        billableHoursYear: "Horas Faturáveis/Ano",
        baseRateUI: "Taxa Base (UI)",
        baseRateUXR: "Taxa Base (UXR)",
        blendedRate: "Taxa Combinada",
        totalProjectHours: "Horas Totais do Projeto",
        systemTip: "> SYSTEM_TIP: Ajuste as predefinições regionais para calibrar as métricas de base. Exporte a configuração para persistência.",
        systemOnline: "SISTEMA ONLINE",
        clientOptions: {
            micro: "Micro / Startup",
            smb: "PME",
            mid: "Empresa média",
            enterprise: "Grande Empresa / Corporação"
        },
        complexityOptions: {
            basic: "Básico",
            standard: "Padrão / Médio",
            complex: "Complexo / Avançado",
            extreme: "Extremo / Crítico"
        },
        engagementOptions: {
            freelance: "Freelance / Projeto",
            retainer: "Parceiro interno / Retainer mensal"
        },
        tabs: {
            calculator: "Calculadora",
            instructions: "Instruções"
        },
        instructions: {
            overview: {
                title: "Visão Geral",
                content: "Bem-vindo à Calculadora de Taxas. Esta ferramenta ajuda você a calcular sua taxa horária com base em suas metas de renda anual, despesas gerais e especificidades do projeto.",
                example: "Exemplo: Um designer freelance quer ganhar $100k/ano trabalhando 30 horas/semana."
            },
            configuration: {
                title: "Configuração",
                incomeTitle: "Renda Anual",
                incomeDesc: "Defina sua renda anual desejada para diferentes funções (Design de UI vs Pesquisa de UX). Isso forma a base para o cálculo da sua taxa.",
                overheadTitle: "Despesas Gerais e Impostos",
                overheadDesc: "Considere despesas não faturáveis (software, hardware, seguros) e impostos. Estes são adicionados à sua taxa base.",
                example: "Renda: $120,000 | Despesas: $15,000 (Software, Laptop, etc.)"
            },
            scope: {
                title: "Escopo e Mix",
                content: "Defina o escopo do projeto estimando horas para Pesquisa e Design de UI. A calculadora usa uma taxa combinada com base no mix de trabalho.",
                example: "Pesquisa: 10h @ $150/h | Design: 20h @ $120/h"
            },
            adjusters: {
                title: "Ajustadores",
                clientDesc: "Ajusta a taxa com base no tamanho do cliente e capacidade orçamentária.",
                complexityDesc: "Adiciona um multiplicador para projetos complexos ou de alto risco.",
                example: "Cliente: Startup (0.8x) | Complexidade: Alta (1.5x)"
            }
        }
    }
};
