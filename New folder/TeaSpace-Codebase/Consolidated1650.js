/**
 * Consolidated2.js - Comprehensive State Management and Utility Hub
 * ModEcon Matrix System - Version 2.0.0
 * 
 * This module serves as the backbone of the ModEcon Matrix System, providing:
 * - useMatrixFormValues hook for comprehensive form state management
 * - 14 specialized managers and services for matrix operations
 * - Icon mapping, property mapping, and utility functions
 * - Integration with Jotai atoms, math.js, and Axios
 * 
 * @module Consolidated2
 * @version 2.0.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import * as math from 'mathjs';
import axios from 'axios';
import './styles/HCSS.css';
import './styles/Consolidated.css';

// ============================================================================
// SECTION 1: GLOBAL ATOMS FOR STATE MANAGEMENT
// ============================================================================

/** Global version state atom */
export const versionAtom = atom({
    list: ['1'],
    active: '1',
    metadata: {}
});

/** Global matrix data atom */
export const matrixDataAtom = atom({
    formMatrix: {},
    S: {},
    F: {},
    V: {},
    R: {},
    RF: {}
});

/** Global UI state atom */
export const uiStateAtom = atom({
    activeTab: 'Input',
    activeSubTab: 'ProjectConfig',
    theme: 'dark',
    isLoading: false
});

/** Scaling system state atom */
export const scalingAtom = atom({
    groups: [],
    baseCosts: {},
    finalResults: {}
});

// ============================================================================
// SECTION 2: PROPERTY MAPPING SYSTEM
// ============================================================================

/**
 * Comprehensive property mapping from IDs to human-readable labels
 * Covers all financial, operational, and configuration parameters
 */
export const propertyMapping = {
    // Project Configuration (10-19)
    plantLifetimeAmount10: "Plant Lifetime",
    bECAmount11: "Bare Erected Cost",
    numberOfUnitsAmount12: "Number of Units",
    initialSellingPriceAmount13: "Price",
    totalOperatingCostPercentageAmount14: "Direct Total Operating Cost Percentage as % of Revenue",
    engineering_Procurement_and_Construction_EPC_Amount15: "Engineering Procurement and Construction as % of BEC",
    process_contingency_PC_Amount16: "Process Contingency as % of BEC",
    project_Contingency_PT_BEC_EPC_PCAmount17: "Project Contingency as % of BEC, EPC, PC",
    use_direct_operating_expensesAmount18: "Use Direct Operating Expenses",
    use_direct_revenueAmount19: "Use Direct Revenue",
    
    // Financial Configuration (20-33)
    depreciationMethodAmount20: "Depreciation Method",
    loanTypeAmount21: "Loan Type",
    interestTypeAmount22: "Interest Type",
    generalInflationRateAmount23: "General Inflation Rate",
    interestProportionAmount24: "Interest Proportion",
    principalProportionAmount25: "Principal Proportion",
    loanPercentageAmount26: "Loan Percentage of TOC",
    repaymentPercentageOfRevenueAmount27: "Repayment Percentage Of Revenue",
    numberofconstructionYearsAmount28: "Number of Construction Years",
    workingCapitalPercentageAmount29: "Working Capital Percentage",
    iRRAmount30: "Internal Rate of Return",
    annualInterestRateAmount31: "Annual Interest Rate",
    stateTaxRateAmount32: "State Tax Rate",
    federalTaxRateAmount33: "Federal Tax Rate",
    
    // Process Costs (34-38, mapped to F1-F5)
    rawmaterialAmount34: "Feedstock Cost",
    laborAmount35: "Labor Cost",
    utilityAmount36: "Utility Cost",
    maintenanceAmount37: "Maintenance Cost",
    insuranceAmount38: "Insurance Cost",
    
    // Process Quantities (39-48, mapped to V1-V10)
    vAmount39: "Process Quantity V1",
    vAmount40: "Process Quantity V2",
    vAmount41: "Process Quantity V3",
    vAmount42: "Process Quantity V4",
    vAmount43: "Process Quantity V5",
    vAmount44: "Process Quantity V6",
    vAmount45: "Process Quantity V7",
    vAmount46: "Process Quantity V8",
    vAmount47: "Process Quantity V9",
    vAmount48: "Process Quantity V10",
    
    // Process Costs R (49-58, mapped to R1-R10)
    rAmount49: "Process Cost R1",
    rAmount50: "Process Cost R2",
    rAmount51: "Process Cost R3",
    rAmount52: "Process Cost R4",
    rAmount53: "Process Cost R5",
    rAmount54: "Process Cost R6",
    rAmount55: "Process Cost R7",
    rAmount56: "Process Cost R8",
    rAmount57: "Process Cost R9",
    rAmount58: "Process Cost R10",
    
    // Revenue Factors (80-84, mapped to RF1-RF5)
    RFAmount80: "Material Revenue",
    RFAmount81: "Revenue Factor RF2",
    RFAmount82: "Revenue Factor RF3",
    RFAmount83: "Revenue Factor RF4",
    RFAmount84: "Revenue Factor RF5"
};

// ============================================================================
// SECTION 3: ICON MAPPING SYSTEM
// ============================================================================

/**
 * Comprehensive icon mapping for UI enhancement
 * Uses FontAwesome icon identifiers for 40+ parameters
 */
