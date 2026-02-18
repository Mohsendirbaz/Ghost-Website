/**
 * HomePage.js - Central Orchestration Component
 * ModEcon Matrix System - Version 2.0.0
 * 
 * This component serves as the primary user interface hub, managing:
 * - Application state and navigation
 * - Tab-based multi-section interface
 * - Theme system (dark/light/creative)
 * - Integration with all major subsystems
 * 
 * @module HomePage
 * @version 2.0.0
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// ============================================================================
// COMPONENT IMPORTS
// ============================================================================

// Core UI Components
import CustomizableImage from './components/modules/CustomizableImage';
import CustomizableTable from './components/modules/CustomizableTable';
import SpatialTransformComponent from './Naturalmotion.js';
import StickerHeader from './components/modules/HeaderBackground';
import ThemeButton from './components/modules/ThemeButton';

// Form and Configuration Components
import GeneralFormConfig from './GeneralFormConfig.js';
import PropertySelector from './PropertySelector.js';
import VersionSelector from './VersionSelector.js';

// Analysis Modules
import FactEngine from './components/modules/FactEngine';
import FactEngineAdmin from './components/modules/FactEngineAdmin';
import TestingZone from './components/modules/TestingZone';

// Monitoring Components
import CalculationMonitor from './components/modules/CalculationMonitor';
import SensitivityMonitor from './components/modules/SensitivityMonitor';
import ConfigurationMonitor from './components/modules/ConfigurationMonitor';

// Scaling Systems
import ExtendedScaling from './components/truly_extended_scaling/ExtendedScaling';
import CentralScalingTab from './components/truly_extended_scaling/CentralScalingTab';

// Visualization Components
import PlotsTabs from './components/modules/PlotsTabs';
import SensitivityPlotsTabs from './components/modules/SensitivityPlotsTabs';

// Library Systems
import ProcessEconomicsLibrary from './components/process_economics_pilot/integration-module';

// ============================================================================
// STATE MANAGEMENT IMPORTS
// ============================================================================

import useFormValues from './useFormValues.js';
import versionEventEmitter from './state/EventEmitter';

// ============================================================================
// STYLE IMPORTS
// ============================================================================

// HomePage Styles
import './styles/HomePage.CSS/HomePage1.css';
import './styles/HomePage.CSS/HomePage2.css';
import './styles/HomePage.CSS/HomePage3.css';
import './styles/HomePage.CSS/HomePage5.css';
import './styles/HomePage.CSS/HomePage6.css';
import './styles/HomePage.CSS/CustomizableTable.css';
import './styles/HomePage.CSS/HomePage_AboutUs.css';
import './styles/HomePage.CSS/HomePage_buttons.css';
import './styles/HomePage.CSS/HomePage_monitoring.css';
import './styles/HomePage.CSS/HomePage_FactEngine.css';
import './styles/HomePage.CSS/HomePage_FactAdmin.css';
import './styles/HomePage.CSS/HomePage_neumorphic-tabs.css';
import './styles/HomePage.CSS/ResetOptionsPopup.css';
import './styles/HomePage.CSS/RunOptionsPopup.css';

// Theme Styles
import './styles/Themes/dark-theme.css';
import './styles/Themes/light-theme.css';
import './styles/Themes/creative-theme.css';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HomePageContent - Main orchestration component
 * Manages all application state, navigation, and component integrations
 */
