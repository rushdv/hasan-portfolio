import { 
  Project, 
  SkillCategory, 
  TravelPlace, 
  PhotoItem, 
  EducationItem, 
  CertificateItem, 
  RoadmapStep, 
  PersonalInterest,
  SocialLinks
} from '../types';

export const personalInfo = {
  name: "Mehedi Hasan",
  shortName: "MH",
  title: "CSE Student & Aspiring AI/ML Engineer",
  roles: ["CSE Student", "Aspiring AI / Machine Learning Engineer", "Developer", "Explorer", "Photographer"],
  tagline: "I BUILD WITH CODE. I EXPLORE BEYOND IT.",
  subTagline: "Computer Science & Engineering student exploring software development, AI/ML, and the world beyond the screen.",
  location: "Dhaka, Bangladesh",
  institution: "Northern University Bangladesh",
  degree: "B.Sc. in Computer Science & Engineering",
  aboutQuote: "I spend my days learning how computers think, and my free time discovering how the world feels.",
  aboutText: [
    "As a Computer Science & Engineering student, my journey is driven by a deep fascination with how computational models solve real-world problems. From foundational C programming and modern Python development to data engineering, I am shaping my path toward Artificial Intelligence and Machine Learning.",
    "However, code is only half of who I am. When the terminal closes, I step outside to explore the diverse landscapes of Bangladesh—capturing stories through my camera lens and reflecting on how software can harmonize with human experience."
  ],
  socials: {
    facebook: "https://www.facebook.com/share/19JAGRZvQE/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/camphoreee?utm_source=qr",
    linkedin: "https://www.linkedin.com/in/im-mehedi-hasan?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com/mehedihasan-ml",
    email: "mehedi.hasan.dev@gmail.com"
  } as SocialLinks
};