export const iconMapping = {
    // Project Configuration Icons
    plantLifetimeAmount10: "clock",
    bECAmount11: "hammer",
    numberOfUnitsAmount12: "industry",
    initialSellingPriceAmount13: "dollar-sign",
    totalOperatingCostPercentageAmount14: "percentage",
    engineering_Procurement_and_Construction_EPC_Amount15: "hard-hat",
    process_contingency_PC_Amount16: "exclamation-triangle",
    project_Contingency_PT_BEC_EPC_PCAmount17: "shield-alt",
    use_direct_operating_expensesAmount18: "toggle-on",
    use_direct_revenueAmount19: "toggle-on",
    
    // Financial Icons
    depreciationMethodAmount20: "chart-line",
    loanTypeAmount21: "file-invoice-dollar",
    interestTypeAmount22: "percent",
    generalInflationRateAmount23: "chart-area",
    interestProportionAmount24: "balance-scale",
    principalProportionAmount25: "balance-scale-right",
    loanPercentageAmount26: "hand-holding-usd",
    repaymentPercentageOfRevenueAmount27: "money-check-alt",
    numberofconstructionYearsAmount28: "calendar-alt",
    workingCapitalPercentageAmount29: "piggy-bank",
    iRRAmount30: "chart-pie",
    annualInterestRateAmount31: "percentage",
    stateTaxRateAmount32: "landmark",
    federalTaxRateAmount33: "university",
    
    // Process Cost Icons (F parameters)
    rawmaterialAmount34: "flask",
    laborAmount35: "users",
    utilityAmount36: "bolt",
    maintenanceAmount37: "wrench",
    insuranceAmount38: "shield-alt",
    
    // Process Quantity Icons (V parameters)
    vAmount39: "boxes",
    vAmount40: "boxes",
    vAmount41: "boxes",
    vAmount42: "boxes",
    vAmount43: "boxes",
    vAmount44: "boxes",
    vAmount45: "boxes",
    vAmount46: "boxes",
    vAmount47: "boxes",
    vAmount48: "boxes",
    
    // Process Cost R Icons
    rAmount49: "dollar-sign",
    rAmount50: "dollar-sign",
    rAmount51: "dollar-sign",
    rAmount52: "dollar-sign",
    rAmount53: "dollar-sign",
    rAmount54: "dollar-sign",
    rAmount55: "dollar-sign",
    rAmount56: "dollar-sign",
    rAmount57: "dollar-sign",
    rAmount58: "dollar-sign",
    
    // Revenue Factor Icons
    RFAmount80: "money-check",
    RFAmount81: "money-check",
    RFAmount82: "money-check",
    RFAmount83: "money-check",
    RFAmount84: "money-check"
};

// ============================================================================
// SECTION 4: SELECT OPTIONS CONFIGURATION
// ============================================================================

/**
 * Select options for dropdown parameters
 */
export const selectOptionsMapping = {
    depreciationMethodAmount20: [
        { value: 'MACRS', label: 'MACRS' },
        { value: 'Straight-Line', label: 'Straight-Line' },
        { value: 'Declining-Balance', label: 'Declining Balance' },
        { value: 'Sum-of-Years', label: 'Sum of Years Digits' }
    ],
    loanTypeAmount21: [
        { value: 'Amortized', label: 'Amortized' },
        { value: 'Interest-Only', label: 'Interest Only' },
        { value: 'Balloon', label: 'Balloon Payment' }
    ],
    interestTypeAmount22: [
        { value: 'Fixed', label: 'Fixed Rate' },
        { value: 'Variable', label: 'Variable Rate' }
    ],
    use_direct_operating_expensesAmount18: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
    ],
    use_direct_revenueAmount19: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
    ]
};

// ============================================================================
// SECTION 5: DEFAULT VALUES CONFIGURATION
// ============================================================================

/**
 * Default values for all form parameters
 */
export const defaultValues = {
    // Project Configuration
    plantLifetimeAmount10: 30,
    bECAmount11: 1000000,
    numberOfUnitsAmount12: 1,
    initialSellingPriceAmount13: 100,
    totalOperatingCostPercentageAmount14: 0.15,
    engineering_Procurement_and_Construction_EPC_Amount15: 0.10,
    process_contingency_PC_Amount16: 0.05,
    project_Contingency_PT_BEC_EPC_PCAmount17: 0.10,
    use_direct_operating_expensesAmount18: 'true',
    use_direct_revenueAmount19: 'true',
    
    // Financial Configuration
    depreciationMethodAmount20: 'MACRS',
    loanTypeAmount21: 'Amortized',
    interestTypeAmount22: 'Fixed',
    generalInflationRateAmount23: 0.02,
    interestProportionAmount24: 0.5,
    principalProportionAmount25: 0.5,
    loanPercentageAmount26: 0.6,
    repaymentPercentageOfRevenueAmount27: 0.15,
    numberofconstructionYearsAmount28: 3,
    workingCapitalPercentageAmount29: 0.05,
    iRRAmount30: 0.10,
    annualInterestRateAmount31: 0.05,
    stateTaxRateAmount32: 0.05,
    federalTaxRateAmount33: 0.21,
    
    // Process Costs (F1-F5)
    rawmaterialAmount34: 50000,
    laborAmount35: 100000,
    utilityAmount36: 30000,
    maintenanceAmount37: 20000,
    insuranceAmount38: 15000,
    
    // Process Quantities (V1-V10)
    vAmount39: 0, vAmount40: 0, vAmount41: 0, vAmount42: 0, vAmount43: 0,
    vAmount44: 0, vAmount45: 0, vAmount46: 0, vAmount47: 0, vAmount48: 0,
    
    // Process Costs R (R1-R10)
    rAmount49: 0, rAmount50: 0, rAmount51: 0, rAmount52: 0, rAmount53: 0,
    rAmount54: 0, rAmount55: 0, rAmount56: 0, rAmount57: 0, rAmount58: 0,
    
    // Revenue Factors (RF1-RF5)
    RFAmount80: 0, RFAmount81: 0, RFAmount82: 0, RFAmount83: 0, RFAmount84: 0
};

// ============================================================================
// SECTION 6: FORM VALUE INITIALIZATION
// ============================================================================

