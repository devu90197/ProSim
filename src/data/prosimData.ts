import { StatItem, IndustryItem, ServiceItem, ClientItem, ProjectCaseStudy, JobOpening } from '../types';

export const HERO_DATA = {
  headline: "Engineering through Delivery Excellence",
  subheadline: "Delivering innovative engineering solutions across energy sectors, helping customers solve their most pressing challenges through delivery excellence.",
  primaryCta: "Explore Industries",
  secondaryCta: "Request Engineering Consultation",
  tickerItems: [
    "ASME Sec III / VIII & RCC-M Nuclear Codes",
    "Finite Element Analysis & Structural Dynamics",
    "Computational Fluid Dynamics & Thermal Hydraulics",
    "Piping Stress, Surge & Water Hammer Simulation",
    "Fitness-for-Service (API 579 / BS 7910)",
    "Plant Life Extension & Digital Twin Engineering"
  ]
};

export const ABOUT_DATA = {
  companyName: "ProSIM",
  tagline: "Multidisciplinary Engineering & Simulation Partners",
  statement: "ProSIM is a multidisciplinary engineering and design company delivering reliable solutions across the Energy, Process, Utilities, and Infrastructure sectors, working with EPCs, OEMs, and engineering service companies from engineering design through detailed engineering and analysis.",
  pillars: [
    {
      title: "Advanced Physics-Based Simulation",
      desc: "High-precision FEA, CFD, seismic, and multi-body dynamics predicting extreme real-world operating physics."
    },
    {
      title: "Global Regulatory Compliance",
      desc: "Deep compliance mastery with ASME, RCC-M, API 579, BS 7910, IEEE, EN, and AERB nuclear/industrial standards."
    },
    {
      title: "End-to-End Delivery Excellence",
      desc: "From conceptual design and sizing calculation to 3D CAD modeling, detailed design, and life extension."
    },
    {
      title: "Trusted by Global EPCs & OEMs",
      desc: "Over 25 years acting as an agile engineering arm for world-class energy and infrastructure conglomerates."
    }
  ]
};

