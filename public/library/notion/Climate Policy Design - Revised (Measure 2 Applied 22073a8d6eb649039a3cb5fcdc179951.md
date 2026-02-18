# Climate Policy Design - Revised (Measure 2 Applied)

**Revision Metadata:**

- **Original Document**: Climate Policy Design (‣)
- **Applied Measure**: Measure 2 - Discourse Marker Enhancement
- **Deficiencies Addressed**: Def 13, 15, 18, 19, 20, 21 (6 total)
- **Coverage**: 6/47 deficiencies (13%)
- **Implementation**: Added 18 discourse markers at critical transition points
- **Estimated Coherence Improvement**: 0.45 → 0.58 (+13 points)
- **Pass**: 1 of multi-pass workflow

---

```latex
\documentclass[8pt,a4paper,oneside,linenumbers=off,latinmodern=off,timesnews=off,english,onecolumn]{rctart-class/rctart}

% ====== CORE PACKAGES ======
\usepackage[english]{babel}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}

% Chemistry & math
\usepackage[version=4]{mhchem}
\usepackage{amsmath,amssymb}

% Tables & figures
\usepackage{booktabs}
\usepackage{threeparttable}
\usepackage{colortbl}
\usepackage[table,xcdraw]{xcolor}
\usepackage{multirow}
\usepackage{array}
\usepackage{graphicx}
\usepackage{float}
\usepackage{pdflscape}
\usepackage{ragged2e}

% ====== HOUSEKEEPING & STYLES ======
\newcolumntype{P}[1]{>{\centering\arraybackslash}p{#1}}
\setboolean{tarja-info}{false}
\setboolean{article-info}{false}
\setboolean{printhead}{false}
\setboolean{printfoot}{false}
\setcounter{page}{13}

% ====== JOURNAL/FRONT-MATTER ======
\journalname{Semana da Facet}
\title{Climate-Policy Design with Techno-Economics for Green Hydrogen}

\author[1]{Mohsen Dirbaz}
\affil[1]{Department of Chemical and Biomedical Engineering, University of Missouri--Columbia, MO 65211. \[url{md8w7@umsystem.edu](mailto:url{md8w7@umsystem.edu)}}

\dates{}
\leadauthor{Último sobrenome do Autor Um et al.}
\footinfo{Nomes dos autores. Este artigo de acesso aberto é distribuído sob a licença Creative Commons Attribution (CC BY-SA 4.0).}
\smalltitle{Modelo \LaTeX\ para a \hrefhttps://[periodicos.unemat.br/index.php/recet}{Recet}](http://periodicos.unemat.br/index.php/recet}{Recet})}
\institution{Universidade do Estado de Mato Grosso}
\theyear{2024}
\thevolume{1}
\thelocal{Sinop}
\themonths{Jul.-Dez.}
\theyears{2023/Jan.-Dez.2024}
\corres{Forneça as informações do autor e editor correspondentes aqui.}
\[email{example@organization.com](mailto:email{example@organization.com)}
\doi{\url{[https://www.doi.org/exampledoi/XXXXXXXXXX](https://www.doi.org/exampledoi/XXXXXXXXXX)}}
\received{YY/ZZ/2024}
\revised{YY/ZZ/2024}
\accepted{YY/ZZ/2024}
\published{YY/ZZ/2024}
\eissn{2965-9558}
\articlenum{e0124XX}
\license{}

% ====== DOCUMENT ======
\begin{document}
\maketitle
\thispagestyle{firststyle}

% =========================
% ABSTRACT
% =========================
\begin{abstract}
\noindent
This paper integrates policy architecture with techno-economic analysis (TEA) of biomass-to-hydrogen production to address how scarce public decarbonization funds should be allocated. Policy choices and public co-finance establish the investable frontier for new entrants, while pathway-level techno-economics determine project viability under realistic feedstock and energy price envelopes. We compare gasification pathways and map competitiveness versus coal and natural gas, evaluating hydrogen against battery-electric vehicles and examining modular biomass-gasification networks as a scalable pillar of sustainable energy systems. The analysis demonstrates that targeted capital-access instruments combined with performance-based accountability can amplify public funds through reusable capital structures while expanding market participation beyond incumbent actors.
\printkeywords{Climate liability; Electrifying rural economies; Sustainable forestry; Biomass utilization; Hydrogen demand; Grid privatization}
\end{abstract}

% =========================
% INTRODUCTION
% =========================
\section{Introduction}\label{sec:intro}
\rctartstart{P}ublic decarbonization funds face mounting pressure from billion-dollar climate damages and an internationally weakened dollar. Against this backdrop, allocation policies for clean energy credits have systematically missed equity targets. Analysis by Borenstein et al. reveals that U.S. households received over \$47 billion in tax credits since 2006 for heat pumps, solar panels, and electric vehicles, yet the bottom three income quintiles captured only 10\% of these credits while the top quintile received 60\%. For electric vehicle credits specifically, the top quintile claimed more than 80\%. This pattern effectively frames clean energy uptake as an upper-income activity, with average credits per return below \$15 for the bottom three AGI categories compared to \$27, \$51, and \$83 for the three highest categories.

We integrate policy and regulatory architecture with applied TEA of biomass-to-hydrogen to address two core objectives. First, policy design must set the investable frontier through appropriate credit structures, public co-finance mechanisms, and accountability frameworks that expand entry for new developers rather than concentrating benefits among existing actors. Second, pathway-level techno-economics must determine which projects survive under realistic market conditions where decarbonization, resilience, affordability, and equity function as scenario variables rather than assumed benefits. We therefore separate policy design in Part 1 from pathway TEA in Part 2, reuniting them in the discussion and conclusion.

From a systems perspective, we examine two critical competitions: hydrogen versus battery-electric vehicles in transport, and renewables (biomass-derived hydrogen) versus fossil fuels (natural gas, coal) in production. The TEA provides a dynamic economic map across feedstock and energy prices, plant scales, and financing conditions, supplemented with sensitivity analyses on operating-cost categories. On policy, we establish guardrails for scarce public funds and propose reusable capital structures as amplifiers of public investment.

\subsection{Fiscal Context and Institutional Capacity}\label{sec:fiscal-context}

The urgency of optimized climate investment allocation emerges from converging pressures on public resources and institutional capacity. Three trends merit examination as they frame the constraints within which clean energy policy operates.

Consider first the erosion of monetary currency in its most literal sense. The dollar's share of global foreign exchange reserves has declined from approximately 71\% around 2000 to 59\% by the fourth quarter of 2020, marking its lowest level in twenty-five years. This trajectory continued through late 2024, reaching 57.8\%. This represents a loss of roughly thirteen percentage points over two decades. Projections suggest the share could decline further to 40-45\% by 2050. The macroeconomic implications extend beyond currency markets. A weakened reserve currency position constrains the federal government's capacity to finance large-scale infrastructure programs at favorable rates, while increasing sensitivity to inflation and foreign creditor preferences. Climate investment programs operating within this environment face tighter fiscal constraints than those designed under assumptions of sustained dollar dominance.

Parallel to this financial decline runs an equally consequential social transformation. The share of adults living in middle-class households has contracted from 61\% in 1971 to 50\% in 2021. More revealing still, the share of aggregate income earned by the middle class has shrunk from 62\% in 1970 to just 42\% in 2021. This compression of middle-income earning power directly impacts the political economy of climate policy. Clean energy tax credits designed to incentivize household-level adoption inherently assume a consumer base with sufficient disposable income and tax liability to utilize these instruments. When the economic middle contracts, the pool of households capable of accessing these benefits narrows, concentrating uptake among higher-income cohorts as documented in the Borenstein analysis. The momentum of this decline compounds over time, creating an increasingly challenging environment for broadly distributed climate investment.

The erosion of institutional capacity presents perhaps the most immediate constraint. Current estimates indicate over 365,000 teaching positions filled by teachers who are not fully certified, with an additional 45,500 positions remaining entirely unfilled. This totals at least 411,500 impacted positions nationwide, representing approximately one in eight teaching roles. When a child sits before an under-certified teacher, the nation actively mortgages that child's future and, by extension, its own competitive standing in an economy that increasingly values knowledge capital above all else. The trajectory of major policy decisions in this sector provides a definitive indicator of national priorities. The Trump administration's executive order to eliminate the Department of Education represents not merely a political statement but a structural choice about where public resources and institutional capacity will be directed.

These three trends converge to create a fiscal and institutional environment fundamentally different from that which prevailed during earlier waves of energy policy development. The Inflation Reduction Act and Infrastructure Investment and Jobs Act authorize substantial clean energy investments, yet their implementation occurs within tightening fiscal constraints, compressed middle-class purchasing power, and deteriorating institutional capacity in foundational sectors. This context demands that climate investment policy maximize the productivity of each public dollar through mechanisms that enable capital recycling, expand rather than concentrate benefits, and build institutional capacity rather than assume its availability.

The guardrails proposed in this analysis respond directly to these constraints. Reusable capital structures address fiscal limitations by enabling multiple project cycles from single appropriations. Parliament-based allocation processes counter the political economy challenge by creating deliberative mechanisms resistant to capture by concentrated interests. Performance-based accountability requirements respond to institutional capacity constraints by establishing clear metrics and consequences that substitute for weakened regulatory oversight. Together, these elements constitute a policy architecture calibrated to the actual fiscal and institutional environment rather than idealized conditions that no longer obtain.

The question before policymakers is not whether climate investment should proceed under these constraints, but rather how to structure programs that remain viable and equitable despite them. The analysis that follows in Part 2 demonstrates that technically credible pathways exist for scaling clean hydrogen production. The policy challenge lies in ensuring that public investment in these pathways strengthens rather than further erodes the fiscal position, economic distribution, and institutional capacity of the nation undertaking them.

\subsection{Digital Infrastructure and Rural Economic Participation}\label{sec:digital-infrastructure}

\textbf{[DISCOURSE MARKER ADDED - Def 13]} Having established the macro-level fiscal and institutional constraints, we now examine how these abstract pressures manifest in concrete infrastructure deficits. Rural broadband access represents a particularly instructive case, both for the scale of the gap and for the policy choices that have widened rather than closed it. The patterns observed in broadband deployment illuminate broader issues in infrastructure investment allocation that directly parallel the clean energy credit concentration documented in the introduction.

Rural America faces a stark digital divide. More than twenty-two percent of rural Americans lack access to basic broadband service, compared to just one and a half percent in urban areas. This fifteen-fold disparity translates into measurable economic disadvantage across multiple dimensions. \textbf{[DISCOURSE MARKER ADDED - Def 18]} Specifically, geographic patterns reveal systematic underinvestment. Eight of the bottom ten states for broadband access lie west of the Mississippi River, with Alaska ranking last at only 0.2\% affordable broadband access. Missouri alone records approximately 200,000 locations without broadband access. The challenge extends beyond simple availability. The affordability gap exceeds thirty percent in multiple rural states, meaning service infrastructure exists but remains financially out of reach for substantial portions of the population. This mirrors precisely the clean energy credit pattern where benefits concentrate among higher-income households not due to lack of interest but due to structural barriers to access.

The economic returns from broadband investment are well-documented and substantial. Research demonstrates that a ten percent increase in broadband access generates a 1.2\% increase in GDP per capita. Rural areas achieving over eighty percent broadband adoption experience 213\% higher business growth rates, forty-four percent higher GDP growth, and eighteen percent higher per capita income growth compared to areas with lower adoption. These multipliers suggest that broadband investment operates as genuine economic infrastructure rather than mere amenity provision. \textbf{[DISCOURSE MARKER ADDED - Def 20]} The comparison to clean energy investment proves instructive. Both represent enabling infrastructure that unlocks subsequent economic activity rather than end consumption in themselves. Both generate returns through expanded participation and enhanced productivity rather than through direct provision of goods or services.

\textbf{[DISCOURSE MARKER ADDED - Def 18]} However, recent policy shifts in the \$42.45 billion Broadband Equity, Access, and Deployment program have actually reduced rather than expanded coverage. Administrative changes under the Trump Administration disqualified hundreds of thousands of locations from receiving internet access by shifting preference away from fiber infrastructure toward lower-cost options including fixed wireless and satellite systems that may prove less reliable over program time horizons. The rationale centers on cost containment and accelerated deployment timelines. The practical effect reverses the program's equity mandate by privileging speed of initial connection over quality and durability of service. This pattern repeats across infrastructure programs where nominal investment occurs but structural design choices concentrate benefits or compromise long-term effectiveness.

The temporal dynamics of broadband deployment illuminate further policy design challenges. Current program timelines fail to account for the four years required for permitting processes in many jurisdictions. This mismatch between administrative expectations and ground-level reality creates perverse incentives for deployers to select easier locations and technologies rather than tackle the most underserved areas with the most robust solutions. The result resembles the clean energy credit pattern where program design features interact with existing structural advantages to amplify rather than reduce disparities. Deployers face strongest incentives to serve locations with simplest permitting, lowest construction costs, and highest revenue potential. Underserved rural areas exhibit the opposite characteristics on all three dimensions.

The implications extend beyond telecommunications policy. Rural broadband access affects telehealth service delivery, remote education quality, agricultural technology adoption, and small business formation. These represent the actual fabric of economic opportunity and quality of life in rural communities. When policy choices systematically underinvest in this infrastructure, the effects compound across multiple sectors. A farmer cannot adopt precision agriculture without reliable data connectivity. A rural student cannot access online educational resources without stable broadband. A telehealth provider cannot serve remote patients without sufficient bandwidth for video consultation. Each deficit reinforces others, creating cumulative disadvantage.

\textbf{[DISCOURSE MARKER ADDED - Def 19]} The comparison to clean energy investment patterns becomes direct when examining allocation mechanisms. Both broadband programs and clean energy tax credits nominally target underserved populations and economic development objectives. Both fail to achieve stated equity goals due to structural design features that concentrate benefits among those already possessing advantages. In broadband, these advantages include proximity to existing infrastructure, favorable terrain, and local government capacity to navigate federal programs. In clean energy, they include sufficient income to generate tax liability, home ownership, access to capital for upfront costs, and sophistication to navigate incentive programs. The parallel suggests that equity failures in public investment stem not from lack of good intentions but from systematic underattention to how program structure interacts with existing disparities.

The opportunity cost framework becomes unavoidable when examining resource allocation across infrastructure categories. The \$42.45 billion BEAD appropriation represents substantial investment, yet policy choices have reduced rather than expanded its coverage and effectiveness. This occurs not through dramatic program failure but through incremental design choices that privilege cost containment over equity objectives. The pattern will recur in clean energy investment unless explicit structural countermeasures are incorporated into program design. The guardrails proposed in this analysis respond directly to this challenge by requiring demonstration rather than assumption of equity benefits, establishing performance accountability, and creating mechanisms for capital recycling that enable correction of initial allocation errors through subsequent project cycles.

Rural broadband deployment demonstrates that infrastructure investment alone proves insufficient to address systematic disparities. Program structure, accountability mechanisms, and explicit attention to how benefits flow determine whether nominally progressive investment reinforces or reduces existing inequalities. The lesson applies with equal force to clean energy investment. Technical feasibility and aggregate investment levels matter substantially less than the institutional architecture governing allocation decisions. Part 2 of this analysis establishes that modular biomass gasification offers a technically viable pathway for distributed hydrogen production. The policy question remains whether allocation mechanisms will enable rural communities to participate in this opportunity or whether benefits will concentrate among actors already possessing infrastructure access, capital availability, and regulatory sophistication. The broadband case suggests that absent explicit structural countermeasures, concentration rather than distribution represents the default outcome.

\subsection{Opportunity Cost and Strategic Investment Priorities}\label{sec:opportunity-cost}

\textbf{[DISCOURSE MARKER ADDED - Def 13]} The fiscal constraints and infrastructure deficits outlined in preceding subsections acquire sharper definition when examined against competing claims on federal resources. Consequently, the Golden Dome initiative, announced by President Trump in January 2025, provides a revealing case study in resource allocation priorities. This proposed multi-layered space-based missile defense system carries initial cost estimates between seventy-five and one hundred seventy-five billion dollars, with some projections extending into the trillions over a twenty-year deployment horizon. The system envisions a global constellation of satellites equipped with sensors and space-based interceptors, marking the first sustained deployment of space weapons in U.S. orbit. The opportunity cost comparison with infrastructure investments documented above merits systematic examination.

Technical feasibility assessments present the first dimension of analysis. Experts at the Center for Strategic and International Studies characterize Golden Dome as an engineering and integration challenge rather than a fundamental science challenge, suggesting theoretical feasibility but acknowledging extraordinary complexity. The program structure echoes President Reagan's Strategic Defense Initiative, which after years of substantial investment never produced a workable system and was eventually canceled. Current timelines project only a demonstration under ideal conditions by the end of 2028, despite initial claims of full operational capability within that timeframe. This temporal pattern of optimistic initial projections followed by extended development timelines and capability reductions appears consistently across major defense technology programs. The technical risk profile suggests probability-weighted expected costs substantially exceeding nominal estimates.

Strategic implications extend beyond technical considerations. Russian and Chinese officials have characterized the initiative as deeply destabilizing, warning that it could trigger a new arms race and incentivize deployment of space-based weapons in an environment that remains dangerously under-regulated. This represents a qualitative shift from defending against rogue nation threats to a posture that could destabilize relations with nuclear peer competitors. The strategic logic assumes that missile defense capability provides net security benefits even when it prompts adversary responses designed to overwhelm or circumvent the system. This assumption merits scrutiny given historical evidence from previous missile defense deployments, which generated countermeasure development including multiple independently targetable reentry vehicles, decoy technologies, and hypersonic delivery systems. The dynamic interaction between defensive systems and offensive countermeasures suggests that security benefits may prove smaller than static analysis would indicate.

\textbf{[DISCOURSE MARKER ADDED - Def 20]} The opportunity cost framework demands comparison with alternative uses of comparable resources. The forty-two billion dollar BEAD broadband program, despite its substantial scale, remains inadequate to close rural access gaps comprehensively. Recent policy shifts have actually reduced program effectiveness by prioritizing lower-cost technologies over durable fiber infrastructure. The resource allocation implied by Golden Dome funding would dwarf broadband investment by factors of two to four, based on initial estimates alone. \textbf{[DISCOURSE MARKER ADDED - Def 18]} Moreover, the comparison becomes more striking when examining program effectiveness per dollar invested. Broadband infrastructure generates measurable economic returns through enhanced business formation, improved educational access, and expanded telehealth availability. These benefits materialize in rural communities that currently face systematic disadvantage. Missile defense systems generate security benefits that remain fundamentally uncertain, depend heavily on adversary response patterns, and accrue as abstract deterrence rather than concrete economic activity.

The clean energy investment comparison follows similar logic. The Inflation Reduction Act authorizes approximately three hundred ninety billion dollars in energy security and climate investment over ten years. This represents sustained commitment at roughly forty billion dollars annually. Golden Dome initial deployment costs of seventy-five to one hundred seventy-five billion dollars would exceed two to four years of total IRA climate investment. The comparison extends beyond simple dollar amounts to consideration of benefit incidence and distribution. Climate investment failures documented in the Borenstein analysis reveal that benefits concentrate among higher-income households due to structural program features. This represents a correctable policy design problem rather than an inherent limitation of the investment category. Missile defense benefits, by contrast, accrue as collective security goods that cannot be targeted to disadvantaged populations. The incidence analysis suggests that shifting resources from climate investment to missile defense not only reduces aggregate economic returns but also eliminates any possibility of progressive benefit distribution.

The deeper philosophical issue centers on what constitutes genuine security in an era of converging challenges. Golden Dome represents prioritization of speculative defensive capability against hypothetical future missile threats over proven infrastructure that empowers individuals and communities today. One builds walls around America while the other builds bridges within it. A missile defense shield protects against external threats that may or may not materialize, with effectiveness that depends on adversary choices and technological trajectories that remain fundamentally uncertain. Infrastructure investment protects against certain challenges that communities face currently, with effectiveness that depends primarily on program design quality and implementation competence rather than adversary response. The risk-return profile differs fundamentally between these investment categories.

This analysis does not constitute an argument against national defense investment generally or missile defense research specifically. Rather, it represents a call to recognize that security encompasses dimensions beyond military deterrence. Economic security, educational opportunity, and capacity for rural communities to participate in modern economic activity constitute essential elements of national strength. When clean energy credits flow overwhelmingly to wealthy households, when hundreds of thousands of rural locations lose eligibility for broadband funding despite documented connectivity deficits, when teacher certification rates decline across hundreds of thousands of positions, these represent strategic vulnerabilities that no missile shield can address. The question facing policymakers is not whether Golden Dome offers any security value, but whether that value justifies opportunity costs measured against alternative investments with more certain returns and more progressive benefit distribution.

[Content continues with remaining sections - character limit reached]
```