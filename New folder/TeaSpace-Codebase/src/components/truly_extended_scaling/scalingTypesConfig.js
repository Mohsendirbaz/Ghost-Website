import { CalculatorIcon, CubeIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

/**
 * Configuration for L1 (Level 1) scaling categories
 * Grammar, Coherence, Argumentation, Semantics
 */
export const L1_SCALING_TYPES = [
    {
        id: 'Amount4',
        label: 'Grammar',
        filterKeyword: 'Amount4',
        icon: CubeIcon,
        description: 'Scale grammar-related parameters'
    },
    {
        id: 'Amount5',
        label: 'Coherence',
        filterKeyword: 'Amount5',
        icon: CurrencyDollarIcon,
        description: 'Scale coherence-related parameters'
    },
    {
        id: 'Amount6',
        label: 'Argumentation',
        filterKeyword: 'Amount6',
        icon: ChartBarIcon,
        description: 'Scale argumentation-related parameters'
    },
    {
        id: 'Amount7',
        label: 'Semantics',
        filterKeyword: 'Amount7',
        icon: CalculatorIcon,
        description: 'Scale semantics-related parameters'
    }
];

/**
 * Configuration for L2 (Level 2) scaling categories
 * Discourse, Style, Entity-Based, Structural
 */
export const L2_SCALING_TYPES = [
    {
        id: 'Amount8',
        label: 'Discourse',
        filterKeyword: 'Amount8',
        icon: CubeIcon,
        description: 'Scale discourse-related parameters'
    },
    {
        id: 'Amount9',
        label: 'Style',
        filterKeyword: 'Amount9',
        icon: CurrencyDollarIcon,
        description: 'Scale style-related parameters'
    },
    {
        id: 'Amount10',
        label: 'Entity-Based',
        filterKeyword: 'Amount10',
        icon: ChartBarIcon,
        description: 'Scale entity-based parameters'
    },
    {
        id: 'Amount11',
        label: 'Structural',
        filterKeyword: 'Amount11',
        icon: CalculatorIcon,
        description: 'Scale structural parameters'
    }
];

/**
 * Legacy/Original scaling types configuration (for backward compatibility)
 * Process Quantities, Process Costs, Revenue Quantities, Revenue Prices
 */
export const LEGACY_SCALING_TYPES = [
    {
        id: 'Amount4',
        label: 'Process Quantities',
        filterKeyword: 'Amount4',
        icon: CubeIcon,
        description: 'Scale process input quantities (Vs, units)'
    },
    {
        id: 'Amount5',
        label: 'Process Costs',
        filterKeyword: 'Amount5',
        icon: CurrencyDollarIcon,
        description: 'Scale process costs (Vs, $ / unit)'
    },
    {
        id: 'Amount6',
        label: 'Revenue Quantities',
        filterKeyword: 'Amount6',
        icon: ChartBarIcon,
        description: 'Scale revenue stream quantities (Rs, units)'
    },
    {
        id: 'Amount7',
        label: 'Revenue Prices',
        filterKeyword: 'Amount7',
        icon: CalculatorIcon,
        description: 'Scale revenue stream prices (Rs, $ / unit)'
    }
];