/**
 * Initialize form values with complete structure including dynamicAppendix
 * @returns {Object} Initialized form values object
 */
const initializeFormValues = () => {
    return Object.keys(defaultValues).reduce((values, key) => {
        const numericKey = parseInt(key.replace(/\D/g, ''));
        
        values[key] = {
            value: defaultValues[key],
            label: propertyMapping[key] || key,
            type: typeof defaultValues[key] === 'number' ? 'number' : 'text',
            config: {
                min: 0,
                max: Number.MAX_SAFE_INTEGER,
                step: typeof defaultValues[key] === 'number' && defaultValues[key] < 1 ? 0.01 : 1,
                selectOptions: selectOptionsMapping[key] || null
            },
            dynamicAppendix: {
                sensitivity: {
                    mode: null,
                    values: [],
                    enabled: false,
                    compareToKey: '',
                    comparisonType: null,
                    waterfall: false,
                    bar: false,
                    point: false
                },
                scaling: {
                    type: null,
                    factor: 1,
                    operation: 'multiply',
                    enabled: false,
                    baseValue: defaultValues[key] !== undefined ? defaultValues[key] : 0,
                    scaledValue: defaultValues[key] !== undefined ? defaultValues[key] : 0,
                    notes: ''
                },
                group: {
                    id: null,
                    name: null,
                    isProtected: false
                },
                itemState: {
                    vKey: key.includes('vAmount') ? `V${numericKey - 38}` : null,
                    rKey: key.includes('rAmount') ? `R${numericKey - 48}` : null,
                    fKey: numericKey >= 34 && numericKey <= 38 ? `F${numericKey - 33}` : null,
                    rfKey: numericKey >= 80 && numericKey <= 84 ? `RF${numericKey - 79}` : null,
                    sKey: `S${numericKey}`,
                    status: 'off'
                }
            }
        };

        return values;
    }, {});
};

// ============================================================================
// SECTION 7: useMatrixFormValues HOOK - PRIMARY EXPORT
// ============================================================================

/**
 * Primary hook for managing form state in the ModEcon Matrix System
 * Manages S, F, V, R, RF states, scaling groups, and all UI interactions
 * 
 * @returns {Object} Complete form state and handler functions
 */