export const STATS_DATA: StatItem[] = [
  {
    id: "stat-projects",
    value: 3600,
    suffix: "+",
    label: "Projects Delivered",
    highlight: "Across 18+ Countries",
    description: "Successfully executed mission-critical engineering and simulation projects with 100% on-time delivery track record."
  },
  {
    id: "stat-years",
    value: 25,
    suffix: "+",
    label: "Years of Engineering Excellence",
    highlight: "Founded 1999",
    description: "Quarter-century of deep domain mastery, rigorous peer review, and engineering innovation."
  },
  {
    id: "stat-customers",
    value: 800,
    suffix: "+",
    label: "Trusted Customers",
    highlight: "EPCs, OEMs & Operators",
    description: "Long-standing engineering partnerships with national nuclear authorities, oil majors, and global energy conglomerates."
  },
  {
    id: "stat-hours",
    value: 4,
    suffix: "M+",
    label: "Hours of Experience",
    highlight: "High-Fidelity Engineering",
    description: "Cumulative multi-disciplinary design, simulation, and analysis hours delivered by senior specialist engineers."
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "nuclear-power",
    title: "Nuclear Power",
    category: "Clean & Base-Load Energy",
    shortDesc: "Reactor pressure vessel integrity, seismic qualification, containment analysis, and RCC-M code design.",
    fullDesc: "ProSIM provides mission-critical structural, thermal-hydraulic, and seismic engineering for nuclear island and balance-of-plant systems. We specialize in ASME Section III (Class 1, 2, 3) and RCC-M code compliance, reactor internal dynamics, core shroud stress analysis, severe accident mitigation simulations, and life extension studies.",
    capabilities: [
      "Reactor Pressure Vessel (RPV) & Core Shroud FEA",
      "Seismic Floor Response Spectra (FRS) & SSE Qualification",
      "Thermal Stratification & Striping Simulations",
      "Loss of Coolant Accident (LOCA) Pipe Whip Restraints",
      "AERB & RCC-M Class 1 Equipment Certification"
    ],
    keyStandards: ["ASME Section III", "RCC-M", "AERB / US NRC", "ASME Section XI"],
    sampleProject: "Seismic and thermal fatigue qualification of 700 MWe PHWR primary coolant piping and calandria internals.",
    metrics: "120+ Nuclear Reactor Systems Qualified",
    iconName: "Atom",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "thermal-energy",
    title: "Thermal Energy",
    category: "Power Generation",
    shortDesc: "Supercritical boilers, steam & gas turbine rotors, HRSG transient thermal stress, and creep-fatigue analysis.",
    fullDesc: "Supporting EPCs and power utilities with high-temperature, high-pressure equipment engineering. We simulate transient thermal gradients, creep-fatigue interaction under cyclic load shifting, boiler header remaining life assessment, and CFD of furnace combustion dynamics.",
    capabilities: [
      "Supercritical Boiler Headers & Membrane Wall FEA",
      "Steam/Gas Turbine Casing & Blade Dynamics",
      "Heat Recovery Steam Generator (HRSG) Transient Analysis",
      "Creep-Fatigue Life Prediction & Damage Modeling",
      "Furnace CFD & NOx Reduction Simulations"
    ],
    keyStandards: ["ASME Section I", "ASME B31.1", "BS EN 12952", "API 530"],
    sampleProject: "Creep-fatigue interaction study and remaining life assessment for 660 MW supercritical power plant high-pressure steam headers.",
    metrics: "45+ GW Thermal Assets Evaluated",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "oil-and-gas",
    title: "Oil & Gas",
    category: "Upstream & Midstream",
    shortDesc: "Offshore topsides, subsea pipelines, risers, slug flow CFD, surge dynamics, and FPSO structural analysis.",
    fullDesc: "End-to-end engineering for offshore and onshore oil & gas infrastructure. From wave fatigue of jacket platforms to subsea manifold CFD, multiphase slugging analysis, high-pressure pipeline stress, and API 579 Fitness-For-Service assessments.",
    capabilities: [
      "Offshore Topsides & Module Structural FEA",
      "Subsea Pipeline Free-Span & On-Bottom Stability",
      "Multiphase Slugging & Liquid Carryover CFD",
      "Compressor Piping Pulsation & Acoustic Resonance",
      "FPSO Turret & Moonpool Wave Interaction"
    ],
    keyStandards: ["API 6A / 17D", "DNV-ST-F101", "ASME B31.3 / B31.4 / B31.8", "API 579"],
    sampleProject: "Subsea rigid jumper thermal expansion, vortex-induced vibration (VIV), and fatigue analysis in 1,200m deepwater.",
    metrics: "500+ Offshore & Pipeline Validations",
    iconName: "Droplets",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "petrochemical-engineering",
    title: "Petrochemical Engineering",
    category: "Refining & Chemical Processing",
    shortDesc: "Reactors, distillation columns, heat exchangers, high-temperature piping stress, and API 579 FFS assessments.",
    fullDesc: "Specialized design-by-analysis and fitness-for-service evaluation for refinery units, hydrocrackers, FCCUs, and petrochemical complexes. We perform advanced thermo-mechanical stress, nozzle flexibility, and localized corrosion flaw assessment.",
    capabilities: [
      "Hydrocracker & FCCU Reactor Design-by-Analysis",
      "TEMA Shell & Tube Heat Exchanger Stress Verification",
      "Distillation Columns Wind & Seismic Vortex Shedding",
      "High-Pressure Piping Stress & Flange Leakage",
      "API 579 Level 3 Fitness-For-Service & Crack Growth"
    ],
    keyStandards: ["ASME Section VIII Div 1 & 2", "API 579 / ASME FFS-1", "TEMA", "API 650 / 620"],
    sampleProject: "Level 3 Fitness-For-Service analysis of refinery hydrocracker reactor nozzle subject to hydrogen embrittlement and thermal cycles.",
    metrics: "250+ Pressure Vessels Certified",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "industrial-heavy-engineering",
    title: "Industrial & Heavy Engineering",
    category: "Equipment & Machinery",
    shortDesc: "Heavy mining machinery, rolling mills, defense structures, blast dynamics, and structural fatigue evaluation.",
    fullDesc: "Designing robust mechanical systems and heavy fabricated structures operating under severe shock, vibration, dynamic impact, and cyclic fatigue. We optimize equipment weight, structural rigidity, and gear transmission lifespans.",
    capabilities: [
      "Heavy Mining Excavators & Dragline Boom Fatigue FEA",
      "Steel Plant Rolling Mill Stand Dynamics & Shock Loads",
      "Blast & Ballistic Impact Structural Simulations",
      "Large Storage Silos, Bunkers & Gantry Cranes",
      "Vibration Isolation & Rotating Machinery Modal Analysis"
    ],
    keyStandards: ["ISO 10816", "AISC 360", "DIN 15018", "AGMA Standards"],
    sampleProject: "Structural redesign and dynamic stress optimization of 120-ton ladle handling crane with 40% increased fatigue life.",
    metrics: "900+ Heavy Machinery Systems Engineered",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "power-and-utilities",
    title: "Power & Utilities",
    category: "Transmission & Distribution",
    shortDesc: "High-voltage transmission towers, GIS substations, hydro-turbines, water surge analysis, and renewable infrastructure.",
    fullDesc: "Reliable engineering for utility transmission networks, electrical substations, hydro-electric installations, and renewable generation plants. We handle wind dynamic loads, earthquake seismic qualification, and fluid surge in long utility pipelines.",
    capabilities: [
      "EHV Transmission Tower Structural Wind & Ice Load FEA",
      "Gas Insulated Substation (GIS) Seismic Testing Modeling",
      "Hydro-Turbine Runner CFD & Cavitation Prediction",
      "Water Supply & Penstock Transient Water Hammer Analysis",
      "Wind Turbine Foundation & Tower Fatigue Assessment"
    ],
    keyStandards: ["IEEE 693", "ASCE 10", "IS 802", "IEC 61400"],
    sampleProject: "Seismic qualification (IEEE 693 High Performance Level) for 765 kV Gas Insulated Substation (GIS) modules.",
    metrics: "1200+ Utility Infrastructure Assessments",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
  }
];

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: "npcil",
    name: "Nuclear Power Corporation of India",
    shortName: "NPCIL",
    sector: "Nuclear Energy",
    description: "Primary nuclear power authority; partner for reactor core simulation, seismic evaluation & safety analysis."
  },
  {
    id: "iocl",
    name: "IndianOil",
    shortName: "IOCL",
    sector: "Refining & Oil",
    description: "National downstream oil major; refinery piping stress, hydrocracker fitness-for-service, and column dynamics."
  },
  {
    id: "ongc",
    name: "Oil and Natural Gas Corporation",
    shortName: "ONGC",
    sector: "Upstream Exploration",
    description: "Offshore exploration giant; topside structural integrity, subsea pipeline analysis, and riser dynamics."
  },
  {
    id: "thermax",
    name: "Thermax",
    shortName: "Thermax",
    sector: "Energy & Environment",
    description: "Global boiler and energy systems OEM; boiler heat exchangers, CFD combustion, and emissions abatement."
  },
  {
    id: "ngsl",
    name: "NTPC-GE Power Services Ltd",
    shortName: "NGSL",
    sector: "Power Services & EPC",
    description: "Joint venture leader for power plant renovation, turbine retrofits, and plant performance optimization."
  },
  {
    id: "ntpc",
    name: "NTPC Limited",
    shortName: "NTPC",
    sector: "Power Generation",
    description: "Largest power generation conglomerate; supercritical boiler remaining life assessment and piping studies."
  },
  {
    id: "reliance",
    name: "Reliance Industries",
    shortName: "Reliance",
    sector: "Petrochemicals & Energy",
    description: "Mega-scale refining and petrochemical complexes; equipment design-by-analysis and surge simulations."
  },
  {
    id: "veolia",
    name: "Veolia",
    shortName: "Veolia",
    sector: "Water & Waste Utilities",
    description: "Global ecological utility company; water treatment hydraulic simulations, piping networks, and structural assets."
  },
  {
    id: "lg-electronics",
    name: "LG Electronics",
    shortName: "LG Electronics",
    sector: "Industrial & Manufacturing",
    description: "Advanced thermal management, structural reliability, and shock/vibration packaging optimization."
  },
  {
    id: "isgec",
    name: "ISGEC Heavy Engineering",
    shortName: "ISGEC",
    sector: "Heavy Engineering & Boilers",
    description: "Heavy manufacturing and process equipment OEM; heavy press structures, high-capacity boilers & pressure vessels."
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fea",
    title: "Finite Element Analysis (FEA)",
    tagline: "High-Fidelity Physics & Structural Simulation",
    desc: "Comprehensive linear, non-linear, dynamic, seismic, modal, fatigue, and fracture mechanics simulations under extreme operational and environmental loading.",
    deliverables: [
      "Non-linear plastic collapse & buckling evaluation",
      "Seismic response spectrum & time-history analysis",
      "High-cycle and low-cycle fatigue life prediction",
      "Creep-fatigue interaction under thermal transients"
    ],
    tools: ["ANSYS Mechanical", "Abaqus", "LS-DYNA", "Nastran"],
    iconName: "Layers"
  },
  {
    id: "cfd",
    title: "Computational Fluid Dynamics (CFD)",
    tagline: "Aerodynamics, Hydrodynamics & Thermal Fluid Flow",
    desc: "Detailed multiphase, aerodynamic, conjugate heat transfer, combustion, and dispersion simulations optimizing flow efficiency and thermal performance.",
    deliverables: [
      "Transient thermal-hydraulic mixing & stratification",
      "Multiphase slug flow & erosion-corrosion rate mapping",
      "Combustion efficiency & flue gas emissions dispersion",
      "Pressure drop minimization & flow uniformity in ducts"
    ],
    tools: ["ANSYS Fluent", "CFX", "OpenFOAM", "Star-CCM+"],
    iconName: "Wind"
  },
  {
    id: "piping-stress",
    title: "Piping Stress & Surge Analysis",
    tagline: "Code-Compliant Flexibility & Fluid Dynamics",
    desc: "Rigorous piping flexibility, dynamic water hammer, slug flow loading, support optimization, and nozzle load verification per ASME B31 standards.",
    deliverables: [
      "Thermal expansion, seismic, and wind flexibility checks",
      "Transient water hammer and fluid surge mitigation",
      "Spring hanger, snubber, and pipe restraint design",
      "Flange leakage assessment per ASME Section VIII"
    ],
    tools: ["CAESAR II", "ROHR2", "AFT Fathom / Impulse", "Pipenet"],
    iconName: "Activity"
  },
  {
    id: "plant-engineering",
    title: "Plant Engineering & 3D Modeling",
    tagline: "Multi-Disciplinary Detailed Engineering",
    desc: "Complete multi-discipline plant design, 3D laser scan as-built extraction, equipment layouts, clash detection, and comprehensive fabrication drawing delivery.",
    deliverables: [
      "Intelligent 3D Plant Layout & Piping Routing",
      "Civil & Structural Steel Design & Foundation Sizing",
      "Electrical Cable Tray & HVAC Duct Routing",
      "As-Built 3D Laser Scanning to CAD Conversion"
    ],
    tools: ["SmartPlant 3D (SP3D)", "AVEVA E3D / PDMS", "AutoCAD Plant 3D", "Tekla"],
    iconName: "Box"
  },
  {
    id: "ffs-failure-analysis",
    title: "Failure Analysis & Fitness-For-Service",
    tagline: "API 579 / BS 7910 Level 1, 2 & 3 Assessments",
    desc: "Root-cause metallurgical/mechanical failure analysis and quantitative fitness-for-service evaluations for damaged, corroded, or aged operational assets.",
    deliverables: [
      "API 579 Level 3 flaw & localized metal loss evaluation",
      "Crack growth rate & critical flaw size calculation",
      "Remaining operational life assessment (RLA)",
      "Derating & safe re-qualification recommendations"
    ],
    tools: ["Signal FFS", "ANSYS", "CrackWise", "FE-Safe"],
    iconName: "ShieldAlert"
  },
  {
    id: "digital-twin-optimization",
    title: "Digital Twin & Design Optimization",
    tagline: "Asset Health Monitoring & Predictive Physics",
    desc: "Real-time physics-informed digital twins, parametric topology optimization, weight reduction, and predictive maintenance frameworks for operating plants.",
    deliverables: [
      "Reduced-order physics models for real-time asset telemetry",
      "Generative design and weight-stiffness optimization",
      "Virtual sensor synthesis for uninstrumented plant locations",
      "Remaining useful life (RUL) forecasting engines"
    ],
    tools: ["ANSYS Twin Builder", "OptiStruct", "Python Physics Ensembles"],
    iconName: "Sparkles"
  }
];

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: "proj-1",
    title: "Seismic & Thermal Fatigue Qualification of 700 MWe Nuclear Primary Heat Transport Loop",
    industry: "Nuclear Power",
    clientType: "Nuclear Energy Corporation",
    challenge: "Ensure structural integrity under combined Safe Shutdown Earthquake (SSE), thermal stratification, and cyclic thermal transients in accordance with RCC-M Level D requirements.",
    solution: "Developed non-linear FEA response-spectrum and transient thermal models incorporating multi-axial creep-fatigue and fluid-structure interaction (FSI).",
    result: "Achieved regulatory AERB approval with zero design redesign cycle, proving 60-year operational life integrity.",
    tags: ["RCC-M", "Seismic FRS", "Nuclear Class 1", "Thermal Transient"],
    metrics: { label: "Design Life Assured", val: "60 Years" }
  },
  {
    id: "proj-2",
    title: "Supercritical 660 MW Boiler Header Creep-Fatigue Remaining Life Assessment",
    industry: "Thermal Energy",
    clientType: "National Power Utility",
    challenge: "High cyclic thermal stresses and base-to-peak load swinging caused premature crack indications on main steam header stub welds.",
    solution: "Performed 3D non-linear viscoplastic creep-damage modeling combined with metallurgical replicate data to map damage accumulation.",
    result: "Extended remaining operating life by 85,000 hours with targeted weld repair protocols rather than full replacement, saving $14M.",
    tags: ["ASME Section I", "Creep-Fatigue", "Life Extension", "Supercritical"],
    metrics: { label: "Client CapEx Saved", val: "$14 Million" }
  },
  {
    id: "proj-3",
    title: "Deepwater Subsea Riser Slugging CFD & Vortex Induced Vibration (VIV) Mitigation",
    industry: "Oil & Gas",
    clientType: "Global Offshore Operator",
    challenge: "Severe multiphase hydrodynamic slugging and ocean current vortex shedding threatened fatigue failure of rigid steel catenary risers.",
    solution: "Coupled transient multiphase VOF CFD simulations with dynamic beam FEA to evaluate structural excitation and helical strake suppression efficiency.",
    result: "Mitigated 88% of cyclic vibration fatigue stresses and optimized strakes configuration across 1,400 meters water depth.",
    tags: ["Multiphase CFD", "Subsea VIV", "DNV-ST-F101", "Offshore"],
    metrics: { label: "Fatigue Stress Reduced", val: "88%" }
  },
  {
    id: "proj-4",
    title: "API 579 Level 3 Fitness-For-Service of Hydrocracker High-Pressure Shell with Localized Corrosion",
    industry: "Petrochemical Engineering",
    clientType: "Refinery Operator",
    challenge: "Plant turnaround ultrasonic inspection detected localized metal thinning below minimum required thickness on high-temperature hydrogen service vessel.",
    solution: "Constructed elastic-plastic finite element model under combined operating pressure, thermal gradient, and hydrogen partial pressure.",
    result: "Demonstrated adequate margin against plastic collapse and local failure, eliminating urgent emergency vessel replacement during shutdown.",
    tags: ["API 579 Level 3", "ASME Sec VIII Div 2", "Plastic Collapse", "Refining"],
    metrics: { label: "Unplanned Outage Avoided", val: "45 Days" }
  }
];