export const skillCategories: SkillCategory[] = [
  {
    title: "LANGUAGES & TOOLS",
    subtitle: "Core technologies I use to turn logic into software.",
    skills: [
      { name: "C", description: "Memory management & foundational algorithms", linkText: "Exploring low-level logic →" },
      { name: "Python", description: "Primary engine for data processing & scripting", linkText: "Building with it →" },
      { name: "HTML / CSS", description: "Crafting structured, responsive web layouts", linkText: "Styling screens →" },
      { name: "Git", description: "Version control & repository management", linkText: "Tracking changes →" },
      { name: "GitHub", description: "Collaborative coding & project showcases", linkText: "View repositories →" }
    ]
  },
  {
    title: "CURRENTLY LEARNING",
    subtitle: "Active areas of study and technical practice.",
    skills: [
      { name: "Data Structures & Algorithms", description: "Optimization, arrays, trees & graph traversal", linkText: "Solving problems →" },
      { name: "NumPy", description: "High-performance vector operations & arrays", linkText: "Matrix math →" },
      { name: "Pandas", description: "Data wrangling, cleaning & tabular analysis", linkText: "Processing data →" },
      { name: "Machine Learning Fundamentals", description: "Supervised algorithms, regression & classification", linkText: "Training models →" }
    ]
  },
  {
    title: "FUTURE FOCUS",
    subtitle: "Long-term ambition and targeted specializations.",
    skills: [
      { name: "Artificial Intelligence", description: "Autonomous systems & intelligent agent design", linkText: "Target vision →" },
      { name: "Deep Learning", description: "Neural networks, PyTorch & computer vision", linkText: "Deep architecture →" },
      { name: "Data Science Pipeline", description: "End-to-end data pipelines & predictive insights", linkText: "Extracting truth →" },
      { name: "Intelligent Automation", description: "Automating workflows with smart computational engines", linkText: "Scaling logic →" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "student-management-system",
    number: "01",
    title: "STUDENT MANAGEMENT SYSTEM",
    tagline: "Comprehensive record management & academic tracking engine.",
    description: "A practical application built to digitize student records, course enrollments, grade tracking, and administrative reports.",
    problem: "Educational record keeping often suffers from fragmented data files, slow manual search, and memory inefficiency in foundational systems.",
    solution: "Designed a clean modular architecture utilizing structured binary storage, dynamic file handling, and efficient search algorithms to deliver instant record retrieval.",
    learned: "Data organization, CRUD operations, pointer memory management, problem solving, and scalable application structure.",
    techStack: ["C", "File Handling", "Data Structures", "CLI Interface"],
    githubUrl: "https://github.com/mehedihasan-ml/student-management-system",
    liveUrl: "https://github.com/mehedihasan-ml/student-management-system",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "expense-tracker",
    number: "02",
    title: "PERSONAL EXPENSE TRACKER",
    tagline: "Financial dashboard for tracking daily cash flows & budgets.",
    description: "A lightweight financial utility application enabling users to categorize expenditures, calculate monthly budgets, and visualize spending habits.",
    problem: "Users lack clear visual feedback on small daily micro-expenses, leading to monthly budget overruns.",
    solution: "Built a responsive dashboard with interactive category tags, automated balance calculation, and structured local JSON storage.",
    learned: "State management, event handling, DOM manipulation, storage persistence, and clean UX design.",
    techStack: ["Python", "Tkinter", "JSON", "Data Visualization"],
    githubUrl: "https://github.com/mehedihasan-ml/expense-tracker",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "weather-app",
    number: "03",
    title: "ATMOSPHERIC WEATHER APP",
    tagline: "Real-time meteorological forecast & environment monitor.",
    description: "An intuitive weather web interface displaying live temperature, humidity, wind velocity, and multi-day forecasts for global locations.",
    problem: "Standard weather applications present cluttered interfaces overloaded with unnecessary metrics.",
    solution: "Created a dark minimalist weather client featuring ambient background adjustments based on time and climate conditions.",
    learned: "REST API integration, asynchronous JavaScript, error handling, responsive UI composition, and CSS animations.",
    techStack: ["HTML5", "CSS3", "JavaScript", "OpenWeather API"],
    githubUrl: "https://github.com/mehedihasan-ml/weather-app",
    liveUrl: "https://mehedihasan-ml.github.io/weather-app",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "data-analysis-project",
    number: "04",
    title: "EXPLORATORY DATA ANALYSIS",
    tagline: "Statistical analysis & insights from real-world datasets.",
    description: "An exploratory data science notebook examining economic and educational trends in South Asia using statistical visualization.",
    problem: "Raw tabular data contains hidden correlations and anomalies that remain obscured without algorithmic cleaning and chart plotting.",
    solution: "Applied Pandas data wrangling pipelines to handle missing values, normalized numerical features, and constructed Seaborn correlation heatmaps.",
    learned: "Data cleaning, feature transformation, hypothesis testing, Matplotlib/Seaborn plotting, and statistical reporting.",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
    githubUrl: "https://github.com/mehedihasan-ml/exploratory-data-analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "ml-prediction-project",
    number: "05",
    title: "ML PREDICTION ENGINE",
    tagline: "Predictive machine learning pipeline for housing valuation.",
    description: "A machine learning regression model designed to predict real estate market valuations based on regional demographic and architectural metrics.",
    problem: "Manual property valuation models lack objective data-driven precision and fail to account for multi-variable non-linear trends.",
    solution: "Trained Random Forest and Decision Tree regression pipelines with cross-validation to optimize accuracy metrics and lower Mean Squared Error.",
    learned: "Supervised machine learning algorithms, model evaluation metrics (MSE, R2), feature scaling, and SciKit-Learn API workflows.",
    techStack: ["Python", "Scikit-Learn", "NumPy", "Pandas", "ML Regression"],
    githubUrl: "https://github.com/mehedihasan-ml/ml-housing-prediction",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "personal-travel-planner",
    number: "06",
    title: "PERSONAL TRAVEL PLANNER",
    tagline: "Itinerary builder & travel journal for exploring Bangladesh.",
    description: "A tailored web application that helps explorers plan regional trips, organize photo logs, and estimate journey itineraries.",
    problem: "Travel enthusiasts lack a personalized space to document hidden local spots along with technical travel logs.",
    solution: "Engineered an interactive travel journal interface with place markers, route checklists, and visual photography galleries.",
    learned: "Component state design, interactive maps, image lazy-loading, and mobile touch optimization.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    githubUrl: "https://github.com/mehedihasan-ml/travel-planner",
    liveUrl: "https://mehedihasan-travel.vercel.app",
    image: "/images/travel_coxsbazar.jpg",
    featured: true
  }
];

export const travelPlaces: TravelPlace[] = [
  {
    id: "coxs-bazar",
    location: "Cox's Bazar",
    region: "Chittagong Division",
    coordinates: { x: 80, y: 82 },
    date: "October 2025",
    photo: "/images/travel_coxsbazar.jpg",
    story: "Walking along the world's longest natural sea beach as golden hour turns the horizon into amber liquid. The rhythmic collapse of Atlantic-grade ocean swells puts academic noise to rest.",
    favouriteMoment: "Watching fishing sampans silhouette against a glowing dusk horizon."
  },
  {
    id: "sylhet",
    location: "Sylhet & Jaflong",
    region: "Sylhet Division",
    coordinates: { x: 78, y: 32 },
    date: "August 2025",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    story: "Waking up at 5 AM to misty rolling tea gardens in Sreemangal and Jaflong. The fresh mountain air and monsoon river streams offer pure clarity.",
    favouriteMoment: "Gliding through the quiet flooded rainforest of Ratargul in a wooden rowboat."
  },
  {
    id: "dhaka",
    location: "Dhaka",
    region: "Dhaka Division",
    coordinates: { x: 50, y: 52 },
    date: "Home Base / Ongoing",
    photo: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
    story: "My daily canvas of code, university lectures, and urban wanderings. From the historic narrow alleys of Old Dhaka to quiet evening rooftop sunset walks.",
    favouriteMoment: "Capturing rain-drenched street lights reflecting on wet asphalt after late coding sessions."
  },
  {
    id: "bandarban",
    location: "Bandarban Hills",
    region: "Chittagong Hill Tracts",
    coordinates: { x: 85, y: 75 },
    date: "January 2026",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    story: "Ascending Nilgiri and Chimbuk Peak where cloud oceans drift below mountain tops. Hiking winding trails surrounded by bamboo forests and tribal hospitality.",
    favouriteMoment: "Standing above the cloud ceiling as the morning sun breaks over mountain ranges."
  },
  {
    id: "sreemangal",
    location: "Sreemangal",
    region: "Sylhet Division",
    coordinates: { x: 74, y: 38 },
    date: "November 2025",
    photo: "https://images.unsplash.com/photo-1511497584788-876761c119ef?auto=format&fit=crop&w=1200&q=80",
    story: "Exploring Lawachara National Park under dense canopy shade. The crisp aroma of rain and tea leaves makes it a haven for deep reflection.",
    favouriteMoment: "Sipping traditional Seven-Layer Tea after a 12km forest trek."
  }
];

export const photoGallery: PhotoItem[] = [
  {
    id: "p1",
    title: "Golden Hour sampans",
    category: "TRAVEL",
    location: "Cox's Bazar, Bangladesh",
    date: "October 2025",
    src: "/images/travel_coxsbazar.jpg",
    aspectRatio: "landscape",
    caption: "Traditional wooden boats anchored along the golden sands during dusk."
  },
  {
    id: "p2",
    title: "Monsoon Dew drops",
    category: "NATURE",
    location: "Sreemangal Rainforest",
    date: "November 2025",
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "portrait",
    caption: "Macro details of morning dew beads suspended on wild fern fronds."
  },
  {
    id: "p3",
    title: "Geometric Modern Shadows",
    category: "ARCHITECTURE",
    location: "National Assembly Grounds, Dhaka",
    date: "February 2026",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    caption: "Interplay of sunlight angles and concrete brutalist forms."
  },
  {
    id: "p4",
    title: "Rainy Dusk Streetlights",
    category: "STREET",
    location: "Dhanmondi, Dhaka",
    date: "July 2025",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "portrait",
    caption: "Warm street lamps casting golden reflections on rain-swept asphalt."
  },
  {
    id: "p5",
    title: "Foggy Tea Terraces",
    category: "TRAVEL",
    location: "Sylhet, Bangladesh",
    date: "August 2025",
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    caption: "Early morning mist hovering gently over endless tea hill slopes."
  },
  {
    id: "p6",
    title: "Mehedi Hasan Workspace",
    category: "RANDOM",
    location: "Home Studio, Dhaka",
    date: "January 2026",
    src: "/images/mehedi_hasan.jpg",
    aspectRatio: "portrait",
    caption: "A quiet moment of reflection between debug logs and ML model training."
  },
  {
    id: "p7",
    title: "Emerald Canopy Walk",
    category: "NATURE",
    location: "Lawachara National Park",
    date: "November 2025",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    caption: "Sunbeams cutting through dense tropical rainforest canopy."
  },
  {
    id: "p8",
    title: "Old Town Heritage Facade",
    category: "ARCHITECTURE",
    location: "Shakharibazar, Old Dhaka",
    date: "December 2025",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "portrait",
    caption: "Colonial brickwork and vibrant hanging banners telling century-old tales."
  }
];

export const educationHistory: EducationItem[] = [
  {
    period: "2023 — PRESENT",
    institution: "Northern University Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    status: "In Progress (Undergraduate)",
    courses: [
      "Structured Programming (C)",
      "Object-Oriented Programming (Python/C++)",
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Discrete Mathematics",
      "Computer Architecture & OS",
      "Linear Algebra & Statistics for Computing"
    ],
    highlight: "Actively engaging in programming problem solving, algorithmic challenges, and hands-on software development projects."
  }
];

export const certificates: CertificateItem[] = [
  {
    id: "cert-python",
    title: "Python Programming Specialization",
    issuer: "Online Learning Platform / Tech Academy",
    year: "2025",
    credentialUrl: "https://github.com/mehedihasan-ml",
    skills: ["Python 3", "Data Structures", "OOP", "File I/O"]
  },
  {
    id: "cert-dsa",
    title: "Algorithmic Problem Solving & Data Structures",
    issuer: "Competitive Programming Track",
    year: "2025",
    credentialUrl: "https://github.com/mehedihasan-ml",
    skills: ["Sorting/Searching", "Trees & Graphs", "Time Complexity"]
  },
  {
    id: "cert-data-science",
    title: "Introduction to Data Science & Analytics",
    issuer: "Data Science Institute",
    year: "2026",
    credentialUrl: "https://github.com/mehedihasan-ml",
    skills: ["Pandas", "NumPy", "Data Cleaning", "Matplotlib"]
  },
  {
    id: "cert-ai-ml-intro",
    title: "Machine Learning Foundations",
    issuer: "AI Learning Community",
    year: "2026",
    credentialUrl: "https://github.com/mehedihasan-ml",
    skills: ["Regression", "Classification", "Model Evaluation"]
  }
];

export const roadmapSteps: RoadmapStep[] = [
  {
    step: 1,
    title: "PYTHON & LOGIC FOUNDATION",
    status: "completed",
    description: "Mastering Python syntax, object-oriented concepts, algorithm design, and structured problem solving.",
    technologies: ["C", "Python", "Git", "CLI"]
  },
  {
    step: 2,
    title: "DATA STRUCTURES & ALGORITHMS",
    status: "completed",
    description: "Deep diving into arrays, linked lists, stacks, queues, trees, graphs, dynamic programming, and complexity analysis.",
    technologies: ["Arrays", "Trees", "Sorting", "Search"]
  },
  {
    step: 3,
    title: "NUMPY, PANDAS & DATA WRANGLING",
    status: "in-progress",
    description: "Manipulating multi-dimensional arrays, tabular datasets, handling missing data, and statistical visualization.",
    technologies: ["NumPy", "Pandas", "Matplotlib", "Seaborn"]
  },
  {
    step: 4,
    title: "CLASSICAL MACHINE LEARNING",
    status: "in-progress",
    description: "Building supervised and unsupervised models including linear/logistic regression, decision trees, and random forests.",
    technologies: ["SciKit-Learn", "Regression", "SVM", "Model Metrics"]
  },
  {
    step: 5,
    title: "DEEP LEARNING & NEURAL NETWORKS",
    status: "upcoming",
    description: "Exploring artificial neural networks (ANN), convolutional networks (CNN), and tensor computation frameworks.",
    technologies: ["PyTorch", "TensorFlow", "Neural Nets", "CV"]
  },
  {
    step: 6,
    title: "AI ENGINEERING & INTELLIGENT AGENTS",
    status: "upcoming",
    description: "Deploying end-to-end intelligent systems, fine-tuning LLM pipelines, and building real-world AI applications.",
    technologies: ["AI Agents", "Model Deployment", "APIs", "MLOps"]
  }
];

export const personalInterests: PersonalInterest[] = [
  {
    id: "travel",
    number: "01",
    title: "TRAVEL",
    subtitle: "EXPLORING PATHS BEYOND THE SCREEN",
    description: "Traversing mountain peaks, river deltas, and coastal shores across Bangladesh to refresh perspective and discover human stories.",
    bgImage: "/images/travel_coxsbazar.jpg"
  },
  {
    id: "photography",
    number: "02",
    title: "PHOTOGRAPHY",
    subtitle: "FREEZING MOMENTS IN LIGHT AND SHADOW",
    description: "Capturing raw landscapes, moody streetlights, and architectural geometry with a focus on dark cinematic aesthetic.",
    bgImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "technology",
    number: "03",
    title: "TECHNOLOGY",
    subtitle: "UNDERSTANDING COMPUTATIONAL INTELLIGENCE",
    description: "Fascinated by how algorithms learn from data, automate human logic, and transform complex systems into effortless experiences.",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "learning",
    number: "04",
    title: "ALWAYS LEARNING",
    subtitle: "BUILDING DISCIPLINE THROUGH CURIOSITY",
    description: "Constantly expanding knowledge across computer science fundamentals, languages, global culture, and creative endeavors.",
    bgImage: "/images/mehedi_hasan.jpg"
  }
];