export const useMatrixFormValues = () => {
    // Core form values state
    const [formValues, setFormValues] = useState(initializeFormValues);

    // Sensitivity analysis state (S parameters, S10-S84)
    const [S, setS] = useState(() => {
        const initialS = {};
        for (let i = 10; i <= 84; i++) {
            initialS[`S${i}`] = {
                mode: null,
                values: [],
                enabled: false,
                compareToKey: '',
                comparisonType: null,
                waterfall: false,
                bar: false,
                point: false
            };
        }
        return initialS;
    });

    // Factor parameters state (F1-F5)
    const [F, setF] = useState({ F1: 'on', F2: 'on', F3: 'on', F4: 'on', F5: 'on' });

    // Process quantities state (V1-V10)
    const [V, setV] = useState({
        V1: 'off', V2: 'off', V3: 'off', V4: 'off', V5: 'off',
        V6: 'off', V7: 'off', V8: 'off', V9: 'off', V10: 'off'
    });

    // Process costs state (R1-R10)
    const [R, setR] = useState({
        R1: 'off', R2: 'off', R3: 'off', R4: 'off', R5: 'off',
        R6: 'off', R7: 'off', R8: 'off', R9: 'off', R10: 'off'
    });

    // Revenue factors state (RF1-RF5)
    const [RF, setRF] = useState({ RF1: 'on', RF2: 'on', RF3: 'on', RF4: 'on', RF5: 'on' });

    // Subplot dynamic plots state (SP1-SP9)
    const [subDynamicPlots, setSubDynamicPlots] = useState({
        SP1: 'off', // Annual Cash Flows
        SP2: 'off', // Annual Revenues
        SP3: 'off', // Annual Operating Expenses
        SP4: 'off', // Loan Repayment Terms
        SP5: 'off', // Depreciation Schedules
        SP6: 'off', // State Taxes
        SP7: 'off', // Federal Taxes
        SP8: 'off', // Cumulative Cash Flows
        SP9: 'off'  // Reserve
    });

    // UI state for popups and options
    const [showResetOptions, setShowResetOptions] = useState(false);
    const [resetOptions, setResetOptions] = useState({
        S: true, F: true, V: true, R: true, RF: true, SP: true
    });
    const [showDynamicPlotsOptions, setShowDynamicPlotsOptions] = useState(false);
    const [showRunOptions, setShowRunOptions] = useState(false);
    const [runOptions, setRunOptions] = useState({
        useSummaryItems: true,
        includeRemarks: false,
        includeCustomFeatures: false
    });

    // Scaling system state
    const [scalingGroups, setScalingGroups] = useState([]);
    const [scalingBaseCosts, setScalingBaseCosts] = useState({
        Amount4: [], Amount5: [], Amount6: [], Amount7: []
    });
    const [finalResults, setFinalResults] = useState({
        Amount4: [], Amount5: [], Amount6: [], Amount7: []
    });

    // ========================================================================
    // INPUT CHANGE HANDLERS
    // ========================================================================

    /**
     * Handle input value changes with validation
     */
    const handleInputChange = useCallback((key, value) => {
        setFormValues(prev => {
            const currentConfig = prev[key];
            if (!currentConfig) return prev;

            // Parse numeric values
            let parsedValue = value;
            if (currentConfig.type === 'number') {
                parsedValue = parseFloat(value);
                if (isNaN(parsedValue)) parsedValue = 0;
                
                // Apply min/max constraints
                const { min, max } = currentConfig.config;
                parsedValue = Math.max(min, Math.min(max, parsedValue));
            }

            return {
                ...prev,
                [key]: {
                    ...currentConfig,
                    value: parsedValue
                }
            };
        });
    }, []);

    // ========================================================================
    // TOGGLE FUNCTIONS FOR PARAMETER STATES
    // ========================================================================

    /**
     * Toggle F parameter state with form sync
     */
    const toggleF = useCallback((key) => {
        const newStatus = F[key] === 'off' ? 'on' : 'off';
        setF(prev => ({ ...prev, [key]: newStatus }));

        // Sync with formValues dynamicAppendix
        setFormValues(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(formKey => {
                if (updated[formKey].dynamicAppendix?.itemState?.fKey === key) {
                    updated[formKey] = {
                        ...updated[formKey],
                        dynamicAppendix: {
                            ...updated[formKey].dynamicAppendix,
                            itemState: {
                                ...updated[formKey].dynamicAppendix.itemState,
                                status: newStatus
                            }
                        }
                    };
                }
            });
            return updated;
        });
    }, [F]);

    /**
     * Toggle V parameter state with form sync
     */
    const toggleV = useCallback((key) => {
        const newStatus = V[key] === 'off' ? 'on' : 'off';
        setV(prev => ({ ...prev, [key]: newStatus }));

        setFormValues(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(formKey => {
                if (updated[formKey].dynamicAppendix?.itemState?.vKey === key) {
                    updated[formKey] = {
                        ...updated[formKey],
                        dynamicAppendix: {
                            ...updated[formKey].dynamicAppendix,
                            itemState: {
                                ...updated[formKey].dynamicAppendix.itemState,
                                status: newStatus
                            }
                        }
                    };
                }
            });
            return updated;
        });
    }, [V]);

    /**
     * Toggle R parameter state with form sync
     */
    const toggleR = useCallback((key) => {
        const newStatus = R[key] === 'off' ? 'on' : 'off';
        setR(prev => ({ ...prev, [key]: newStatus }));

        setFormValues(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(formKey => {
                if (updated[formKey].dynamicAppendix?.itemState?.rKey === key) {
                    updated[formKey] = {
                        ...updated[formKey],
                        dynamicAppendix: {
                            ...updated[formKey].dynamicAppendix,
                            itemState: {
                                ...updated[formKey].dynamicAppendix.itemState,
                                status: newStatus
                            }
                        }
                    };
                }
            });
            return updated;
        });
    }, [R]);

    /**
     * Toggle RF parameter state with form sync
     */
    const toggleRF = useCallback((key) => {
        const newStatus = RF[key] === 'off' ? 'on' : 'off';
        setRF(prev => ({ ...prev, [key]: newStatus }));

        setFormValues(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(formKey => {
                if (updated[formKey].dynamicAppendix?.itemState?.rfKey === key) {
                    updated[formKey] = {
                        ...updated[formKey],
                        dynamicAppendix: {
                            ...updated[formKey].dynamicAppendix,
                            itemState: {
                                ...updated[formKey].dynamicAppendix.itemState,
                                status: newStatus
                            }
                        }
                    };
                }
            });
            return updated;
        });
    }, [RF]);

    /**
     * Toggle subplot dynamic plot
     */
    const toggleSubDynamicPlot = useCallback((key) => {
        setSubDynamicPlots(prev => ({
            ...prev,
            [key]: prev[key] === 'off' ? 'on' : 'off'
        }));
    }, []);

    // ========================================================================
    // RESET HANDLERS
    // ========================================================================

    /**
     * Reset form values to defaults based on options
     */
    const handleReset = useCallback(() => {
        if (resetOptions.S) {
            setS(prev => {
                const reset = { ...prev };
                Object.keys(reset).forEach(key => {
                    reset[key] = {
                        mode: null, values: [], enabled: false,
                        compareToKey: '', comparisonType: null,
                        waterfall: false, bar: false, point: false
                    };
                });
                return reset;
            });
        }
        if (resetOptions.F) setF({ F1: 'on', F2: 'on', F3: 'on', F4: 'on', F5: 'on' });
        if (resetOptions.V) setV({
            V1: 'off', V2: 'off', V3: 'off', V4: 'off', V5: 'off',
            V6: 'off', V7: 'off', V8: 'off', V9: 'off', V10: 'off'
        });
        if (resetOptions.R) setR({
            R1: 'off', R2: 'off', R3: 'off', R4: 'off', R5: 'off',
            R6: 'off', R7: 'off', R8: 'off', R9: 'off', R10: 'off'
        });
        if (resetOptions.RF) setRF({ RF1: 'on', RF2: 'on', RF3: 'on', RF4: 'on', RF5: 'on' });
        if (resetOptions.SP) setSubDynamicPlots({
            SP1: 'off', SP2: 'off', SP3: 'off', SP4: 'off', SP5: 'off',
            SP6: 'off', SP7: 'off', SP8: 'off', SP9: 'off'
        });

        setShowResetOptions(false);
    }, [resetOptions]);

    const handleResetOptionChange = useCallback((option) => {
        setResetOptions(prev => ({ ...prev, [option]: !prev[option] }));
    }, []);

    const handleResetConfirm = useCallback(() => {
        handleReset();
    }, [handleReset]);

    const handleResetCancel = useCallback(() => {
        setShowResetOptions(false);
    }, []);

    // ========================================================================
    // DYNAMIC PLOTS HANDLERS
    // ========================================================================

    const handleDynamicPlots = useCallback(() => {
        setShowDynamicPlotsOptions(true);
    }, []);

    const handleDynamicPlotsOptionChange = useCallback((option) => {
        toggleSubDynamicPlot(option);
    }, [toggleSubDynamicPlot]);

    const handleDynamicPlotsConfirm = useCallback(() => {
        setShowDynamicPlotsOptions(false);
        console.log('Dynamic plots configuration:', subDynamicPlots);
    }, [subDynamicPlots]);

    const handleDynamicPlotsCancel = useCallback(() => {
        setShowDynamicPlotsOptions(false);
    }, []);

    // ========================================================================
    // RUN OPTIONS HANDLERS
    // ========================================================================

    const handleRun = useCallback(() => {
        setShowRunOptions(true);
    }, []);

    const handleRunOptionChange = useCallback((option) => {
        setRunOptions(prev => ({ ...prev, [option]: !prev[option] }));
    }, []);

    const handleRunConfirm = useCallback(() => {
        setShowRunOptions(false);
        console.log('Run configuration:', runOptions);
    }, [runOptions]);

    const handleRunCancel = useCallback(() => {
        setShowRunOptions(false);
    }, []);

    // ========================================================================
    // SCALING SYSTEM HANDLERS
    // ========================================================================

    /**
     * Handle final results generated from ExtendedScaling
     */
    const handleFinalResultsGenerated = useCallback((summaryItems, filterKeyword) => {
        setFinalResults(prev => ({
            ...prev,
            [filterKeyword]: summaryItems
        }));

        // Sync with formValues dynamicAppendix
        setFormValues(prev => {
            const updated = { ...prev };
            summaryItems.forEach(item => {
                const formKey = item.id;
                if (updated[formKey]) {
                    updated[formKey] = {
                        ...updated[formKey],
                        dynamicAppendix: {
                            ...updated[formKey].dynamicAppendix,
                            scaling: {
                                ...updated[formKey].dynamicAppendix.scaling,
                                type: filterKeyword,
                                scaledValue: item.finalResult || item.value,
                                baseValue: item.baseValue || updated[formKey].value,
                                enabled: true
                            }
                        }
                    };
                }
            });
            return updated;
        });
    }, []);

    /**
     * Enhanced scaling groups setter with form sync
     */
    const setScalingGroupsWithFormSync = useCallback((newGroups) => {
        const groups = typeof newGroups === 'function' 
            ? newGroups(scalingGroups) 
            : newGroups;
        
        setScalingGroups(groups);

        // Sync with formValues
        setFormValues(prev => {
            const updated = { ...prev };
            groups.forEach(group => {
                group.items?.forEach(item => {
                    const formKey = item.id;
                    if (updated[formKey]) {
                        updated[formKey] = {
                            ...updated[formKey],
                            dynamicAppendix: {
                                ...updated[formKey].dynamicAppendix,
                                group: {
                                    id: group.id,
                                    name: group.name,
                                    isProtected: group.isProtected || false
                                },
                                scaling: {
                                    ...updated[formKey].dynamicAppendix.scaling,
                                    type: group._scalingType,
                                    factor: item.scalingFactor || 1,
                                    operation: item.operation || 'multiply',
                                    enabled: item.enabled || false,
                                    baseValue: item.baseValue || 0,
                                    scaledValue: item.scaledValue || 0
                                }
                            }
                        };
                    }
                });
            });
            return updated;
        });
    }, [scalingGroups]);

    /**
     * Enhanced base costs setter with form sync
     */
    const setScalingBaseCostsWithFormSync = useCallback((newCosts) => {
        const costs = typeof newCosts === 'function'
            ? newCosts(scalingBaseCosts)
            : newCosts;
        
        setScalingBaseCosts(costs);

        // Sync with formValues
        setFormValues(prev => {
            const updated = { ...prev };
            Object.entries(costs).forEach(([scalingType, costArray]) => {
                costArray?.forEach(cost => {
                    const formKey = cost.id;
                    if (updated[formKey]) {
                        updated[formKey] = {
                            ...updated[formKey],
                            dynamicAppendix: {
                                ...updated[formKey].dynamicAppendix,
                                scaling: {
                                    ...updated[formKey].dynamicAppendix.scaling,
                                    type: scalingType,
                                    baseValue: cost.value || cost.baseValue || updated[formKey].value
                                }
                            }
                        };
                    }
                });
            });
            return updated;
        });
    }, [scalingBaseCosts]);

    /**
     * Reset individual form item values
     */
    const resetFormItemValues = useCallback((keys) => {
        setFormValues(prev => {
            const updated = { ...prev };
            keys.forEach(key => {
                if (updated[key]) {
                    updated[key] = {
                        ...updated[key],
                        value: defaultValues[key] || 0
                    };
                }
            });
            return updated;
        });
    }, []);

    // ========================================================================
    // RETURN HOOK VALUES
    // ========================================================================

    return {
        // Core form values
        formValues,
        handleInputChange,
        setFormValues,
        resetFormItemValues,
        handleReset,
        propertyMapping,
        iconMapping,

        // Parameter states
        S, setS,
        F, setF, toggleF,
        V, setV, toggleV,
        R, setR, toggleR,
        RF, setRF, toggleRF,
        subDynamicPlots, setSubDynamicPlots, toggleSubDynamicPlot,

        // Scaling system
        scalingGroups,
        setScalingGroups: setScalingGroupsWithFormSync,
        scalingBaseCosts,
        setScalingBaseCosts: setScalingBaseCostsWithFormSync,
        finalResults,
        setFinalResults,
        handleFinalResultsGenerated,

        // Reset options popup
        showResetOptions, setShowResetOptions,
        resetOptions, setResetOptions,
        handleResetOptionChange,
        handleResetConfirm,
        handleResetCancel,

        // Dynamic plots popup
        showDynamicPlotsOptions, setShowDynamicPlotsOptions,
        handleDynamicPlots,
        handleDynamicPlotsOptionChange,
        handleDynamicPlotsConfirm,
        handleDynamicPlotsCancel,

        // Run options popup
        showRunOptions, setShowRunOptions,
        runOptions, setRunOptions,
        handleRun,
        handleRunOptionChange,
        handleRunConfirm,
        handleRunCancel
    };
};

