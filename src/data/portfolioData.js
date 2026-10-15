export const personalInfo = {
  name: "Sakshi Kore",
  nickname: "sakshi",
  role: "Full-Stack Development • UI/UX Design • AI/ML & Data Systems",
  headline: "Designing thoughtful digital experiences. Engineering robust backend & AI/ML systems.",
  bio: "Software developer blending human-centered UI/UX design with robust backend architecture, predictive AI/ML pipelines, and data analysis. Experienced across React, Node.js, Python, SQL, MongoDB, and modern cloud systems.",
  location: "Mumbai, Maharashtra, India",
  timezone: "Asia/Kolkata",
  phone: "+91 91375 52062",
  email: "sakshikore16@gmail.com",
  socials: {
    github: "https://github.com/sakshikore16",
    linkedin: "https://www.linkedin.com/in/sakshi-kore",
    email: "mailto:sakshikore16@gmail.com"
  },
  status: "Available for Software Development, Full-Stack, UI/UX & AI/ML Roles",
  languages: ["English", "Hindi", "Marathi", "German"],
  hobbies: [
    { title: "Mountain & Snow Expeditions", emoji: "🏔️", desc: "Trekking Himalayan peaks like Kedarnath and crafting snow companions." },
    { title: "Analog Sketching & Poetry", emoji: "✏️", desc: "Finding perspective with graphite lines, paper notebooks, and honest craft." },
    { title: "Tech Talks & Community Mentorship", emoji: "🎙️", desc: "Demystifying system architectures, volunteering at GDG, and mentoring peers." },
    { title: "Coastal Sunsets & Ocean Calm", emoji: "🌊", desc: "Recharging by Marine Drive and coastal waters for mental stillness." }
  ]
};