const HomePageContent = () => {
    // ========================================================================
    // STATE DECLARATIONS
    // ========================================================================

    // Version State
    const [selectedVersions, setSelectedVersions] = useState([1]);
    const [version, setVersion] = useState('1');

    // Navigation State
    const [activeTab, setActiveTab] = useState('Input');
    const [activeSubTab, setActiveSubTab] = useState('ProjectConfig');
    const [selectedProperties, setSelectedProperties] = useState([]);

    // Theme State
    const [season, setSeason] = useState('dark');

    // Execution State
    const [batchRunning, setBatchRunning] = useState(false);
    const [analysisRunning, setAnalysisRunning] = useState(false);
    const [runMode, setRunMode] = useState('cfa'); // 'cfa' or 'sensitivity'
    const [monitoringActive, setMonitoringActive] = useState(false);
    const [isMonitoringSensitivity, setIsMonitoringSensitivity] = useState(false);

    // Loading States
    const [loadingStates, setLoadingStates] = useState({
        html: false,
        csv: false,
        plots: false
    });
    const [contentLoaded, setContentLoaded] = useState({});
    const [iframesLoaded, setIframesLoaded] = useState({});
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [contentLoadingState, setContentLoadingState] = useState({
        csv: false,
        html: false,
        plots: false,
        iframes: {},
        images: {},
        content: {}
    });

    // UI State
    const [collapsedTabs, setCollapsedTabs] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [isToggleSectionOpen, setIsToggleSectionOpen] = useState(false);

    // Active Scaling Groups State (for tab persistence)
    const [activeScalingGroups, setActiveScalingGroups] = useState({
        Amount4: 0,
        Amount5: 0,
        Amount6: 0,
        Amount7: 0
    });

    // HTML and Image Album State
    const [albumHtmls, setAlbumHtmls] = useState({});
    const [albumImages, setAlbumImages] = useState({});
    const [selectedHtml, setSelectedHtml] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // ========================================================================
    // FORM VALUES HOOK
    // ========================================================================

    const {
        formValues,
        handleInputChange,
        handleReset,
        setFormValues,
        S, setS,
        F, setF, toggleF,
        V, setV, toggleV,
        R, setR, toggleR,
        RF, setRF, toggleRF,
        subDynamicPlots, setSubDynamicPlots, toggleSubDynamicPlot,
        scalingGroups, setScalingGroups,
        scalingBaseCosts, setScalingBaseCosts,
        finalResults, setFinalResults,
        handleFinalResultsGenerated,
        showResetOptions, setShowResetOptions,
        resetOptions, setResetOptions,
        handleResetOptionChange,
        handleResetConfirm,
        handleResetCancel,
        showDynamicPlotsOptions,
        handleDynamicPlots,
        handleDynamicPlotsOptionChange,
        handleDynamicPlotsConfirm,
        handleDynamicPlotsCancel,
        showRunOptions,
        runOptions, setRunOptions,
        handleRun: handleRunOptions,
        handleRunOptionChange,
        handleRunConfirm,
        handleRunCancel
    } = useFormValues();

    // ========================================================================
    // EFFECTS
    // ========================================================================

    // Version Event Listener
    useEffect(() => {
        const handleVersionChange = (newVersion) => {
            setSelectedVersions(Array.isArray(newVersion) ? newVersion : [newVersion]);
            setVersion(Array.isArray(newVersion) ? newVersion[0].toString() : newVersion.toString());
        };

        versionEventEmitter.on('versionChange', handleVersionChange);
        return () => {
            versionEventEmitter.off('versionChange', handleVersionChange);
        };
    }, []);

    // Theme Management Effect
    useEffect(() => {
        // Remove all theme classes
        document.documentElement.classList.remove('dark-theme', 'light-theme', 'creative-theme');

        // Map season to theme class
        const themeMap = {
            'dark': 'dark-theme',
            'light': 'light-theme',
            'creative': 'creative-theme'
        };

        // Add the appropriate theme class
        document.documentElement.classList.add(themeMap[season]);

        // Set data-theme attribute for backward compatibility
        document.documentElement.setAttribute('data-theme', season);
    }, [season]);

    // Content Loading State Effect
    useEffect(() => {
        setContentLoadingState(prev => ({
            ...prev,
            csv: activeTab === 'Case1',
            html: activeTab === 'Case2',
            plots: activeTab === 'Case3',
            iframes: {},
            images: {},
            content: {}
        }));
    }, [activeTab]);

    // Content Loading Timeout Effect
    useEffect(() => {
        if (contentLoadingState.csv || contentLoadingState.html || contentLoadingState.plots) {
            const timer = setTimeout(() => {
                setContentLoadingState(prev => ({
                    ...prev,
                    content: { ...prev.content, [activeTab]: true }
                }));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [contentLoadingState.csv, contentLoadingState.html, contentLoadingState.plots, activeTab]);

    // Fetch HTML Files Effect
    useEffect(() => {
        const fetchHtmlFiles = async () => {
            try {
                const response = await fetch(`http://localhost:8009/html?version=${version}`);
                if (!response.ok) throw new Error('Failed to fetch HTML files');
                
                const data = await response.json();
                
                // Group HTML files by album
                const albumGroupedHtmls = data.reduce((acc, file) => {
                    const album = file.album || 'Default';
                    if (!acc[album]) acc[album] = [];
                    acc[album].push(file);
                    return acc;
                }, {});

                setAlbumHtmls(albumGroupedHtmls);

                // Automatically select the first album with HTML files
                const firstAlbumWithHtml = Object.keys(albumGroupedHtmls)[0];
                if (firstAlbumWithHtml) {
                    setSelectedHtml(firstAlbumWithHtml);
                }
            } catch (error) {
                console.error('Error fetching HTML files:', error);
                setAlbumHtmls({});
            }
        };

        fetchHtmlFiles();
    }, [version]);

    // Fetch Images Effect
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://localhost:8009/plots?version=${version}`);
                if (!response.ok) throw new Error('Failed to fetch plot images');
                
                const data = await response.json();
                
                // Group images by album
                const albumGroupedImages = data.reduce((acc, file) => {
                    const album = file.album || 'Default';
                    if (!acc[album]) acc[album] = [];
                    acc[album].push(file);
                    return acc;
                }, {});

                setAlbumImages(albumGroupedImages);

                // Automatically select the first album with images
                const firstAlbumWithImages = Object.keys(albumGroupedImages)[0];
                if (firstAlbumWithImages) {
                    setSelectedAlbum(firstAlbumWithImages);
                }
            } catch (error) {
                console.error('Error fetching plot images:', error);
                setAlbumImages({});
            }
        };

        fetchImages();
    }, [version]);

    // ========================================================================
    // HANDLER FUNCTIONS
    // ========================================================================

    /**
     * Handle version change from input
     */
    const handleVersionChange = useCallback((e) => {
        const newVersion = e.target.value;
        setVersion(newVersion);
        versionEventEmitter.emit('versionChange', newVersion);
    }, []);

    /**
     * Handle refresh button click
     */
    const handleRefresh = useCallback(() => {
        setLoadingStates({ html: true, csv: true, plots: true });
        
        // Simulate refresh with timeout
        setTimeout(() => {
            setLoadingStates({ html: false, csv: false, plots: false });
        }, 1000);
    }, []);

    /**
     * Handle scaled values change from ExtendedScaling
     */
    const handleScaledValuesChange = useCallback((scaledValues) => {
        console.log('Scaled values updated:', scaledValues);
    }, []);

    /**
     * Handle scaling groups change
     */
    const handleScalingGroupsChange = useCallback((newGroups) => {
        setScalingGroups(newGroups);
    }, [setScalingGroups]);

    /**
     * Handle active scaling group change for tab persistence
     */
    const handleActiveGroupChange = useCallback((groupIndex, filterKeyword) => {
        setActiveScalingGroups(prev => ({
            ...prev,
            [filterKeyword]: groupIndex
        }));
    }, []);

    /**
     * Transform file path to URL for HTML content
     */
    const transformPathToUrlh = useCallback((filePath) => {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const batchMatch = normalizedPath.match(/Batch\((\d+)\)/);
        if (!batchMatch) return normalizedPath;

        const ver = batchMatch[1];
        const pathParts = normalizedPath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const album = pathParts[pathParts.length - 2];

        return `http://localhost:8009/static/html/${ver}/${album}/${fileName}`;
    }, []);

    /**
     * Transform file path to URL for a specific version
     */
    const transformPathToUrlForVersion = useCallback((filePath, specificVersion) => {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const pathParts = normalizedPath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const album = pathParts[pathParts.length - 2];

        return `http://localhost:8009/static/html/${specificVersion}/${album}/${fileName}`;
    }, []);

    /**
     * Transform file path to URL for plot images
     */
    const transformPathToUrl = useCallback((filePath) => {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const batchMatch = normalizedPath.match(/Batch\((\d+)\)/);
        if (!batchMatch) return normalizedPath;

        const ver = batchMatch[1];
        const pathParts = normalizedPath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const album = pathParts[pathParts.length - 2];

        return `http://localhost:8009/static/plots/${ver}/${album}/${fileName}`;
    }, []);

    /**
     * Transform album name for display
     */
    const transformAlbumName = useCallback((album) => {
        // Handle HTML_v1_2_PlotType format
        const htmlMatch = album.match(/HTML_v([\d_]+)_(.+)/);
        if (htmlMatch) {
            const versions = htmlMatch[1].replace(/_/g, ', ');
            const description = htmlMatch[2].replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
            return `${description} for versions [${versions}] (Current: ${version})`;
        }

        // Handle legacy v1_2_PlotType_Plot format
        const legacyMatch = album.match(/v([\d_]+)_(.+?)(_Plot)?$/);
        if (legacyMatch) {
            const versions = legacyMatch[1].replace(/_/g, ', ');
            const description = legacyMatch[2].replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
            return `${description} for versions [${versions}] (Current: ${version})`;
        }

        // Default formatting
        return `${album.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')} (Version ${version})`;
    }, [version]);

    /**
     * Execute batch calculation
     */
    const executeBatch = useCallback(async () => {
        setBatchRunning(true);
        setMonitoringActive(true);

        try {
            const payload = {
                version: parseInt(version),
                formValues: formValues,
                selectedV: V,
                selectedF: F,
                selectedR: R,
                selectedRF: RF,
                scalingGroups: scalingGroups,
                runOptions: runOptions
            };

            const response = await fetch('http://localhost:8002/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Calculation failed');

            const result = await response.json();
            console.log('Calculation result:', result);

        } catch (error) {
            console.error('Error during batch calculation:', error);
        } finally {
            setBatchRunning(false);
            setMonitoringActive(false);
        }
    }, [version, formValues, V, F, R, RF, scalingGroups, runOptions]);

    /**
     * Execute sensitivity analysis
     */
    const executeSensitivity = useCallback(async () => {
        setAnalysisRunning(true);
        setIsMonitoringSensitivity(true);
        setRunMode('sensitivity');

        try {
            const payload = {
                version: parseInt(version),
                SenParameters: S,
                selectedV: V,
                selectedF: F,
                scalingGroups: scalingGroups
            };

            const response = await fetch('http://localhost:8002/sensitivity/configure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Sensitivity configuration failed');

            const result = await response.json();
            console.log('Sensitivity configuration result:', result);

        } catch (error) {
            console.error('Error during sensitivity analysis:', error);
        } finally {
            setAnalysisRunning(false);
            setIsMonitoringSensitivity(false);
        }
    }, [version, S, V, F, scalingGroups]);

    /**
     * Execute dynamic plots generation
     */
    const executeDynamicPlotsGeneration = useCallback(() => {
        console.log('Generating dynamic plots with options:', subDynamicPlots);
    }, [subDynamicPlots]);

    // ========================================================================
    // RENDER FUNCTIONS
    // ========================================================================

    /**
     * Render version control UI
     */
    const renderVersionControl = () => (
        <div className="version-control-container" style={{
            position: 'sticky',
            top: '0',
            zIndex: '100',
            backgroundColor: 'var(--background-color)',
            padding: '10px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div className="version-input-group">
                <label htmlFor="version-input" style={{ marginRight: '10px' }}>Version:</label>
                <input
                    id="version-input"
                    type="number"
                    min="1"
                    value={version}
                    onChange={handleVersionChange}
                    className="version-input"
                    style={{
                        width: '80px',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)'
                    }}
                />
                <button 
                    onClick={handleRefresh}
                    className="refresh-button"
                    style={{ marginLeft: '10px' }}
                >
                    Refresh
                </button>
            </div>
            <div className="theme-controls">
                <ThemeButton 
                    currentTheme={season} 
                    onThemeChange={setSeason}
                />
            </div>
        </div>
    );

    /**
     * Render HTML content
     */
    const renderHtmlContent = () => {
        if (!selectedHtml || !albumHtmls[selectedHtml]) return null;

        return albumHtmls[selectedHtml].map((html, index) => (
            <div key={index} className={`html-content ${iframesLoaded[index] ? 'loaded' : ''}`}>
                <iframe
                    src={transformPathToUrlh(html.path)}
                    title={html.name}
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    onLoad={() => {
                        setIframesLoaded(prev => ({ ...prev, [index]: true }));
                    }}
                />
            </div>
        ));
    };

    /**
     * Render plot content
     */
    const renderPlotContent = () => {
        if (!selectedAlbum || !albumImages[selectedAlbum]) return null;

        return albumImages[selectedAlbum].map((image, index) => {
            const imageUrl = transformPathToUrl(image.path);
            return (
                <div key={index} className={`plot-content ${imagesLoaded[index] ? 'loaded' : ''}`}>
                    <CustomizableImage
                        src={imageUrl}
                        alt={image.name}
                        width="600"
                        height="400"
                        style={{ margin: '10px' }}
                        onLoad={() => {
                            setImagesLoaded(prev => ({ ...prev, [index]: true }));
                        }}
                        className={imagesLoaded[index] ? 'image-loaded' : 'image-loading'}
                    />
                </div>
            );
        });
    };

    /**
     * Render About Us content
     */
    const renderAboutUsContent = () => (
        <div className="about-us-container">
            <div className="about-us-content">
                <div className="about-us-seal"></div>
                <h1>Financial Literacy<br/>A Foundation for Economic Empowerment</h1>
                <p>Financial literacy stands as the cornerstone of personal and professional empowerment in today's complex economic landscape.</p>
                <div className="decorative-divider">✦ ✦ ✦</div>
                <h2>Synthesize disparate elements into cohesive strategies</h2>
                <p>Learners can manipulate, analyze, and internalize complex financial concepts.</p>
                <h2>Cultivating Integrated Financial Thinkers</h2>
                <div className="decorative-divider">✦ ✦ ✦</div>
            </div>
        </div>
    );

    /**
     * Render main form content
     */
    const renderForm = () => (
        <div className="form-container">
            {renderVersionControl()}
            
            {/* Sub-tab Navigation */}
            <div className="sub-tabs-container">
                <Tabs>
                    <TabList>
                        <Tab onClick={() => setActiveSubTab('ProjectConfig')}>Project Config</Tab>
                        <Tab onClick={() => setActiveSubTab('Process1Config')}>Process 1</Tab>
                        <Tab onClick={() => setActiveSubTab('Process2Config')}>Process 2</Tab>
                        <Tab onClick={() => setActiveSubTab('Revenue1Config')}>Revenue 1</Tab>
                        <Tab onClick={() => setActiveSubTab('Revenue2Config')}>Revenue 2</Tab>
                        <Tab onClick={() => setActiveSubTab('CentralScaling')}>Central Scaling</Tab>
                    </TabList>

                    {/* Project Config Tab */}
                    <TabPanel>
                        <GeneralFormConfig
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            version={version}
                            filterKeyword="Amount1"
                            V={V}
                            setV={setV}
                            R={R}
                            setR={setR}
                            toggleR={toggleR}
                            toggleV={toggleV}
                            S={S || {}}
                            setS={setS}
                            setVersion={setVersion}
                        />
                    </TabPanel>

                    {/* Process 1 Config Tab */}
                    <TabPanel>
                        <GeneralFormConfig
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            version={version}
                            filterKeyword="Amount4"
                            V={V}
                            setV={setV}
                            R={R}
                            setR={setR}
                            toggleR={toggleR}
                            toggleV={toggleV}
                            S={S || {}}
                            setS={setS}
                            setVersion={setVersion}
                            summaryItems={finalResults.Amount4}
                        />
                        <ExtendedScaling
                            baseCosts={scalingBaseCosts.Amount4 || []}
                            onScaledValuesChange={handleScaledValuesChange}
                            initialScalingGroups={scalingGroups.filter(g => g._scalingType === 'Amount4')}
                            onScalingGroupsChange={(newGroups) => {
                                const otherGroups = scalingGroups.filter(g => g._scalingType !== 'Amount4');
                                const updatedGroups = newGroups.map(g => ({...g, _scalingType: 'Amount4'}));
                                handleScalingGroupsChange([...otherGroups, ...updatedGroups]);
                            }}
                            filterKeyword="Amount4"
                            V={V}
                            R={R}
                            toggleV={toggleV}
                            toggleR={toggleR}
                            onFinalResultsGenerated={handleFinalResultsGenerated}
                            activeGroupIndex={activeScalingGroups.Amount4 || 0}
                            onActiveGroupChange={handleActiveGroupChange}
                        />
                    </TabPanel>

                    {/* Process 2 Config Tab */}
                    <TabPanel>
                        <GeneralFormConfig
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            version={version}
                            filterKeyword="Amount5"
                            V={V}
                            setV={setV}
                            R={R}
                            setR={setR}
                            toggleR={toggleR}
                            toggleV={toggleV}
                            S={S || {}}
                            setS={setS}
                            setVersion={setVersion}
                            summaryItems={finalResults.Amount5}
                        />
                        <ExtendedScaling
                            baseCosts={scalingBaseCosts.Amount5 || []}
                            onScaledValuesChange={handleScaledValuesChange}
                            initialScalingGroups={scalingGroups.filter(g => g._scalingType === 'Amount5')}
                            onScalingGroupsChange={(newGroups) => {
                                const otherGroups = scalingGroups.filter(g => g._scalingType !== 'Amount5');
                                const updatedGroups = newGroups.map(g => ({...g, _scalingType: 'Amount5'}));
                                handleScalingGroupsChange([...otherGroups, ...updatedGroups]);
                            }}
                            filterKeyword="Amount5"
                            V={V}
                            R={R}
                            toggleV={toggleV}
                            toggleR={toggleR}
                            onFinalResultsGenerated={handleFinalResultsGenerated}
                            activeGroupIndex={activeScalingGroups.Amount5 || 0}
                            onActiveGroupChange={handleActiveGroupChange}
                        />
                    </TabPanel>

                    {/* Revenue 1 Config Tab */}
                    <TabPanel>
                        <GeneralFormConfig
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            version={version}
                            filterKeyword="Amount6"
                            V={V}
                            setV={setV}
                            R={R}
                            setR={setR}
                            toggleR={toggleR}
                            toggleV={toggleV}
                            S={S || {}}
                            setS={setS}
                            setVersion={setVersion}
                            summaryItems={finalResults.Amount6}
                        />
                        <ExtendedScaling
                            baseCosts={scalingBaseCosts.Amount6 || []}
                            onScaledValuesChange={handleScaledValuesChange}
                            initialScalingGroups={scalingGroups.filter(g => g._scalingType === 'Amount6')}
                            onScalingGroupsChange={(newGroups) => {
                                const otherGroups = scalingGroups.filter(g => g._scalingType !== 'Amount6');
                                const updatedGroups = newGroups.map(g => ({...g, _scalingType: 'Amount6'}));
                                handleScalingGroupsChange([...otherGroups, ...updatedGroups]);
                            }}
                            filterKeyword="Amount6"
                            V={V}
                            R={R}
                            toggleV={toggleV}
                            toggleR={toggleR}
                            onFinalResultsGenerated={handleFinalResultsGenerated}
                            activeGroupIndex={activeScalingGroups.Amount6 || 0}
                            onActiveGroupChange={handleActiveGroupChange}
                        />
                    </TabPanel>

                    {/* Revenue 2 Config Tab */}
                    <TabPanel>
                        <GeneralFormConfig
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            version={version}
                            filterKeyword="Amount7"
                            V={V}
                            setV={setV}
                            R={R}
                            setR={setR}
                            toggleR={toggleR}
                            toggleV={toggleV}
                            S={S || {}}
                            setS={setS}
                            setVersion={setVersion}
                            summaryItems={finalResults.Amount7}
                        />
                        <ExtendedScaling
                            baseCosts={scalingBaseCosts.Amount7 || []}
                            onScaledValuesChange={handleScaledValuesChange}
                            initialScalingGroups={scalingGroups.filter(g => g._scalingType === 'Amount7')}
                            onScalingGroupsChange={(newGroups) => {
                                const otherGroups = scalingGroups.filter(g => g._scalingType !== 'Amount7');
                                const updatedGroups = newGroups.map(g => ({...g, _scalingType: 'Amount7'}));
                                handleScalingGroupsChange([...otherGroups, ...updatedGroups]);
                            }}
                            filterKeyword="Amount7"
                            V={V}
                            R={R}
                            toggleV={toggleV}
                            toggleR={toggleR}
                            onFinalResultsGenerated={handleFinalResultsGenerated}
                            activeGroupIndex={activeScalingGroups.Amount7 || 0}
                            onActiveGroupChange={handleActiveGroupChange}
                        />
                    </TabPanel>

                    {/* Central Scaling Tab */}
                    <TabPanel>
                        <CentralScalingTab
                            scalingGroups={scalingGroups}
                            setScalingGroups={setScalingGroups}
                            scalingBaseCosts={scalingBaseCosts}
                            finalResults={finalResults}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Selectors Container */}
            <div className="selectors-container">
                <div className="property-selector-container">
                    <PropertySelector
                        selectedProperties={selectedProperties}
                        setSelectedProperties={setSelectedProperties}
                    />
                </div>
                <div className="version-selector-container">
                    <VersionSelector />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-container">
                <button 
                    className="action-button run-button"
                    onClick={executeBatch}
                    disabled={batchRunning}
                >
                    {batchRunning ? 'Running...' : 'Run Calculation'}
                </button>
                <button 
                    className="action-button sensitivity-button"
                    onClick={executeSensitivity}
                    disabled={analysisRunning}
                >
                    {analysisRunning ? 'Analyzing...' : 'Run Sensitivity'}
                </button>
                <button 
                    className="action-button reset-button"
                    onClick={() => setShowResetOptions(true)}
                >
                    Reset Options
                </button>
            </div>
        </div>
    );

    /**
     * Render main tab content based on active tab
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'AboutUs':
                return renderAboutUsContent();

            case 'Input':
                return renderForm();

            case 'NaturalMotion':
                return (
                    <div className="model-selection">
                        <SpatialTransformComponent />
                    </div>
                );

            case 'Results':
                return (
                    <div className="results-container">
                        <Tabs>
                            <TabList>
                                <Tab>HTML Reports</Tab>
                                <Tab>CSV Data</Tab>
                                <Tab>Plots</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="html-selector">
                                    <select 
                                        value={selectedHtml || ''} 
                                        onChange={(e) => setSelectedHtml(e.target.value)}
                                    >
                                        {Object.keys(albumHtmls).map(album => (
                                            <option key={album} value={album}>
                                                {transformAlbumName(album)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {renderHtmlContent()}
                            </TabPanel>
                            <TabPanel>
                                <CustomizableTable version={version} />
                            </TabPanel>
                            <TabPanel>
                                <PlotsTabs 
                                    version={version}
                                    selectedVersions={selectedVersions}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                );

            case 'Sensitivity':
                return (
                    <div className="sensitivity-container">
                        <SensitivityPlotsTabs 
                            version={version}
                            selectedVersions={selectedVersions}
                            S={S}
                        />
                    </div>
                );

            case 'Monitoring':
                return (
                    <div className="monitoring-container">
                        <Tabs>
                            <TabList>
                                <Tab>Calculation Monitor</Tab>
                                <Tab>Sensitivity Monitor</Tab>
                                <Tab>Configuration Monitor</Tab>
                            </TabList>
                            <TabPanel>
                                <CalculationMonitor 
                                    isActive={monitoringActive}
                                    version={version}
                                />
                            </TabPanel>
                            <TabPanel>
                                <SensitivityMonitor 
                                    isActive={isMonitoringSensitivity}
                                    version={version}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ConfigurationMonitor 
                                    version={version}
                                    formValues={formValues}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                );

            case 'FactEngine':
                return (
                    <div className="fact-engine-container">
                        <Tabs>
                            <TabList>
                                <Tab>Fact Engine</Tab>
                                <Tab>Admin</Tab>
                            </TabList>
                            <TabPanel>
                                <FactEngine version={version} />
                            </TabPanel>
                            <TabPanel>
                                <FactEngineAdmin version={version} />
                            </TabPanel>
                        </Tabs>
                    </div>
                );

            case 'Testing':
                return (
                    <div className="testing-container">
                        <TestingZone 
                            version={version}
                            formValues={formValues}
                        />
                    </div>
                );

            case 'Library':
                return (
                    <div className="library-container">
                        <ProcessEconomicsLibrary />
                    </div>
                );

            default:
                return <div>Select a tab to view content</div>;
        }
    };

    // ========================================================================
    // POPUP RENDERS
    // ========================================================================

    /**
     * Render reset options popup
     */
    const renderResetOptionsPopup = () => {
        if (!showResetOptions) return null;

        return (
            <div className="popup-overlay">
                <div className="popup-container reset-options-popup">
                    <h3>Reset Options</h3>
                    <div className="reset-options-list">
                        {Object.entries(resetOptions).map(([key, value]) => (
                            <label key={key} className="reset-option-item">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleResetOptionChange(key)}
                                />
                                <span>{key} Parameters</span>
                            </label>
                        ))}
                    </div>
                    <div className="popup-buttons">
                        <button onClick={handleResetConfirm} className="confirm-button">
                            Confirm Reset
                        </button>
                        <button onClick={handleResetCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render dynamic plots options popup
     */
    const renderDynamicPlotsPopup = () => {
        if (!showDynamicPlotsOptions) return null;

        return (
            <div className="popup-overlay">
                <div className="popup-container dynamic-plots-popup">
                    <h3>Dynamic Plots Options</h3>
                    <div className="plots-options-list">
                        {Object.entries(subDynamicPlots).map(([key, value]) => (
                            <label key={key} className="plot-option-item">
                                <input
                                    type="checkbox"
                                    checked={value === 'on'}
                                    onChange={() => handleDynamicPlotsOptionChange(key)}
                                />
                                <span>{key}</span>
                            </label>
                        ))}
                    </div>
                    <div className="popup-buttons">
                        <button onClick={handleDynamicPlotsConfirm} className="confirm-button">
                            Generate Plots
                        </button>
                        <button onClick={handleDynamicPlotsCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render run options popup
     */
    const renderRunOptionsPopup = () => {
        if (!showRunOptions) return null;

        return (
            <div className="popup-overlay">
                <div className="popup-container run-options-popup">
                    <h3>Run Options</h3>
                    <div className="run-options-list">
                        {Object.entries(runOptions).map(([key, value]) => (
                            <label key={key} className="run-option-item">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleRunOptionChange(key)}
                                />
                                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </label>
                        ))}
                    </div>
                    <div className="popup-buttons">
                        <button onClick={handleRunConfirm} className="confirm-button">
                            Start Run
                        </button>
                        <button onClick={handleRunCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // ========================================================================
    // MAIN RENDER
    // ========================================================================

    return (
        <div className="homepage-container">
            {/* Header */}
            <StickerHeader />

            {/* Main Navigation Tabs */}
            <nav className="main-navigation">
                <Tabs>
                    <TabList>
                        <Tab onClick={() => setActiveTab('AboutUs')}>About Us</Tab>
                        <Tab onClick={() => setActiveTab('Input')}>Input</Tab>
                        <Tab onClick={() => setActiveTab('NaturalMotion')}>Natural Motion</Tab>
                        <Tab onClick={() => setActiveTab('Results')}>Results</Tab>
                        <Tab onClick={() => setActiveTab('Sensitivity')}>Sensitivity</Tab>
                        <Tab onClick={() => setActiveTab('Monitoring')}>Monitoring</Tab>
                        <Tab onClick={() => setActiveTab('FactEngine')}>Fact Engine</Tab>
                        <Tab onClick={() => setActiveTab('Testing')}>Testing</Tab>
                        <Tab onClick={() => setActiveTab('Library')}>Library</Tab>
                    </TabList>

                    {/* Tab Panels */}
                    <TabPanel>{activeTab === 'AboutUs' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Input' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'NaturalMotion' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Results' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Sensitivity' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Monitoring' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'FactEngine' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Testing' && renderTabContent()}</TabPanel>
                    <TabPanel>{activeTab === 'Library' && renderTabContent()}</TabPanel>
                </Tabs>
            </nav>

            {/* Popups */}
            {renderResetOptionsPopup()}
            {renderDynamicPlotsPopup()}
            {renderRunOptionsPopup()}
        </div>
    );
};

// ============================================================================
// WRAPPER COMPONENT
// ============================================================================

/**
 * HomePage wrapper component with error boundary support
 */
const HomePage = () => {
    return (
        <HomePageContent />
    );
};

export default HomePage;