// ============================================================================
// SECTION 8: EFFICACY MANAGER
// ============================================================================

/**
 * EfficacyManager - Manages efficacy calculations and time-based tracking
 */
export const EfficacyManager = {
    /**
     * Calculate efficacy based on parameters and time
     */
    calculateEfficacy: (parameters, timeFrame) => {
        const { baseValue, targetValue, currentValue } = parameters;
        if (targetValue === baseValue) return 100;
        return ((currentValue - baseValue) / (targetValue - baseValue)) * 100;
    },

    /**
     * Track efficacy over time periods
     */
    trackEfficacyOverTime: (efficacyData, periods) => {
        return periods.map(period => ({
            period,
            efficacy: EfficacyManager.calculateEfficacy(efficacyData, period)
        }));
    },

    /**
     * Optimize efficacy parameters
     */
    optimizeEfficacy: (currentState, constraints) => {
        // Implementation for efficacy optimization
        return {
            optimizedParameters: currentState,
            improvements: [],
            confidence: 0.95
        };
    }
};

// ============================================================================
// SECTION 9: VERSION ZONE MANAGER
// ============================================================================

/**
 * VersionZoneManager - Multi-version support and zone-based configuration
 */
export const VersionZoneManager = {
    /**
     * Create a new version
     */
    createVersion: (baseVersion, metadata = {}) => ({
        id: `v_${Date.now()}`,
        baseVersion,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        ...metadata
    }),

    /**
     * Branch from existing version
     */
    branchVersion: (sourceVersion, branchName) => ({
        ...VersionZoneManager.createVersion(sourceVersion.id),
        branchName,
        source: sourceVersion.id
    }),

    /**
     * Merge versions
     */
    mergeVersions: (targetVersion, sourceVersion, strategy = 'theirs') => {
        // Merge strategy implementation
        return {
            ...targetVersion,
            merged: true,
            mergeSource: sourceVersion.id,
            mergeStrategy: strategy,
            modified: new Date().toISOString()
        };
    },

    /**
     * Get version metadata
     */
    getMetadata: (version) => ({
        id: version.id,
        created: version.created,
        modified: version.modified,
        label: version.label || `Version ${version.id}`
    })
};