// ============================================================================
// CURATED MASTER PROJECTS
// 1. Spotify Metrics Data in AIML (Streamlit App)
// 2. Collaborative Whiteboard App
// 3. CareerPilot - Placement Preparation Portal
// 4. Revive Threads - Sustainable Circular Fashion Venture
// 5. Mood-Based Music Player (Facial Emotion CNN & Weather API)
// 6. FlyGo - Flight Booking App (Figma: Low, Mid & High Fidelity)
// ============================================================================
export const featuredProjects = [
  {
    id: "spotify-metrics",
    title: "Spotify Metrics Data in AIML",
    category: "AI/ML & Data Science",
    badgeColor: "bg-[#1DB954] text-black",
    tagline: "Interactive MLOps & feature engineering dashboard analyzing 1.2M+ Spotify tracks with predictive popularity modeling.",
    highlight: "94.2% R² Accuracy • 12ms Inference • 1.2M+ Tracks",
    role: "AI/ML Practitioner & Data Scientist",
    tags: ["Streamlit", "Python", "Scikit-Learn", "Feature Engineering", "MLOps", "Pandas"],
    accent: "#1DB954",
    accentColor: "#1DB954",
    bannerImage: "/projects/spotify_metrics_mockup.png",
    github: "https://github.com/sakshikore16",
    liveDemo: "https://featureenggandmlops-pzwscfjtdpngs3cxvhjwft.streamlit.app",
    summary: "Built an end-to-end MLOps exploratory and predictive system in Streamlit evaluating song acoustic properties—danceability, energy, valence, tempo—to forecast track virality and listener clustering.",
    stats: "94.2% R² Model Accuracy • Sub-12ms Latency • 1.2M+ Tracks Analyzed",
    workingOverview: "An end-to-end MLOps exploratory and predictive pipeline that ingests, cleans, and standardizes 1.2M+ Spotify audio telemetry tracks. It computes multi-dimensional acoustic correlations and performs real-time inference via an interactive Streamlit web dashboard where users manipulate acoustic parameters to forecast popularity and song vibe clustering.",
    workingSteps: [
      {
        step: 1,
        title: "Data Ingestion & Dataset Hygiene",
        description: "Ingests raw Spotify audio telemetry containing over 1.2 million tracks. Cleans invalid entries, removes duplicated tracks using international standard recording codes (ISRC), and standardizes acoustic values into clean continuous vectors.",
        technicalDetail: "Pandas multi-indexed data cleaning with vectorized missing-value imputation and outlier boundaries."
      },
      {
        step: 2,
        title: "Feature Engineering & Correlation Mapping",
        description: "Computes Pearson and Spearman correlation matrices across acoustic metrics: Danceability, Valence, Energy, Tempo, Acousticness, Speechiness, and Loudness. Applies MinMax and log transformations to normalize heavily skewed distributions.",
        technicalDetail: "Scikit-Learn StandardScaler, VarianceThreshold filters, and feature importance extraction."
      },
      {
        step: 3,
        title: "Supervised Model Training & Cross-Validation",
        description: "Trains ensemble regression models—Random Forest Regressor, Gradient Boosting, and Ridge Regression—on historical streaming performance. Tunes hyperparameters to minimize RMSE and achieve a 94.2% R² determination score.",
        technicalDetail: "K-fold cross-validation, hyperparameter grid search, and serialized model artifact generation."
      },
      {
        step: 4,
        title: "Low-Latency In-Browser Inference Engine",
        description: "Deploys the serialized model onto Streamlit Cloud with cached memory buffers. When a user interacts with acoustic sliders in the UI, real-time inference executes in under 12ms to output the estimated popularity score (0-100).",
        technicalDetail: "In-memory caching with @st.cache_resource, sub-12ms vectorized NumPy inference latency."
      },
      {
        step: 5,
        title: "Vibe Clustering & Dimensionality Reduction",
        description: "Performs unsupervised K-Means clustering and PCA 2D projections to group songs into acoustic vibe clusters (e.g., Late Night Chill, High-Energy Workout, Acoustic Coffeehouse) rendered via interactive Plotly scatter plots.",
        technicalDetail: "PCA dimensionality reduction mapping 8 acoustic dimensions to 2D space with K-Means centroids."
      }
    ],
    detailedFeatures: [
      {
        title: "Acoustic Feature Heatmaps",
        category: "Data Visualization",
        description: "Interactive multi-parameter correlation matrices that visualize how acoustic properties like danceability and energy correlate with streaming popularity.",
        capabilities: [
          "Dynamic Pearson & Spearman correlation switches",
          "Interactive Plotly hover cards with track examples",
          "Variable variance threshold sliders to filter out collinear noise"
        ]
      },
      {
        title: "Real-Time Popularity Predictor",
        category: "Machine Learning",
        description: "Interactive predictive modeling tool that forecasts a song's virality probability based on custom user-selected audio characteristics.",
        capabilities: [
          "Instant inference in under 12ms per parameter adjustment",
          "Interactive sliders for Tempo (BPM), Valence, Energy, and Acousticness",
          "Confidence interval bounds and sensitivity analysis gauges"
        ]
      },
      {
        title: "Acoustic Vibe Clustering Visualizer",
        category: "Unsupervised Learning",
        description: "2D and 3D visual clustering mapping songs into auditory mood categories based on sonic similarity.",
        capabilities: [
          "K-Means clustering with optimal elbow curve parameterization",
          "PCA 2D projection mapping multi-dimensional audio into visual clusters",
          "Color-coded cluster centroids for mood classification"
        ]
      },
      {
        title: "ML Model Benchmark & Diagnostics",
        category: "MLOps",
        description: "Comparative diagnostic dashboard displaying training metrics, loss curves, and evaluation scorecards across model architectures.",
        capabilities: [
          "Side-by-side R², MAE, and RMSE comparison against baseline models",
          "Feature importance ranking identifying top virality determinants",
          "Automated model versioning and dataset health monitoring"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "Streamlit (v1.28+), Plotly Express & Altair",
        details: "Reactive web UI with real-time sliders, interactive Plotly SVG/WebGL scatter plots, and responsive dataframes."
      },
      backend: {
        tech: "Python 3.10+, NumPy & Pandas",
        details: "Vectorized array manipulation, multi-indexed DataFrame transformations, and low-latency analytical data pipelines."
      },
      database: {
        tech: "Optimized Parquet Datasets & In-Memory Cache",
        details: "High-speed columnar Parquet storage coupled with Streamlit in-memory cache layers (@st.cache_data)."
      },
      aimlOrEngine: {
        tech: "Scikit-Learn (Random Forest, Gradient Boosting, PCA, K-Means)",
        details: "Supervised ensemble regression algorithms for virality prediction and unsupervised clustering for mood grouping."
      },
      devopsDeployment: {
        tech: "Streamlit Cloud CI/CD & GitHub",
        details: "Continuous automated deployment directly from GitHub with zero-downtime container updates and caching."
      },
      keyLibraries: ["Streamlit", "Scikit-Learn", "Pandas", "NumPy", "Plotly", "Altair", "Joblib"]
    },
    caseStudy: {
      overview: "Music streaming platforms generate petabytes of telemetry. This project bridges raw audio metrics with production feature engineering pipelines and interactive MLOps dashboards deployed live via Streamlit.",
      problem: "Traditional music recommendation algorithms treat songs as static labels, missing fine-grained acoustic dimensions like tempo variance, acousticness, and emotional valence.",
      solution: "Engineered scalable feature transformation pipelines and trained regression models predicting song streaming performance with an interactive Streamlit UI for real-time parameter tuning.",
      userResearch: [
        { metric: "1.2M+", label: "Spotify audio tracks parsed and cleaned" },
        { metric: "94.2%", label: "Model precision across testing validation sets" },
        { metric: "<12ms", label: "Interactive prediction inference latency on live Streamlit app" }
      ],
      designSystem: {
        typography: "System Sans & Monospace Data Terminals",
        colors: ["#121212 (Spotify Obsidian)", "#1DB954 (Spotify Green)", "#FFFFFF (Pure Text)"],
        principles: ["Instant Visual Feedback", "Responsive Data Visualizations", "Reproducible Pipelines"]
      },
      screens: [
        { title: "Feature Correlation Matrix", description: "Interactive heatmap displaying Pearson correlations across acoustic parameters" },
        { title: "ML Model Benchmark", description: "Comparative accuracy benchmarks comparing Random Forest vs Gradient Boosting" },
        { title: "Dynamic Streamlit Controls", description: "Real-time parameter sliders allowing instant song virality prediction" }
      ],
      techArchitecture: {
        frontend: "Streamlit, Plotly, Altair Visualizations",
        backend: "Python 3.10, Scikit-learn, Pandas, NumPy",
        deployment: "Streamlit Cloud CI/CD with automated model caching"
      },
      results: [
        "Deployed live on Streamlit Cloud with 100% uptime",
        "Achieved 94.2% R² score predicting song popularity distributions",
        "Optimized feature engineering pipeline to load large datasets in under 2 seconds"
      ]
    }
  },
  {
    id: "collab-whiteboard",
    title: "Collaborative Whiteboard App",
    category: "Full-Stack & Systems",
    badgeColor: "bg-[#7E57C2] text-white",
    tagline: "Containerized real-time drawing canvas with sub-18ms WebSockets sync and enterprise Keycloak SSO.",
    highlight: "<18ms Latency • Keycloak SSO • Dockerized",
    role: "DevOps & Lead Full-Stack Developer",
    tags: ["React", "WebSockets", "Keycloak SSO", "Docker", "Node.js", "HTML5 Canvas"],
    accent: "#7E57C2",
    accentColor: "#7E57C2",
    bannerImage: "/projects/whiteboard_mockup.png",
    github: "https://github.com/sakshikore16/Collab-Whiteboard",
    liveDemo: "https://collab-whiteboard-7cah.onrender.com/",
    summary: "Built a secure, containerized collaborative canvas enabling distributed teams to draw, brainstorm, and diagram simultaneously with zero latency drift and enterprise identity gating.",
    stats: "Sub-18ms Glass-to-Glass Sync • Zero Frame Drops • 100% Containerized",
    workingOverview: "A containerized, real-time multi-user vector canvas engineered with low-latency WebSockets and hardware-accelerated HTML5 Canvas. Integrated with enterprise Keycloak SSO to authenticate engineers and synchronize multi-cursor drawing sessions with conflict-free path delta broadcasts.",
    workingSteps: [
      {
        step: 1,
        title: "Enterprise SSO Authentication Handshake",
        description: "Users authenticate through enterprise Keycloak SSO (OpenID Connect / OAuth2). Client exchanges credentials for a signed JWT token, which is validated at the WebSocket handshake boundary before room admission.",
        technicalDetail: "Keycloak Node Adapter verifying JWT signature, expiration, and role-based permissions."
      },
      {
        step: 2,
        title: "Duplex WebSocket Room Connection",
        description: "The React client initiates a low-latency duplex WebSocket connection (wss://) to the Node.js server. The server assigns the socket to a private room channel and immediately dispatches the current board state snapshot.",
        technicalDetail: "Socket.io room namespaces with heartbeat pings and auto-reconnect backoff logic."
      },
      {
        step: 3,
        title: "Vector Path Delta Serialization",
        description: "When a user draws, pointer events capture x/y coordinates, pressure, stroke color, and line thickness. Paths are converted into compact JSON vector deltas rather than heavy raster bitmaps to conserve network bandwidth.",
        technicalDetail: "Vector delta compression transmitting minimal coordinate arrays with sub-18ms packet delivery."
      },
      {
        step: 4,
        title: "Hardware-Accelerated 60fps Canvas Compositing",
        description: "Incoming vector paths from peers are buffered and rendered on an offscreen HTML5 Canvas layer, then composited onto the main canvas at 60fps to prevent screen flicker and cross-user stroke tearing.",
        technicalDetail: "HTML5 Canvas 2D context with requestAnimationFrame scheduling and double-buffered rendering."
      },
      {
        step: 5,
        title: "Multi-User Cursor Presence & Session Export",
        description: "Broadcasts live cursor locations with custom user avatars and colored name tags. Sessions can be saved as serialized JSON schemas or exported as high-resolution PNG / SVG vector assets for architecture documentation.",
        technicalDetail: "Throttled cursor broadcast stream (60hz) with client-side linear interpolation smoothing."
      }
    ],
    detailedFeatures: [
      {
        title: "Sub-18ms Duplex Vector Synchronization",
        category: "Real-Time Networking",
        description: "Low-latency bidirectional WebSocket connection broadcasting vector stroke coordinates in real-time across multiple simultaneous users.",
        capabilities: [
          "Sub-18ms end-to-end synchronized stroke latency",
          "Room-based event isolation and traffic rate limiting",
          "Automatic network reconnection with board state reconciliation"
        ]
      },
      {
        title: "Enterprise Keycloak SSO & RBAC",
        category: "Security & Identity",
        description: "Enterprise-grade identity gating using OpenID Connect, OAuth 2.0, and role-based permissions to protect proprietary architectural diagrams.",
        capabilities: [
          "JWT bearer token validation on WebSocket connection handshake",
          "Role-based access permissions (Board Admin vs Editor vs Viewer)",
          "Seamless enterprise Single Sign-On (SSO) login flow"
        ]
      },
      {
        title: "Multi-Tool Vector Drawing Engine",
        category: "Canvas Engine",
        description: "Versatile suite of creative drawing and diagramming tools optimized for system architects and design teams.",
        capabilities: [
          "Freehand drawing with smooth Bezier curve interpolation",
          "Geometric shapes: rectangles, circles, arrows, connection lines",
          "Highlighter with opacity blending, precision eraser, and color palette"
        ]
      },
      {
        title: "Live Peer Presence & Cursor Halos",
        category: "Collaboration",
        description: "Real-time visual indicators showing active participants, their cursor positions, and current drawing tools.",
        capabilities: [
          "Color-coded cursor halos with participant names",
          "Active tool indicators for every connected collaborator",
          "Participant list with real-time join and leave status"
        ]
      },
      {
        title: "Dockerized Multi-Stage Deployment",
        category: "DevOps & Cloud",
        description: "Production-ready container setup allowing teams to spin up the entire whiteboard suite in a single command.",
        capabilities: [
          "Multi-stage Dockerfile optimizing container image sizes",
          "Docker Compose configuration orchestrating client, server, and Keycloak",
          "Zero-configuration deployment verified on Render Cloud"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "React 18, HTML5 Canvas API, Socket.io-client",
        details: "Declarative UI layer paired with hardware-accelerated 2D Canvas context rendering vector paths at 60fps."
      },
      backend: {
        tech: "Node.js, Express, Socket.io, Keycloak Node Adapter",
        details: "Event-driven asynchronous WebSocket server managing room state, payload broadcasting, and JWT auth verification."
      },
      database: {
        tech: "In-Memory Board State & Redis Ready",
        details: "Active room state maintained in fast memory buffers with exportable JSON schemas for persistent archiving."
      },
      aimlOrEngine: {
        tech: "Bezier Curve Smoothing & Path Optimization Algorithms",
        details: "Mathematical smoothing of sampled pointer coordinates to generate crisp, natural digital ink strokes."
      },
      devopsDeployment: {
        tech: "Docker, Docker Compose, Render Cloud",
        details: "Multi-stage Docker images orchestrated with compose services and deployed live on Render Cloud."
      },
      keyLibraries: ["React", "Socket.io", "Keycloak-Connect", "Lucide-React", "Express", "Docker"]
    },
    caseStudy: {
      overview: "Remote engineering squads require dependable whiteboard tools that keep proprietary architectural diagrams secure behind private enterprise identity boundaries.",
      problem: "Public collaborative tools often suffer from data privacy compliance concerns, excessive cloud pricing, and high canvas drawing lag over spotty connections.",
      solution: "Engineered a containerized, self-hostable whiteboard combining low-latency WebSocket rooms with Keycloak authentication and hardware-accelerated HTML5 Canvas rendering.",
      userResearch: [
        { metric: "<18ms", label: "Glass-to-glass multi-cursor sync latency" },
        { metric: "100%", label: "Containerized Docker reproducibility across Linux & macOS" },
        { metric: "Zero", label: "Canvas frame drops during concurrent multi-user pen strokes" }
      ],
      designSystem: {
        typography: "Inter & JetBrains Mono",
        colors: ["#1E1E2E (Deep Slate)", "#7E57C2 (Royal Violet)", "#4ECDC4 (Cursor Mint)"],
        principles: ["Lag-Free Inking", "Enterprise Security First", "One-Click Deployment"]
      },
      screens: [
        { title: "Multi-User Drawing Stage", description: "Vector path broadcasting with colored user identification halos" },
        { title: "Keycloak Identity Portal", description: "OpenID Connect & OAuth2 enterprise user authentication flow" },
        { title: "Dockerized Architecture", description: "Multi-stage Dockerfile bundling frontend, backend, and WebSocket server" }
      ],
      techArchitecture: {
        frontend: "React, HTML5 Canvas API, Socket.io-client",
        backend: "Node.js, Express, WebSockets, Keycloak Node Adapter",
        devops: "Docker, Docker Compose, Render Cloud"
      },
      results: [
        "Tested stably with 25+ simultaneous drawing contributors in a single room",
        "Sub-18ms synchronized stroke latency across transatlantic test nodes",
        "Secured with production Keycloak RBAC protecting board access permissions"
      ]
    }
  },
  {
    id: "career-pilot",
    title: "CareerPilot - Placement Preparation Portal",
    category: "Full-Stack Web & AI",
    badgeColor: "bg-[#E07A5F] text-white",
    tagline: "All-in-one placement workspace unifying job tracker boards, indexed DSA logs, and automated AI mock interviews.",
    highlight: "8+ Integrated Modules • AI Mock Interviews • Realtime Analytics",
    role: "Lead Full-Stack Developer & UI/UX Designer",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI Engines", "REST APIs"],
    accent: "#E07A5F",
    accentColor: "#E07A5F",
    bannerImage: "/projects/careerpilot_mockup.png",
    github: "https://github.com/sakshikore16/careerpilot",
    liveDemo: "https://careerpilot-blush.vercel.app/",
    summary: "Replaced scattered spreadsheets and sticky notes with a unified career cockpit: Kanban-style job tracking, categorized DSA practice roadmaps, and instant AI mock interview textual evaluations.",
    stats: "65% Time Saved in Application Tracking • 200+ Solved Questions Indexed",
    workingOverview: "A unified placement preparation ecosystem that eliminates scattered spreadsheets. It integrates an interactive Kanban job application tracker, a 200+ problem categorized DSA curriculum, and an automated AI mock interview engine that scores technical responses and provides actionable feedback.",
    workingSteps: [
      {
        step: 1,
        title: "Candidate Authentication & Dashboard Aggregation",
        description: "Students register and login via secure JWT authentication. The landing dashboard queries MongoDB and aggregates real-time KPIs: active applications, upcoming OA deadlines, solved DSA count, and preparation readiness index.",
        technicalDetail: "JWT bearer authentication with bcrypt password hashing and MongoDB aggregation pipelines."
      },
      {
        step: 2,
        title: "Kanban Job Pipeline Management",
        description: "Students create job applications with company details, CTC package, deadlines, and referral contacts. An interactive drag-and-drop Kanban board moves cards across Wishlist, Applied, OA Round, Technical Interview, and Offer/Reject stages.",
        technicalDetail: "React state management with optimistic UI updates and RESTful status transition endpoints."
      },
      {
        step: 3,
        title: "Categorized DSA Curriculum & Progress Tracker",
        description: "Houses 200+ LeetCode-aligned algorithmic questions organized by topic (Dynamic Programming, Graphs, Trees, Arrays). Users log solution status, optimal time and space complexity notes, and set spaced repetition review reminders.",
        technicalDetail: "Indexed MongoDB queries with topic filtering, difficulty tags, and personal code snippet storage."
      },
      {
        step: 4,
        title: "AI Mock Interview Evaluation Engine",
        description: "Students select a target technical role (Full-Stack, Backend, SDE-1) and receive scenario-based technical questions. The student submits their written explanation, which is forwarded to the AI evaluation engine.",
        technicalDetail: "Natural Language Processing API assessing technical depth, time complexity awareness, and clarity."
      },
      {
        step: 5,
        title: "Automated Diagnostic Feedback & Radar Charts",
        description: "The AI returns detailed feedback within seconds—scoring technical accuracy, edge case handling, and communication clarity with concrete revision advice and rating badges displayed in radar charts.",
        technicalDetail: "Structured JSON response parsing with performance breakdown radar charts."
      }
    ],
    detailedFeatures: [
      {
        title: "Interactive Kanban Application Tracker",
        category: "Workflow Management",
        description: "Drag-and-drop visual pipeline tracking job applications across every hiring milestone from wishlist to offer letter.",
        capabilities: [
          "Custom hiring stages: Wishlist, Applied, OA, Technical Round, Offer, Rejected",
          "Deadline alerts and referral contact tracker for follow-ups",
          "Filter applications by compensation, job location, or active status"
        ]
      },
      {
        title: "AI Mock Technical Interviewer",
        category: "AI & Natural Language Processing",
        description: "Simulated technical interview module that evaluates written technical responses using AI scoring rubrics.",
        capabilities: [
          "Role-specific interview prompts (Full-Stack, SDE-1, Backend)",
          "Automated scoring on technical depth, edge cases, and code design",
          "Actionable revision suggestions and model answers for interview practice"
        ]
      },
      {
        title: "Curated 200+ DSA Problem Tracker",
        category: "Algorithms & Study",
        description: "Curated LeetCode-style questions organized by algorithmic patterns and difficulty levels.",
        capabilities: [
          "Pattern tagging: Sliding Window, Two Pointers, Dynamic Programming, Graphs",
          "Time and space complexity tracking with personal code snippets",
          "Spaced repetition reminder schedule to review forgotten topics"
        ]
      },
      {
        title: "Company-Specific Interview Notes",
        category: "Knowledge Base",
        description: "Structured repository for logging past interview experiences, compensation discussions, and test patterns.",
        capabilities: [
          "Archived online assessment questions by company",
          "HR round discussion guides and behavioral questions",
          "Salary negotiation notes and offer comparison matrix"
        ]
      },
      {
        title: "Placement Readiness Analytics",
        category: "Data Visualization",
        description: "Visual charts and progress meters displaying topic mastery and hiring conversion rates.",
        capabilities: [
          "Topic coverage radar graphs showing strengths and blindspots",
          "Application conversion funnel from application to interview",
          "Daily streak counter and problem-solving velocity meters"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "React.js, Tailwind CSS, Framer Motion, Lucide Icons",
        details: "Responsive single-page application with fluid modal workflows, drag-and-drop Kanban, and toast notifications."
      },
      backend: {
        tech: "Node.js, Express.js REST API",
        details: "Modular MVC architecture with RESTful endpoints, JWT authentication middleware, bcrypt hashing, and input validation."
      },
      database: {
        tech: "MongoDB & Mongoose ODM",
        details: "Document-oriented schemas for Users, Applications, DSA Problems, and AI Evaluation records with index optimization."
      },
      aimlOrEngine: {
        tech: "AI Natural Language Evaluation Engine",
        details: "RESTful integration with AI language models tailored to technical rubric evaluation and coding syntax analysis."
      },
      devopsDeployment: {
        tech: "Vercel (Client) & Render (API Backend)",
        details: "Continuous deployment pipelines connected to GitHub with environment secret gating and automated builds."
      },
      keyLibraries: ["React", "Express", "Mongoose", "TailwindCSS", "Framer-Motion", "Axios", "Bcrypt", "JsonWebToken"]
    },
    caseStudy: {
      overview: "College seniors and fresh graduates juggle dozens of concurrent job applications across portals while preparing for technical interviews and DSA challenges simultaneously.",
      problem: "Scattered spreadsheets lead to missed deadlines, forgotten follow-ups, and lack of structured interview preparation feedback.",
      solution: "Built a centralized web portal combining Kanban application workflows, LeetCode-aligned DSA curriculum trackers, and an AI-driven mock interview feedback evaluator.",
      userResearch: [
        { metric: "65%", label: "Reduction in daily application management overhead" },
        { metric: "92%", label: "Student usability score during university campus trials" },
        { metric: "8+", label: "Full-stack features shipped in 4-week Agile sprints" }
      ],
      designSystem: {
        typography: "Plus Jakarta Sans & JetBrains Mono",
        colors: ["#FAF8F5 (Clean Slate)", "#E07A5F (Warm Terracotta)", "#2D2A26 (Charcoal Text)"],
        principles: ["Zero Cognitive Clutter", "Actionable Performance Metrics", "Instant Status Clarity"]
      },
      screens: [
        { title: "Kanban Job Application Board", description: "Multi-column interactive pipeline organizing company leads and interview stages" },
        { title: "DSA Practice Tracker", description: "Categorized algorithmic topic trees with difficulty filters and solve counters" },
        { title: "AI Interview Feedback Report", description: "Diagnostic radar charts grading technical depth, communication, and clarity" }
      ],
      techArchitecture: {
        frontend: "React, Tailwind CSS, Framer Motion, Lucide Icons",
        backend: "Node.js, Express, MongoDB with Mongoose schemas, JWT Authentication",
        ai: "AI Natural Language Evaluation Engine via REST APIs"
      },
      results: [
        "Tested by 40+ engineering peers during college placement season",
        "Streamlined interview logging from 15 minutes across spreadsheets to 2 minutes",
        "Automated AI feedback praised for providing instant constructive critique"
      ]
    }
  },
  {
    id: "revive-threads",
    title: "Revive Threads - Sustainable Fashion Venture",
    category: "Full-Stack Web & Platform Engineering",
    badgeColor: "bg-[#6B8572] text-white",
    tagline: "India's unified circular fashion ecosystem: Peer-to-peer thrift resale, couture rentals, upcycling atelier & doorstep NGO donations.",
    highlight: "Two-Platform Full-Stack Architecture • 5-Point QC Review Pipeline • Escrow Protection",
    role: "Project Co-Lead, Full-Stack Developer & Systems Architect",
    tags: ["Node.js", "Express", "REST APIs", "Full-Stack", "E-Commerce", "Admin Operations", "Persistent JSON DB"],
    accent: "#6B8572",
    accentColor: "#6B8572",
    bannerImage: "/projects/revive_threads_mockup.png",
    github: "https://github.com/sakshikore16",
    liveDemo: "/revive_threads/index.html",
    presentation: "/revive_threads/pitch.html",
    analyticsDoc: "/revive_threads/documents.html",
    summary: "Architected and engineered a comprehensive two-platform circular wardrobe ecosystem: A live consumer storefront (`index.html`) featuring multi-mode shopping (Buy, Rent, or Both), combined with an operations management admin portal (`admin.html`) featuring QC inspection queues, price negotiation controls, and 1-click live publishing, backed by an Express REST API backend and persistent database.",
    stats: "2 Integrated Web Platforms • 4 Circular Modes • Real-time Order & GMV Metrics",
    workingOverview: "A circular fashion ecosystem engineered as a two-platform architecture: a public customer storefront (index.html) featuring multi-mode shopping (Buy Pre-Loved at 60-85% off, Rent Couture at 10% retail, Upcycling Atelier, NGO Doorstep Donation), combined with an internal operations management portal (admin.html) featuring a 5-point QC verification queue, price calibration, and 1-click live publishing, backed by an Express REST API backend and persistent database.",
    workingSteps: [
      {
        step: 1,
        title: "Two-Platform Full-Stack Architecture",
        description: "Engineered as two distinct interconnected web platforms: the Public Consumer Storefront (index.html) and the Operations Management Portal (admin.html), served by a modular Node.js Express REST API backend (server.js).",
        technicalDetail: "Decoupled MVC architecture with CORS-enabled REST endpoints and atomic persistent database writes."
      },
      {
        step: 2,
        title: "Guided Seller Listing Wizard",
        description: "Sellers list pre-owned garments using a guided 4-step wizard capturing category, condition rating, brand, measurements, and high-resolution photo uploads.",
        technicalDetail: "Client-side image compression, multi-part form data processing, and validation schemas."
      },
      {
        step: 3,
        title: "5-Point QC Review & Gatekeeping Queue",
        description: "Submitted listings do not go live automatically. They land in the Admin Portal (admin.html) review queue where operations staff complete a 5-point QC checklist: fabric authenticity check, stain/tear inspection, size standardization, photo clarity, and margin viability.",
        technicalDetail: "State machine transitions: 'pending_review' -> 'qc_passed' -> 'price_calibrated' -> 'live'."
      },
      {
        step: 4,
        title: "Margin Calibration & 1-Click Publishing",
        description: "Admins calibrate recommended resale and rental pricing, compute platform commission margins, and click 'Publish Live', which atomically updates the persistent database (data/db.json) and pushes the item to the public storefront in real time.",
        technicalDetail: "Atomic JSON database operations with file locking to prevent write race conditions."
      },
      {
        step: 5,
        title: "Multi-Mode Storefront & Circular Verticals",
        description: "Shoppers browse by mode: Buy Pre-Loved clothes (60-85% off retail), Rent Festive Couture (10% retail with medical sanitization), request tailor upcycling quotes at Revive Atelier, or schedule NGO doorstep pickups with Goonj & Clothes Box Foundation.",
        technicalDetail: "Persistent escrow shopping bag supporting concurrent Buy and Rent items with deposit tracking."
      }
    ],
    detailedFeatures: [
      {
        title: "Two-Platform Ecosystem Architecture",
        category: "System Design",
        description: "Clean decoupling of public consumer commerce storefront and internal operational control portal.",
        capabilities: [
          "Customer Storefront (index.html) with interactive filtering by Buy, Rent, or Both",
          "Operations Management Portal (admin.html) for QC team and inventory logistics",
          "Unified Express REST backend (server.js) coordinating listing CRUD and bag operations"
        ]
      },
      {
        title: "5-Point QC Verification & Approval Pipeline",
        category: "Quality Assurance",
        description: "Rigorous manual and photographic inspection queue preventing counterfeit or degraded garments from reaching buyers.",
        capabilities: [
          "Fabric authenticity verification and defect flagging before live publishing",
          "Standardized condition scoring (Pristine, Excellent, Gently Loved)",
          "1-click approval workflow updating live store catalog with zero server restarts"
        ]
      },
      {
        title: "4 Circular Wardrobe Verticals",
        category: "Sustainability & Commerce",
        description: "Comprehensive garment lifecycle solutions from resale to rental, tailor upcycling, and tax-exempt donations.",
        capabilities: [
          "Thrift Marketplace: curated pre-owned clothing at 60-85% off retail",
          "Festive Couture Rentals: luxury bridal and festive wear at 10% retail price",
          "Revive Atelier: custom tailor upcycling quote engine linking local master artisans",
          "Doorstep NGO Donation: partnerships with Goonj & Clothes Box Foundation with 80G receipts"
        ]
      },
      {
        title: "Escrow Protection Bag & Checkout",
        category: "E-Commerce",
        description: "Multi-mode shopping cart with escrow logic holding payments until product condition is verified upon delivery.",
        capabilities: [
          "Support for simultaneous Buy and Rent cart items in a single transaction",
          "Rental security deposit calculation and auto-refund tracking",
          "Order status tracking from dispatch to return and laundry turnaround"
        ]
      },
      {
        title: "Executive Venture Documentation Deck",
        category: "Business Strategy",
        description: "Complete Canva-style brand guide, PRD, and financial models documented in documents.html.",
        capabilities: [
          "Brand Identity Guide: color typography tokens and editorial aesthetic",
          "Detailed Product Requirement Document (PRD) with comprehensive user stories",
          "3-Year Unit Economics, reverse logistics, and P&L financial forecast"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "Modern HTML5, ES6 Modules, Tailwind CSS",
        details: "Semantic markup, custom modal dialog controllers, responsive flex/grid layouts, and componentized UI."
      },
      backend: {
        tech: "Node.js & Express.js REST API (server.js)",
        details: "RESTful endpoints handling listing CRUD, review state transitions (pending -> approved -> sold), and order checkout."
      },
      database: {
        tech: "Persistent JSON Database (data/db.json)",
        details: "Structured JSON data store with atomic read/write routines maintaining listings, admin queues, and cart states."
      },
      aimlOrEngine: {
        tech: "Automated QC Checklist & Sizing Normalizer",
        details: "Rule-based sizing normalization mapping international garment sizes (XS-XXL) to Indian standard measurements."
      },
      devopsDeployment: {
        tech: "Node Server & Static Asset Pipeline",
        details: "Zero-dependency lightweight deployment capable of running locally or on cloud VPS containers."
      },
      keyLibraries: ["Node.js", "Express", "TailwindCSS", "Multer (File Uploads)", "CORS", "Body-Parser"]
    },
    caseStudy: {
      overview: "Fast fashion creates enormous textile landfill waste across India. Revive Threads ends this cycle by creating an end-to-end circular economy where garments are kept in active circulation across resale, rental, upcycling, and tax-exempt NGO donations.",
      problem: "Pre-loved fashion platforms in India suffer from lack of trust, inconsistent sizing, counterfeit risks, and manual listing chaos. Sellers upload poor listings without standard QC, while wedding couture sits unused after a single night.",
      solution: "Engineered a production-ready two-platform system: The User Storefront (index.html) allows users to browse by mode (Buy/Rent/Both), submit items via a guided seller wizard, request custom tailor quotes at Revive Atelier, and schedule NGO pickups. Items don't publish immediately—they land in the Management Platform (admin.html) where the operations team conducts fabric QC, calibrates prices, and publishes with 1 click.",
      userResearch: [
        { metric: "60–85%", label: "Average retail discount on curated pre-loved everyday clothing" },
        { metric: "10%", label: "Rental price fraction for heavy bridal and festive couture with medical-grade sanitization" },
        { metric: "100%", label: "Doorstep NGO pickup coverage partnered with Goonj & Clothes Box Foundation with instant 80G tax receipts" },
        { metric: "1-Click", label: "Instant admin approval and live publication workflow from review queue to storefront" }
      ],
      designSystem: {
        typography: "Cormorant Garamond (Editorial Titles) & Plus Jakarta Sans (Clean UI Body)",
        colors: ["#6B8572 (Sage Whisper)", "#D48B77 (Terracotta Blossom)", "#FAF7F2 (Linen Oatmeal)", "#203126 (Deep Forest Ink)", "#C8A97E (Gilded Jute)"],
        principles: ["Trust & Verifiable Fabric Authenticity", "Zero-Waste Circular Wardrobe", "Operational Quality Control Gatekeeping"]
      },
      screens: [
        { title: "User Storefront & Listing Wizard", description: "Multi-mode garment browsing (Buy/Rent/Both), size filter chips, escrow bag, and seller submission wizard" },
        { title: "Management Operations & QC Portal", description: "Admin dashboard reviewing pending listings, verifying photo angles, calibrating margins, and publishing live" },
        { title: "Revive Atelier & NGO Donation Hub", description: "Custom upcycling quote engine linking local master tailors, plus verified doorstep NGO logistics with 80G receipts" }
      ],
      techArchitecture: {
        frontend: "Modern HTML5/ES6, Tailwind CSS, Componentized Modals, Responsive Viewport Grid",
        backend: "Node.js, Express.js REST API server (server.js) handling listing CRUD, review status transitions, and bag logic",
        database: "Persistent JSON database (data/db.json) maintaining public store state, pending queues, and order logs",
        documentation: "Executive Canva-Style Publication Deck (documents.html) with Brand Identity Specification, PRD, and Financials"
      },
      results: [
        "Shipped a working full-stack two-platform architecture with seamless seller-to-admin approval pipelines",
        "Formulated a defensive business moat with comprehensive unit economics and 5-point QC reverse logistics",
        "Authored an exhaustive PRD, user persona mappings, and 3-year P&L financial model"
      ]
    }
  },
  {
    id: "mood-music",
    title: "Mood-Based Music Player",
    category: "AI / Computer Vision & Web Audio",
    badgeColor: "bg-[#FF6B6B] text-white",
    tagline: "AI facial emotion & live weather-driven personalized audio player auto-curating music streams.",
    highlight: "CNN Emotion Detection • Weather API Integration • Realtime Audio Stream",
    role: "Full-Stack Developer & UX Designer",
    tags: ["React.js", "CNN", "Computer Vision", "Webcam API", "Weather API", "Node.js"],
    accent: "#FF6B6B",
    accentColor: "#FF6B6B",
    bannerImage: "/projects/moodtune_mockup.png",
    github: "https://github.com/sakshikore16/mood_based_playlist",
    liveDemo: "https://mood-based-playlist-nine.vercel.app",
    summary: "Built an intelligent music recommender that captures user facial emotions via webcam and cross-references live local weather API coordinates to auto-generate personalized, context-aware playlists.",
    stats: "Sub-second Facial Parsing • Context-Aware Playlists • Real-Time Audio",
    workingOverview: "An AI-powered contextual music recommender that captures user facial sentiment via webcam computer vision and cross-references live local weather telemetry (rain, sun, clouds) to dynamically curate and stream personalized audio playlists with an interactive 60fps waveform visualizer.",
    workingSteps: [
      {
        step: 1,
        title: "Local Webcam Frame Ingestion & Privacy Guard",
        description: "The application requests webcam video access. Video frames are captured directly in the browser's GPU buffer. No raw video feed or biometric images are ever transmitted to external servers, guaranteeing 100% user privacy.",
        technicalDetail: "HTML5 MediaDevices.getUserMedia API with local canvas buffer frame extraction."
      },
      {
        step: 2,
        title: "CNN Facial Landmark & Emotion Classification",
        description: "A lightweight Convolutional Neural Network (CNN) scans 68 facial landmarks (eyes, eyebrow curvature, mouth corners). It classifies emotional valence into 7 distinct mood states: Happy, Sad, Focused, Calm, Energetic, Neutral, and Surprised.",
        technicalDetail: "WebGL-accelerated neural inference executing in under 200ms per classification pass."
      },
      {
        step: 3,
        title: "Atmospheric Weather Telemetry Sync",
        description: "Concurrently queries the OpenWeatherMap API using device geolocation coordinates to retrieve local ambient weather conditions (Rainy, Sunny, Overcast, Misty) and ambient temperature.",
        technicalDetail: "Geolocation API coordinates mapped to OpenWeatherMap REST endpoints with cached response headers."
      },
      {
        step: 4,
        title: "Context-Aware Audio Recommendation Engine",
        description: "The engine cross-references the detected emotion matrix with ambient weather parameters to determine the optimal sonic mood profile (e.g. Rainy + Calm -> Lo-Fi & Acoustic; Sunny + Energetic -> Indie Pop & Electronic).",
        technicalDetail: "Rule-weighted recommendation matrix matching mood/weather vectors to curated track playlists."
      },
      {
        step: 5,
        title: "Web Audio Playback & 60fps Waveform Visualizer",
        description: "Streams high-fidelity audio tracks while an HTML5 Canvas visualizer draws dynamic frequency bars reacting to real-time sound frequencies using the Web Audio API AnalyserNode at 60fps.",
        technicalDetail: "Web Audio API AudioContext and AnalyserNode with fast Fourier transform (FFT) bin rendering."
      }
    ],
    detailedFeatures: [
      {
        title: "Webcam Facial Emotion Classifier",
        category: "Computer Vision",
        description: "Real-time facial expression parser powered by browser-based convolutional neural networks.",
        capabilities: [
          "Sub-second sentiment classification with confidence percentage indicators",
          "Zero video transmission to remote servers for 100% privacy and security",
          "Graceful fallback to manual mood selection for users without webcams"
        ]
      },
      {
        title: "Live Weather Telemetry Integration",
        category: "Telemetry & APIs",
        description: "Atmospheric coordinate integration tailoring playlists to external weather conditions.",
        capabilities: [
          "Automatic geolocation weather query via OpenWeatherMap API",
          "Weather condition badges and temperature indicators embedded in the player",
          "Rainy, Sunny, Twilight, and Overcast context adaptations"
        ]
      },
      {
        title: "Interactive Audio Waveform Visualizer",
        category: "Web Audio API",
        description: "Hardware-accelerated HTML5 Canvas rendering real-time sound frequencies at 60fps.",
        capabilities: [
          "60fps reactive frequency bar animations oscillating to bass and treble",
          "Custom audio player controls: play/pause, seek scrub bar, and volume controls",
          "Dynamic color palette morphing based on active detected mood"
        ]
      },
      {
        title: "7 Dynamic Mood & Vibe Modes",
        category: "Curated Playlists",
        description: "Multi-genre audio streaming channels curated for distinct emotional headspaces.",
        capabilities: [
          "Happy & Upbeat: energizing indie rock, synth-pop, and upbeat rhythms",
          "Calm & Reflective: acoustic guitar, gentle folk, and ambient soundscapes",
          "Deep Focus: instrumental lo-fi beats without distracting vocal tracks",
          "Rainy Mood: cozy jazz, soft piano melodies, and warm acoustic chords"
        ]
      },
      {
        title: "Privacy-First Architecture",
        category: "Security & Privacy",
        description: "Complete client-side processing ensuring camera video never leaves user device.",
        capabilities: [
          "Zero video recording or remote cloud upload",
          "Instant camera disable toggle at any moment",
          "Full functionality maintained even when camera access is denied"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "React.js 18, Tailwind CSS, HTML5 Canvas API",
        details: "Reactive single-page application with responsive player controls and hardware-accelerated canvas visualizers."
      },
      backend: {
        tech: "Node.js, Express.js REST Proxy",
        details: "Lightweight API gateway proxying weather telemetry and managing audio playlist streaming metadata."
      },
      database: {
        tech: "In-Memory Playlist Caches & Browser LocalStorage",
        details: "Local caching of user mood history, favorite tracks, and last-used volume/playback preferences."
      },
      aimlOrEngine: {
        tech: "CNN Facial Landmark Model (face-api.js / WebGL)",
        details: "Convolutional neural network executing real-time facial feature extraction directly in the browser via WebGL."
      },
      devopsDeployment: {
        tech: "Vercel Cloud Platform & GitHub CI/CD",
        details: "Automated serverless continuous deployment with instant edge delivery and SSL certificate handling."
      },
      keyLibraries: ["React", "Face-API.js / TensorFlow.js", "Web Audio API", "TailwindCSS", "Lucide-React", "Axios"]
    },
    caseStudy: {
      overview: "Manual playlist selection often fails to match your present mood or ambient atmosphere. Mood-Based Music Player uses computer vision and atmospheric conditions to play the exact right song seamlessly.",
      problem: "Users spend significant time searching and skipping tracks to match their emotional headspace and ambient surroundings.",
      solution: "Engineered a React application leveraging webcam facial emotion classification combined with live local weather telemetry to dynamically curate and stream matching audio tracks.",
      userResearch: [
        { metric: "1-Click", label: "Instant webcam facial mood detection without tedious quiz questions" },
        { metric: "7 Moods", label: "Classified emotional states (Happy, Sad, Focused, Calm, Energetic, Neutral, Rainy)" },
        { metric: "100%", label: "Graceful fallback mechanisms for users with disabled webcams" }
      ],
      designSystem: {
        typography: "Plus Jakarta Sans & System UI",
        colors: ["#1F1D2B (Dark Ambiance)", "#FF6B6B (Warm Coral)", "#4ECDC4 (Calm Teal)"],
        principles: ["Zero Effort Discovery", "Privacy-Preserving Local Video Processing", "Cozy Ambient Audio"]
      },
      screens: [
        { title: "Webcam Facial Parser", description: "Real-time emotion scanning with instant confidence score indicators" },
        { title: "Weather & Coordinate Sync", description: "Local weather conditions (sun, rain, clouds) modulating playlist selection" },
        { title: "Custom Audio Visualizer", description: "Smooth waveform canvas reacting to audio playback frequencies" }
      ],
      techArchitecture: {
        frontend: "React.js, HTML5 Webcam API, Canvas Audio Visualizer, Tailwind CSS",
        backend: "Node.js, Express, OpenWeatherMap API, Spotify/Sound Audio Streams",
        ai: "CNN-based facial emotion detection and classification models"
      },
      results: [
        "Deployed live on Vercel with responsive mobile and desktop viewports",
        "Praised for fluid, intuitive UX bridging computer vision with music streaming",
        "Optimized client-side frame processing to avoid video lag on lower-end devices"
      ]
    }
  },
  {
    id: "flygo-uiux",
    title: "FlyGo - Flight Booking App",
    category: "UI/UX & Product Design",
    badgeColor: "bg-[#0284C7] text-white",
    tagline: "Designing a frictionless, mobile-first flight booking experience in Figma.",
    highlight: "Low, Mid & High Fidelity • 88% Usability Success • Figma Auto-Layout",
    role: "Lead UI/UX Designer & Prototyper",
    tags: ["Figma", "UI/UX Design", "Mobile-First", "Low-Fidelity", "Mid-Fidelity", "High-Fidelity", "User Research", "WCAG AA"],
    accent: "#0284C7",
    accentColor: "#0284C7",
    bannerImage: "/projects/flygo_uiux.png",
    github: "https://github.com/sakshikore16",
    liveDemo: "https://www.figma.com/design/OGe4881GTdcofFCRj63LVd/flight-(high-fidelity)?node-id=0-1&t=nLnPLJilP9wKZVgG-1",
    summary: "FlyGo is an end-to-end mobile user experience designed in Figma to optimize travel planning. It simplifies destination search, tier comparison, and seat selection, wrapping it in an intuitive layout optimized for one-handed mobile use across Low, Mid, and High fidelity stages.",
    stats: "88% Task Completion • 3 Fidelity Tiers • 50+ Surveyed Travelers",
    workingOverview: "A human-centered 3-tier UX design journey in Figma transitioning from congested booking engines to a mobile-first flow. It documents the evolution across Low-Fidelity sketches and user journey flows, Mid-Fidelity grayscale wireframes on an 8-point spatial grid, and High-Fidelity interactive prototypes with atomic Auto-Layout components and thumb-zone ergonomics.",
    workingSteps: [
      {
        step: 1,
        title: "Low-Fidelity: User Research, Empathy Maps & Paper Sketches",
        description: "Surveyed 50 frequent travelers who cited confusing date selectors and hidden fees as primary pain points. Drafted low-fidelity paper wireframes removing promotional clutter and nested sidebars to maximize screen space for fare calendars.",
        technicalDetail: "Empathy mapping, user journey flows (Search -> Compare -> Select -> Checkout), and paper wireframe validation eliminating cognitive friction."
      },
      {
        step: 2,
        title: "Mid-Fidelity: Grayscale Spatial Wireframing & Thumb-Zone Ergonomics",
        description: "Built structured grayscale wireframes on an 8-point spatial grid. Placed primary action drawers and checkout buttons within comfortable bottom thumb reach, validating navigation hierarchy without color distractions.",
        technicalDetail: "8pt baseline grid system, standardized 16px/24px card padding, and interactive grayscale click-through prototypes."
      },
      {
        step: 3,
        title: "High-Fidelity: Ocean Blue Palette, Typography & WCAG Tokens",
        description: "Adopted a fresh ocean-blue and clean slate palette to project reliability and clarity, coupled with clean typography scales, card elevation tokens, and strict WCAG AA contrast compliance.",
        technicalDetail: "Figma Variables collections for Colors, Spacing, and Border-Radii with dark/light mode token aliasing."
      },
      {
        step: 4,
        title: "Figma Auto-Layout 5.0 & Interactive Component Sets",
        description: "Constructed reusable Figma components with nested Auto-Layout, minimum 44x44px touch targets, seat selection matrices, and variant states (Default, Selected, Sold Out, Loading).",
        technicalDetail: "Figma Component Sets with Boolean toggles, Text properties, Instance Swap slots, and responsive constraints."
      },
      {
        step: 5,
        title: "Interactive Prototyping & Usability Task Evaluation",
        description: "Connected interactive Smart Animate prototype flows: search destination -> compare flight fares on date calendar -> choose seating tier -> one-tap checkout. Usability testing with 10 participants yielded an 88% completion rate.",
        technicalDetail: "Figma Smart Animate curves (ease-out, spring 300ms) and prototype link sharing for unmoderated usability testing."
      }
    ],
    detailedFeatures: [
      {
        title: "Low-Fidelity Discovery & Concept Sketches",
        category: "User Research & Ideation",
        description: "Exploratory paper sketches, empathy maps, and low-fidelity wireframes that solved mobile travel booking fatigue.",
        capabilities: [
          "Card sorting and journey mapping isolating drop-off bottlenecks",
          "Rapid paper sketch iterations validating single-tap fare comparison",
          "Information architecture hierarchy defining primary booking tasks"
        ]
      },
      {
        title: "Mid-Fidelity Grayscale Wireframe Architecture",
        category: "Structural UX Design",
        description: "Neutral grayscale wireframes engineered on an 8-point spatial grid to test layout logic and thumb ergonomics.",
        capabilities: [
          "Rigorous 8-point spatial baseline rhythm across mobile viewport frames",
          "Content card anatomy testing visual scanning and fare reading velocity",
          "Click-through interactive wireframe prototypes validating navigational pathways"
        ]
      },
      {
        title: "High-Fidelity Atomic Design System",
        category: "Design Systems & Tokens",
        description: "Production-ready tokenized design library built in Figma for seamless developer handoff.",
        capabilities: [
          "Ocean blue color tokens, typography styles, and spacing variables",
          "40+ reusable components with interactive hover, active, and error states",
          "100% WCAG AA accessibility compliance with 7.2:1 text contrast ratios"
        ]
      },
      {
        title: "Interactive Flight Tier & Seat Selector",
        category: "Component Engineering",
        description: "Advanced Figma components leveraging modern auto-layout, cabin tier comparison, and seat maps.",
        capabilities: [
          "Interactive cabin tiers: Economy, Premium, Business with visual amenity comparisons",
          "Visual aircraft seat layout with real-time price delta badges",
          "Zero-breakage responsive resizing across 320px mobile to 430px iPhone Pro Max viewports"
        ]
      },
      {
        title: "Micro-Interactions & Usability Testing",
        category: "Prototyping & Validation",
        description: "High-delight prototype micro-interactions validating one-handed mobile booking flows.",
        capabilities: [
          "Smart Animate transitions simulating realistic bottom sheet drawer expansions",
          "One-tap transparent checkout without hidden processing fees",
          "Usability testing proving an 88% task completion rate with 10 testers"
        ]
      }
    ],
    techStackDetailed: {
      frontend: {
        tech: "Figma (Auto Layout 5.0, Component Variants, Variables)",
        details: "Industry-standard design canvas with auto-layout wrap, component property sets, and nested variants."
      },
      backend: {
        tech: "Design Tokens & Variable Collections",
        details: "Semantic variable collections for Colors, Spacing, Elevation, and Radii mapping 1:1 to CSS design tokens."
      },
      database: {
        tech: "Atomic Design System (Flight Cards, Date Pickers, Seat Maps)",
        details: "Structured component hierarchy allowing atomic composition from buttons to full complex booking cards."
      },
      aimlOrEngine: {
        tech: "Double Diamond UX Methodology & Usability Heuristics",
        details: "Nielsen Norman usability heuristics, cognitive load reduction formulas, and empathy mapping."
      },
      devopsDeployment: {
        tech: "Figma Cloud & Live Interactive Prototype Share",
        details: "Published interactive Figma prototype with inspector mode enabled for seamless engineer code handoff."
      },
      keyLibraries: ["Figma", "FigJam", "Stark WCAG Checker", "Auto Layout", "Smart Animate", "Design Tokens"]
    },
    caseStudy: {
      overview: "Traditional travel booking platforms present dense tables and confusing filters, leading to high cognitive fatigue and checkout drop-offs on mobile viewports. FlyGo reimagines flight booking with an intuitive, mobile-first experience designed in Figma across Low, Mid, and High fidelity stages.",
      problem: "Travelers struggle with cluttered promo banners, multi-step date pickers, and unexpected checkout fees on small mobile screens, causing high cart abandonment.",
      solution: "A three-tier fidelity UX design process in Figma that streamlines booking into a 5-step flow. Low-fi sketches removed promo distractions; mid-fi wireframes perfected thumb-friendly navigation on an 8pt grid; high-fi designs delivered transparent fare breakdowns, responsive auto-layout, and an 88% task completion rate.",
      userResearch: [
        { metric: "50+", label: "Frequent travelers surveyed on booking pain points" },
        { metric: "88%", label: "Usability task completion rate during user testing" },
        { metric: "3 Tiers", label: "Fidelity validation: Low-Fi, Mid-Fi & High-Fi" }
      ],
      designSystem: {
        typography: "Plus Jakarta Sans & System UI",
        colors: ["#0284C7 (Ocean Sky)", "#0369A1 (Deep Navy)", "#F0F9FF (Breeze Slate)", "#10B981 (Confirmed Green)"],
        principles: ["Three-Tier Fidelity Evolution", "Thumb-Zone One-Handed Ergonomics", "Transparent Pricing Without Hidden Costs"]
      },
      screens: [
        { title: "Low-Fidelity Paper Sketches", description: "Paper wireframes maximizing screen real estate for date grids and fare comparisons" },
        { title: "Mid-Fidelity Grayscale Wireframes", description: "Structured 8pt grid wireframes validating bottom checkout drawers and thumb reach" },
        { title: "High-Fidelity Interactive Prototype", description: "Polished Figma design with Auto-Layout, interactive seat selectors, and transparent fare summaries" }
      ],
      techArchitecture: {
        frontend: "Figma Auto Layout 5.0, Component Sets, Variables",
        methodology: "User-Centered Design (UCD), Double Diamond Design Framework",
        tokens: "Design Tokens ready for Tailwind CSS & React mobile implementation"
      },
      results: [
        "Completed end-to-end UX case study across Low, Mid, and High fidelity stages",
        "Achieved 88% usability task completion rate on destination selection and checkout",
        "Published interactive Figma prototype with responsive mobile artboards"
      ]
    }
  }
];

export const projects = featuredProjects;

// ============================================================================
// SKILLS INVENTORY (Organized across 4 strategic drawers)
// 1. Languages & Core CS
// 2. Web & Frameworks
// 3. AI / ML & Data Science
// 4. Cloud, DevOps & Tools
// ============================================================================
export const skillsInventory = {
  languages: [
    { name: "C++", level: "Core CS", note: "Object-oriented programming, STL, memory optimization" },
    { name: "Python", level: "Advanced", note: "Scikit-Learn, Pandas, NumPy, FastAPI, automation" },
    { name: "Java", level: "Proficient", note: "OOP architecture, collections framework, backend logic" },
    { name: "C#", level: "Proficient", note: ".NET MAUI mobile development, async tasks, OOP" },
    { name: "SQL", level: "Proficient", note: "Complex queries, joins, relational schema design, indexing" },
    { name: "JavaScript (ES6+)", level: "Advanced", note: "Asynchronous control flow, event loop, closures, DOM manipulation" },
    { name: "TypeScript", level: "Proficient", note: "Static typing, interfaces, contract safety across full-stack applications" },
    { name: "Data Structures & Algorithms", level: "Problem Solver", note: "Arrays, trees, graphs, dynamic programming, algorithmic optimization" },
    { name: "Object-Oriented Programming (OOP)", level: "Core CS", note: "Encapsulation, inheritance, polymorphism, clean architectural design" }
  ],
  web: [
    { name: "React.js", level: "Advanced", note: "Hooks, state isolation, component re-render optimization, Context API" },
    { name: "Next.js", level: "Fluent", note: "Server-side rendering, static site generation, API routes" },
    { name: "Node.js & Express.js", level: "Proficient", note: "RESTful APIs, routing, JWT auth, middleware pipelines" },
    { name: "MongoDB", level: "Proficient", note: "Mongoose schemas, aggregation pipelines, document data modeling" },
    { name: "Tailwind CSS", level: "Advanced", note: "Responsive design systems, atomic styling, utility-first UI architectures" },
    { name: ".NET MAUI", level: "Applied", note: "Cross-platform mobile apps for Android & iOS, native device APIs" },
    { name: "WebSockets", level: "Realtime", note: "Bidirectional real-time multi-user canvas & state sync" },
    { name: "REST APIs", level: "Proficient", note: "HTTP semantics, contract design, latency optimization, endpoint integration" },
    { name: "HTML5 & CSS3", level: "Advanced", note: "Semantic layout architecture, accessibility standards, fluid animations" },
    { name: "GraphQL", level: "Proficient", note: "Unified schema definitions, type resolvers, low-overfetching client queries" }
  ],
  aiml: [
    { name: "Machine Learning (ML)", level: "Builder", note: "Scikit-learn, supervised & unsupervised learning, clustering" },
    { name: "Predictive Modeling", level: "Specialist", note: "Regression, classification, model evaluation, hyperparameter tuning" },
    { name: "Scikit-Learn", level: "Specialist", note: "Pipeline transformers, cross-validation, estimator benchmarking" },
    { name: "Data Analysis & EDA", level: "Specialist", note: "Pandas, NumPy, data cleaning, exploratory visual analysis" },
    { name: "Pandas & NumPy", level: "Advanced", note: "High-performance vectorized operations, time-series, DataFrame manipulation" },
    { name: "Feature Engineering", level: "Specialist", note: "Dimensionality reduction, PCA projections, correlation matrices" },
    { name: "LLM & Prompt Engineering", level: "Specialist", note: "Structured JSON schemas, chain-of-thought, API integration" },
    { name: "Convolutional Neural Nets (CNN)", level: "Applied", note: "Computer vision, facial emotion detection, image classification" },
    { name: "Streamlit & MLOps", level: "Builder", note: "Interactive model web apps, feature engineering deployment" }
  ],
  cloudDevops: [
    { name: "Docker", level: "Builder", note: "Containerization, Dockerfiles, isolated development environments" },
    { name: "AWS & Cloud", level: "Proficient", note: "S3 storage, cloud API integration, hosting configurations" },
    { name: "Git & GitHub", level: "Advanced", note: "Branching workflows, version control, CI/CD actions, pull request collaboration" },
    { name: "Keycloak SSO", level: "Applied", note: "Enterprise OAuth2, OpenID Connect, RBAC authentication gates" },
    { name: "PostgreSQL & Redis", level: "Proficient", note: "Relational persistence, ACID compliance, in-memory low latency caching" },
    { name: "Postman", level: "Power User", note: "API testing, automated collection runners, contract validation" },
    { name: "Firebase", level: "Proficient", note: "Firestore, authentication, real-time database, cloud hosting" },
    { name: "Figma & UI/UX", level: "Advanced", note: "UI/UX wireframing, high-fidelity interactive prototypes, design systems" },
    { name: "CI/CD & Linux", level: "Proficient", note: "Automated pipelines, Unix terminal scripting, cloud instance administration" }
  ]
};

// ============================================================================
// WORK EXPERIENCES (Books on Study Desk - Impactful with Concrete Numbers)
// 1. Harrier Information Systems (Software Developer Intern)
// 2. Digital Loop Marketing (Digital Marketing & Web Designer Intern)
// 3. Godshalwar Project Consultants (Web Marketing & Analytics Manager)
// ============================================================================
export const experienceData = [
  {
    id: "harrier",
    volume: "VOL. 01",
    title: "HARRIER",
    company: "Harrier Information Systems Pvt. Ltd",
    period: "Jul 2025 — Dec 2025",
    role: "Software Developer Intern",
    coverColor: "#E07A5F",
    coverBorder: "border-[#B85540]",
    coverGradient: "from-[#FFA69E] via-[#F28482] to-[#E07A5F]",
    ribbonColor: "#F4A261",
    highlighterBg: "bg-[#FEF08A]/85 text-amber-950",
    summary: "Built and deployed cross-platform mobile document scanning & OCR applications using C# and .NET MAUI, cutting manual document processing efforts by ~60%.",
    workHighlights: [
      "Built and deployed a production-ready .NET MAUI mobile OCR/scanner app with multi-page image processing, cutting manual effort by ~60%.",
      "Engineered Node.js & SQL backend logic and REST APIs, boosting overall data processing efficiency by 35%.",
      "Redesigned core UI workflows, cutting user interaction steps from 5 steps down to 2.",
      "Delivered 8+ major feature releases within fast-paced Agile sprints with 100% on-time milestone completion."
    ],
    skills: ["C#", ".NET MAUI", "Node.js", "SQL", "OCR Integration", "REST APIs", "Agile Sprints"],
    metrics: "~60% Less Processing Effort • 35% Faster Backend • 8+ Features"
  },
  {
    id: "digital-loop",
    volume: "VOL. 02",
    title: "DIGITAL LOOP",
    company: "Digital Loop Marketing",
    period: "Jul 2024 — Oct 2024",
    role: "Digital Marketing & Web Designer Intern",
    coverColor: "#52B788",
    coverBorder: "border-[#388E67]",
    coverGradient: "from-[#A7D7C5] via-[#74C69D] to-[#52B788]",
    ribbonColor: "#81B29A",
    highlighterBg: "bg-[#D9F99D]/85 text-emerald-950",
    summary: "Built and managed client-facing React + MongoDB websites while driving performance campaigns, increasing user retention by ~45% and engagement by 3.8×.",
    workHighlights: [
      "Designed and developed a responsive client website using React and MongoDB, increasing user retention by ~45%.",
      "Planned and executed targeted Meta advertising campaigns and content strategies, boosting brand engagement by 3.8× within 2 months.",
      "Managed end-to-end web UI/UX, SEO optimizations, and digital outreach to drive measurable business growth."
    ],
    skills: ["React", "MongoDB", "Web Designing", "Meta Ads Manager", "SEO", "UI/UX Design"],
    metrics: "+45% User Retention • 3.8× Engagement Surge • 2 Months"
  },
  {
    id: "godshalwar",
    volume: "VOL. 03",
    title: "GODSHALWAR",
    company: "Godshalwar Project Consultants & Developers",
    period: "Apr 2023 — Sep 2023",
    role: "Web Marketing & Content Manager",
    coverColor: "#7E57C2",
    coverBorder: "border-[#5E35B1]",
    coverGradient: "from-[#D1C4E9] via-[#B39DDB] to-[#7E57C2]",
    ribbonColor: "#9575CD",
    highlighterBg: "bg-[#E9D5FF]/85 text-purple-950",
    summary: "Led competitor web analytics and digital campaign optimizations, enhancing content relevance score by ~40% across real-estate developer initiatives.",
    workHighlights: [
      "Analyzed competitor content and campaign analytics, boosting organic content relevance score by ~40%.",
      "Streamlined web postings, layout presentations, and digital marketing materials across developer channels.",
      "Conducted data-backed audience research that drove higher click-through rates and customer inquiries."
    ],
    skills: ["Campaign Analytics", "Web Strategy", "Competitor Research", "Content Optimization"],
    metrics: "~40% Higher Relevance • Data-Driven Campaigns • Optimized Portals"
  }
];

// ============================================================================
// ACADEMIC CREDENTIALS (Preserving exact marks & distinctions)
// 1. B.Tech Computer Science - ITM Skills University (CGPA 8.48)
// 2. Class XII (HSC) - Prakash College (61.2%)
// 3. Class X (ICSE) - CNM School & ND Parekh (91.8%)
// ============================================================================
export const educationData = [
  {
    id: 0,
    title: "CLASS X (ICSE)",
    subtitle: "Secondary Education",
    institution: "CNM School & ND Parekh School",
    location: "Mumbai",
    period: "2010 — 2021",
    grade: "Secondary Education",
    stream: "ICSE Board",
    iconEmoji: "🏫",
    headerBg: "bg-[#E07A5F]",
    cardBorder: "border-[#F4A261]/40 hover:border-[#E07A5F]",
    flowerLabel: "Seedling Bud",
    flowerSubtitle: "Class X • ICSE",
    swingRotate: 0
  },
  {
    id: 1,
    title: "CLASS XII (HSC)",
    subtitle: "Higher Secondary Certificate",
    institution: "Prakash College",
    location: "Mumbai",
    period: "2021 — 2023",
    grade: "Higher Secondary",
    stream: "HSC Science Stream",
    iconEmoji: "🏛️",
    headerBg: "bg-[#81B29A]",
    cardBorder: "border-[#A3C4BC]/40 hover:border-[#81B29A]",
    flowerLabel: "Half Bloom",
    flowerSubtitle: "Class XII • HSC Science",
    swingRotate: 0
  },
  {
    id: 2,
    title: "B.TECH COMPUTER SCIENCE",
    subtitle: "Undergraduate Degree",
    institution: "ITM Skills University",
    location: "Kharghar, Navi Mumbai",
    period: "2023 — 2027",
    grade: "B.Tech Undergraduate",
    stream: "AI/ML & Data Science",
    iconEmoji: "🎓",
    headerBg: "bg-[#7A9E9F]",
    cardBorder: "border-[#A8DADC]/40 hover:border-[#7A9E9F]",
    flowerLabel: "Full Sunflower",
    flowerSubtitle: "B.Tech • Computer Science",
    swingRotate: 0
  }
];

// ============================================================================
// CERTIFICATIONS & WINNINGS (4 Verified Credentials)
// Sequence: 2 Certifications, then 1 Winning Hackathon, then 1 Certification
// 1. 2-Day AI Tools Masterclass Certification (be10x)
// 2. JavaScript (Basic) Certified (HackerRank)
// 3. Finalist — IMAGINE Hackathon (PIWOT 2025 at Jio World)
// 4. Python (Basic) Certified (HackerRank)
// ============================================================================
export const certificationsAndWinnings = [
  {
    title: "2-Day AI Tools Masterclass Certification",
    issuer: "be10x (Aditya Kachave & Aditya Goenka)",
    date: "July 2024",
    badge: "Verified Certificate of Completion",
    icon: "Sparkles",
    color: "border-[#3A86FF]",
    accentBg: "bg-[#3A86FF]/10 text-[#2563EB]",
    credentialUrl: "https://media.licdn.com/dms/image/v2/D562DAQEsB3jAyBYpEw/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1720537363287?e=1792627200&v=beta&t=wOJY7eSeOY-GNapPiX-KsmPxbO_K-n5ByrybSDOLxzA",
    image: "/be10x_ai_tools.png",
    type: "Certification",
    description: "Hands-on mastery of generative AI prompts, productivity tools, and AI-assisted engineering workflows certified by be10x."
  },
  {
    title: "JavaScript (Basic) Certified",
    issuer: "HackerRank",
    date: "Verified Credential",
    badge: "ID: 71c0aaf7c24e",
    icon: "Code",
    color: "border-[#52B788]",
    accentBg: "bg-[#52B788]/10 text-[#2D6A4F]",
    credentialUrl: "https://www.hackerrank.com/certificates/71c0aaf7c24e",
    image: null,
    type: "Certification",
    description: "Verified assessment of core JavaScript, asynchronous control flow, DOM manipulation, closures, and object manipulation."
  },
  {
    title: "Finalist — IMAGINE Hackathon (PIWOT 2025)",
    issuer: "PAN IIT Alumni Association (Jio World Convention Center)",
    date: "2025",
    badge: "Top 72 Teams • 2% Selection Rate",
    icon: "Trophy",
    color: "border-[#E07A5F]",
    accentBg: "bg-[#E07A5F]/10 text-[#C85A3F]",
    credentialUrl: "public/piwot_hackathon_finalist.png",
    image: "/piwot_hackathon_finalist.png",
    type: "Winning",
    description: "Selected among the 72 finalist teams for the prestigious IMAGINE Hackathon at PIWOT 2025 (Jio World Convention Centre, Mumbai) from over 15,000 pan-India registrations (2% selection rate)."
  },
  {
    title: "Python (Basic) Certified",
    issuer: "HackerRank",
    date: "Verified Credential",
    badge: "ID: e2152c36ccf8",
    icon: "FileCode",
    color: "border-[#7E57C2]",
    accentBg: "bg-[#7E57C2]/10 text-[#5E35B1]",
    credentialUrl: "https://www.hackerrank.com/certificates/e2152c36ccf8",
    image: null,
    type: "Certification",
    description: "Verified proficiency in Python fundamentals, data structures, algorithm problem-solving, and object-oriented syntax."
  }
];

export const certifications = certificationsAndWinnings;