export const CAREERS_DATA: JobOpening[] = [
  {
    id: "job-fea-lead",
    title: "Lead Engineer — Nuclear & Structural FEA",
    department: "Advanced Simulation",
    location: "Bangalore, India (Hybrid)",
    experience: "7 - 12 Years",
    type: "Full-Time",
    description: "Lead structural, seismic, and fatigue engineering for nuclear and thermal energy projects following ASME Section III / RCC-M.",
    requirements: [
      "Master's / Ph.D. in Mechanical / Structural Engineering",
      "Expert proficiency with ANSYS Mechanical, Abaqus, or LS-DYNA",
      "Experience with nuclear regulatory codes (ASME Sec III / VIII, RCC-M, AERB)",
      "Strong background in non-linear FEA, plasticity, and fracture mechanics"
    ]
  },
  {
    id: "job-cfd-specialist",
    title: "Senior CFD Specialist — Thermal Hydraulics & Multiphase",
    department: "Fluid Dynamics",
    location: "Bangalore, India",
    experience: "5 - 9 Years",
    type: "Full-Time",
    description: "Conduct high-fidelity multiphase, combustion, and conjugate heat transfer simulations for process, energy, and aerospace applications.",
    requirements: [
      "M.Tech / M.S. in Thermal Engineering / Fluid Mechanics",
      "Demonstrated mastery of ANSYS Fluent / CFX / Star-CCM+",
      "Experience with multiphase flow (VOF, Eulerian), turbulence, and transient CFD",
      "Strong Python scripting and automation skills"
    ]
  },
  {
    id: "job-piping-stress",
    title: "Principal Piping Stress & Surge Engineer",
    department: "Piping & Plant Engineering",
    location: "Bangalore / Pune, India",
    experience: "6 - 10 Years",
    type: "Full-Time",
    description: "Lead flexibility, transient fluid surge, seismic, and dynamic support design for critical refinery and power plant piping systems.",
    requirements: [
      "B.Tech / M.Tech in Mechanical Engineering",
      "Extensive experience with CAESAR II, ROHR2, and AFT Impulse",
      "Mastery of ASME B31.1, B31.3, B31.4, B31.8 codes and standard nozzle load checks",
      "Proven ability to manage EPC client design interfaces"
    ]
  }
];
