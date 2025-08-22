import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const initialPortfolioData = {
  profile: {
    name: "Praveen Jadhav",
    nickname: "Jarvis",
    tagline: "Full Stack Developer & AI Enthusiast",
    githubUsername: "praveenjadhav1510",
    profileImage: "/professional-developer-headshot.png",
  },
  about: {
    intro:
      "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and exploring the latest trends in AI and machine learning.",
    education: [
      {
        level: "Bachelor's in Computer Science",
        year: 2023,
        score: "8.5 CGPA",
      },
      {
        level: "Higher Secondary (12th)",
        year: 2019,
        score: "85%",
      },
      {
        level: "Secondary (10th)",
        year: 2017,
        score: "90%",
      },
    ],
  },
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Firebase",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "Tailwind CSS",
    "Express.js",
    "GraphQL",
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "https://github.com/praveenjadhav1510/ecommerce-platform",
      demo: "https://ecommerce-demo.vercel.app",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      techStack: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/praveenjadhav1510/task-manager",
      demo: "https://task-manager-demo.vercel.app",
    },
    {
      title: "AI Chat Assistant",
      description:
        "An intelligent chat assistant powered by OpenAI API with context awareness and conversation memory.",
      techStack: ["Python", "FastAPI", "OpenAI API", "React", "WebSocket"],
      github: "https://github.com/praveenjadhav1510/ai-chat-assistant",
      demo: "https://ai-chat-demo.vercel.app",
    },
  ],
  resume: {
    pdf: "/resume.pdf",
  },
  contact: {
    emails: ["praveen.jadhav@example.com", "jarvis.dev@example.com"],
    github: "https://github.com/praveenjadhav1510",
    linkedin: "https://linkedin.com/in/praveenjadhav1510",
  },
  interests: {
    hobbies: [
      "Machine Learning & AI Research",
      "Open Source Contributing",
      "Tech Blogging",
      "Photography",
      "Gaming",
      "Traveling",
    ],
  },
}

async function initializeFirebaseData() {
  try {
    console.log("Initializing Firebase data...")

    const docRef = doc(db, "portfolio", "data")
    await setDoc(docRef, initialPortfolioData)

    console.log("✅ Portfolio data successfully initialized in Firestore!")
    console.log("🎉 Your portfolio is now ready to use!")
  } catch (error) {
    console.error("❌ Error initializing Firebase data:", error)
  }
}

initializeFirebaseData()