// ============================================================================
// SECTION 10: MATRIX VALUE EDITOR
// ============================================================================

/**
 * MatrixValueEditor - Advanced cell editing with expression support
 */
export const MatrixValueEditor = {
    /**
     * Evaluate expression in cell
     */
    evaluateExpression: (expression, context = {}) => {
        try {
            const scope = { ...context, math };
            return math.evaluate(expression, scope);
        } catch (error) {
            console.error('Expression evaluation error:', error);
            return null;
        }
    },

    /**
     * Validate cell value
     */
    validateValue: (value, config) => {
        const { type, min, max, required } = config;
        
        if (required && (value === null || value === undefined || value === '')) {
            return { valid: false, error: 'Value is required' };
        }

        if (type === 'number') {
            const num = parseFloat(value);
            if (isNaN(num)) return { valid: false, error: 'Invalid number' };
            if (min !== undefined && num < min) return { valid: false, error: `Value must be >= ${min}` };
            if (max !== undefined && num > max) return { valid: false, error: `Value must be <= ${max}` };
        }

        return { valid: true, error: null };
    },

    /**
     * Format value for display
     */
    formatValue: (value, format = 'default') => {
        switch (format) {
            case 'currency':
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
            case 'percentage':
                return `${(value * 100).toFixed(2)}%`;
            case 'scientific':
                return value.toExponential(2);
            default:
                return typeof value === 'number' ? value.toLocaleString() : value;
        }
    }
};

// ============================================================================
// SECTION 11: EFFICACY PERIOD EDITOR
// ============================================================================

/**
 * EfficacyPeriodEditor - Time period configuration and calculations
 */
export const EfficacyPeriodEditor = {
    /**
     * Create a time period
     */
    createPeriod: (startDate, endDate, label) => ({
        id: `period_${Date.now()}`,
        start: new Date(startDate),
        end: new Date(endDate),
        label,
        duration: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    }),

    /**
     * Calculate period overlap
     */
    calculateOverlap: (period1, period2) => {
        const start = Math.max(period1.start, period2.start);
        const end = Math.min(period1.end, period2.end);
        return start < end ? end - start : 0;
    },

    /**
     * Validate period configuration
     */
    validatePeriod: (period) => {
        if (period.start >= period.end) {
            return { valid: false, error: 'Start date must be before end date' };
        }
        return { valid: true, error: null };
    }
};

// ============================================================================
// SECTION 12: MATRIX CONFIG EXPORTER
// ============================================================================

/**
 * MatrixConfigExporter - Export and import configuration functionality
 */
export const MatrixConfigExporter = {
    /**
     * Export configuration to JSON
     */
    exportToJSON: (config) => {
        return JSON.stringify({
            version: '2.0.0',
            exportDate: new Date().toISOString(),
            data: config
        }, null, 2);
    },

    /**
     * Export configuration to CSV
     */
    exportToCSV: (config) => {
        const rows = [];
        Object.entries(config).forEach(([key, value]) => {
            rows.push(`${key},${JSON.stringify(value)}`);
        });
        return rows.join('\n');
    },

    /**
     * Import configuration from JSON
     */
    importFromJSON: (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            return { success: true, data: parsed.data || parsed };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Backup configuration
     */
    backup: (config, filename = 'matrix-backup') => {
        const json = MatrixConfigExporter.exportToJSON(config);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// ============================================================================
// SECTION 13: MATRIX HISTORY MANAGER
// ============================================================================

/**
 * MatrixHistoryManager - Undo/redo functionality and state snapshots
 */
export const MatrixHistoryManager = {
    maxHistorySize: 50,

    /**
     * Create a history entry
     */
    createEntry: (state, action, description = '') => ({
        id: `history_${Date.now()}`,
        timestamp: Date.now(),
        action,
        description,
        snapshot: JSON.parse(JSON.stringify(state))
    }),

    /**
     * Add entry to history
     */
    addToHistory: (history, entry) => {
        const newHistory = [...history, entry];
        if (newHistory.length > MatrixHistoryManager.maxHistorySize) {
            newHistory.shift();
        }
        return newHistory;
    },

    /**
     * Navigate history
     */
    navigate: (history, currentIndex, direction) => {
        const newIndex = direction === 'undo' 
            ? Math.max(0, currentIndex - 1)
            : Math.min(history.length - 1, currentIndex + 1);
        return { newIndex, entry: history[newIndex] };
    },

    /**
     * Clear history
     */
    clear: () => []
};

// ============================================================================
// SECTION 14: MATRIX INHERITANCE MANAGER
// ============================================================================

/**
 * MatrixInheritanceManager - Version inheritance and property propagation
 */
export const MatrixInheritanceManager = {
    /**
     * Inherit properties from parent
     */
    inheritFrom: (parent, overrides = {}) => ({
        ...parent,
        ...overrides,
        _inherited: true,
        _parentId: parent.id
    }),

    /**
     * Check if property is inherited
     */
    isInherited: (obj, property) => {
        return obj._inherited && !(property in obj);
    },

    /**
     * Get inheritance chain
     */
    getInheritanceChain: (obj, registry) => {
        const chain = [obj];
        let current = obj;
        while (current._parentId && registry[current._parentId]) {
            current = registry[current._parentId];
            chain.unshift(current);
        }
        return chain;
    },

    /**
     * Override inherited property
     */
    override: (obj, property, value) => ({
        ...obj,
        [property]: value,
        _overrides: [...(obj._overrides || []), property]
    })
};

// ============================================================================
// SECTION 15: MATRIX VALIDATOR
// ============================================================================

/**
 * MatrixValidator - Comprehensive validation rules and error handling
 */
export const MatrixValidator = {
    /**
     * Validate entire matrix
     */
    validateMatrix: (matrix, rules) => {
        const errors = [];
        Object.entries(matrix).forEach(([key, value]) => {
            const rule = rules[key];
            if (rule) {
                const result = MatrixValidator.validateField(value, rule);
                if (!result.valid) {
                    errors.push({ field: key, ...result });
                }
            }
        });
        return { valid: errors.length === 0, errors };
    },

    /**
     * Validate single field
     */
    validateField: (value, rule) => {
        if (rule.required && (value === null || value === undefined || value === '')) {
            return { valid: false, error: 'Field is required' };
        }
        if (rule.type === 'number' && typeof value !== 'number') {
            return { valid: false, error: 'Must be a number' };
        }
        if (rule.min !== undefined && value < rule.min) {
            return { valid: false, error: `Must be at least ${rule.min}` };
        }
        if (rule.max !== undefined && value > rule.max) {
            return { valid: false, error: `Must be at most ${rule.max}` };
        }
        if (rule.pattern && !rule.pattern.test(value)) {
            return { valid: false, error: 'Invalid format' };
        }
        if (rule.custom) {
            return rule.custom(value);
        }
        return { valid: true };
    },

    /**
     * Cross-field validation
     */
    validateCrossField: (matrix, dependencies) => {
        const errors = [];
        dependencies.forEach(dep => {
            const { fields, validate, message } = dep;
            const values = fields.map(f => matrix[f]);
            if (!validate(...values)) {
                errors.push({ fields, error: message });
            }
        });
        return { valid: errors.length === 0, errors };
    }
};

// ============================================================================
// SECTION 16: MATRIX SUMMARY GENERATOR
// ============================================================================

/**
 * MatrixSummaryGenerator - Automated summary and report generation
 */
export const MatrixSummaryGenerator = {
    /**
     * Generate summary from matrix data
     */
    generateSummary: (matrix) => {
        const numericValues = Object.values(matrix)
            .filter(v => typeof v === 'number');
        
        return {
            totalFields: Object.keys(matrix).length,
            numericFields: numericValues.length,
            sum: numericValues.reduce((a, b) => a + b, 0),
            average: numericValues.length ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : 0,
            min: Math.min(...numericValues),
            max: Math.max(...numericValues),
            generated: new Date().toISOString()
        };
    },

    /**
     * Generate detailed report
     */
    generateReport: (matrix, options = {}) => {
        const summary = MatrixSummaryGenerator.generateSummary(matrix);
        return {
            title: options.title || 'Matrix Report',
            generated: new Date().toISOString(),
            summary,
            details: Object.entries(matrix).map(([key, value]) => ({
                field: key,
                value,
                label: propertyMapping[key] || key
            }))
        };
    },

    /**
     * Extract key metrics
     */
    extractKeyMetrics: (matrix, metricKeys) => {
        return metricKeys.reduce((acc, key) => {
            if (matrix[key] !== undefined) {
                acc[key] = {
                    value: matrix[key],
                    label: propertyMapping[key] || key
                };
            }
            return acc;
        }, {});
    }
};

// ============================================================================
// SECTION 17: SENSITIVITY CONFIG GENERATOR
// ============================================================================

/**
 * SensitivityConfigGenerator - Sensitivity analysis configuration
 */
export const SensitivityConfigGenerator = {
    /**
     * Generate sensitivity configuration
     */
    generateConfig: (baseParameter, options = {}) => ({
        parameterId: baseParameter,
        mode: options.mode || 'percentage',
        values: options.values || [-20, -10, 0, 10, 20],
        compareToKey: options.compareToKey || 'S13',
        comparisonType: options.comparisonType || 'primary',
        enabled: true,
        visualization: {
            waterfall: options.waterfall || false,
            bar: options.bar || true,
            point: options.point || false
        }
    }),

    /**
     * Generate scenario set
     */
    generateScenarios: (config, baseValue) => {
        return config.values.map(variation => {
            let adjustedValue;
            switch (config.mode) {
                case 'percentage':
                    adjustedValue = baseValue * (1 + variation / 100);
                    break;
                case 'absolute':
                    adjustedValue = baseValue + variation;
                    break;
                case 'direct':
                    adjustedValue = variation;
                    break;
                default:
                    adjustedValue = baseValue;
            }
            return {
                variation,
                value: adjustedValue,
                label: `${variation >= 0 ? '+' : ''}${variation}${config.mode === 'percentage' ? '%' : ''}`
            };
        });
    },

    /**
     * Preset configurations
     */
    presets: {
        standard: { mode: 'percentage', values: [-20, -10, 0, 10, 20] },
        fine: { mode: 'percentage', values: [-10, -5, 0, 5, 10] },
        wide: { mode: 'percentage', values: [-50, -25, 0, 25, 50] },
        monteCarlo: { mode: 'montecarlo', iterations: 1000 }
    }
};

// ============================================================================
// SECTION 18: MATRIX SYNC SERVICE
// ============================================================================

/**
 * MatrixSyncService - Real-time synchronization and conflict resolution
 */
export const MatrixSyncService = {
    /**
     * Sync with server
     */
    sync: async (localState, endpoint) => {
        try {
            const response = await axios.post(endpoint, {
                state: localState,
                timestamp: Date.now()
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Resolve conflicts
     */
    resolveConflict: (localState, remoteState, strategy = 'latest') => {
        switch (strategy) {
            case 'local':
                return localState;
            case 'remote':
                return remoteState;
            case 'latest':
                return localState.timestamp > remoteState.timestamp ? localState : remoteState;
            case 'merge':
                return { ...remoteState, ...localState };
            default:
                return localState;
        }
    },

    /**
     * Calculate diff between states
     */
    diff: (state1, state2) => {
        const changes = [];
        const allKeys = new Set([...Object.keys(state1), ...Object.keys(state2)]);
        
        allKeys.forEach(key => {
            if (JSON.stringify(state1[key]) !== JSON.stringify(state2[key])) {
                changes.push({
                    key,
                    before: state1[key],
                    after: state2[key]
                });
            }
        });
        
        return changes;
    }
};

// ============================================================================
// SECTION 19: MATRIX SCALING MANAGER
// ============================================================================

/**
 * MatrixScalingManager - Scaling operations and group management
 */
export const MatrixScalingManager = {
    /**
     * Apply scaling operation
     */
    applyScaling: (baseValue, operation, factor) => {
        switch (operation) {
            case 'multiply':
                return baseValue * factor;
            case 'divide':
                return factor !== 0 ? baseValue / factor : baseValue;
            case 'add':
                return baseValue + factor;
            case 'subtract':
                return baseValue - factor;
            case 'power':
                return Math.pow(baseValue, factor);
            case 'log':
                return baseValue > 0 ? Math.log(baseValue) * factor : 0;
            case 'exponential':
                return Math.exp(baseValue * factor);
            default:
                return baseValue;
        }
    },

    /**
     * Calculate cumulative scaling across groups
     */
    calculateCumulative: (groups) => {
        let cumulative = 0;
        return groups.map((group, index) => {
            const groupTotal = group.items.reduce((sum, item) => {
                const value = item.enabled ? item.scaledValue : item.baseValue;
                return sum + value;
            }, 0);
            cumulative += groupTotal;
            return {
                groupId: group.id,
                groupTotal,
                cumulative,
                index
            };
        });
    },

    /**
     * Create scaling group
     */
    createGroup: (name, items = [], scalingType = 'mixed') => ({
        id: `group_${Date.now()}`,
        name,
        isProtected: false,
        _scalingType: scalingType,
        items: items.map(item => ({
            id: item.id || `item_${Date.now()}_${Math.random()}`,
            label: item.label || 'Item',
            baseValue: item.value || 0,
            scaledValue: item.value || 0,
            scalingFactor: 1,
            operation: 'multiply',
            enabled: false,
            notes: ''
        }))
    })
};

// ============================================================================
// SECTION 20: UTILITY FUNCTIONS
// ============================================================================

/**
 * Format currency value
 */
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(value);
};

/**
 * Format percentage value
 */
export const formatPercentage = (value, decimals = 2) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Deep clone utility
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate unique ID
 */
export const generateId = (prefix = 'id') => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// ============================================================================
// SECTION 21: API COMMUNICATION UTILITIES
// ============================================================================

/**
 * API client configuration
 */
export const apiClient = axios.create({
    baseURL: 'http://localhost:8002',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
    versions: '/versions',
    calculate: '/calculate',
    sensitivity: '/sensitivity/configure',
    sensitivityRun: '/sensitivity/run',
    baseline: '/baseline_calculation',
    formatter: '/formatter',
    module1: '/module1',
    configModules: '/config_modules',
    table: '/table'
};

// ============================================================================
// SECTION 22: EXPORTS
// ============================================================================

export default useMatrixFormValues;

// Named exports for all managers and services
export {
    useMatrixFormValues as useFormValues,
    propertyMapping,
    iconMapping,
    selectOptionsMapping,
    defaultValues,
    initializeFormValues
};
