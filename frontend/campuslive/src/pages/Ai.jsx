import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiRefreshCw } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { RiRoadMapLine } from 'react-icons/ri';

const SYSTEM_PROMPT = `You are a career guidance AI assistant for tech roles. 
You help students and developers plan their career paths and provide detailed roadmaps.
Keep responses concise and well-structured using markdown formatting.
Focus on practical, actionable advice for tech careers.`;

export default function Ai() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi there! I'm the UniCode Career AI. I can help you plan your tech career path and provide roadmaps for various tech roles. What career are you interested in exploring?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const careerSuggestions = [
    "Frontend Developer Roadmap",
    "Backend Developer Path",
    "Full Stack Developer Guide",
    "DevOps Engineer Career Path",
    "Machine Learning Engineer",
    "Mobile App Developer",
    "Cybersecurity Specialist"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      // Generate response based on input content
      let response;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('roadmap') || lowerInput.includes('path')) {
        const career = extractCareerFromInput(lowerInput);
        response = generateRoadmap(career);
      } else if (lowerInput.includes('skill') || lowerInput.includes('learn')) {
        response = generateSkillsAdvice(input);
      } else if (lowerInput.includes('interview') || lowerInput.includes('hire')) {
        response = generateInterviewTips(input);
      } else {
        response = generateGeneralAdvice(input);
      }
      
      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const resetConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hi there! I'm the UniCode Career AI. I can help you plan your tech career path and provide roadmaps for various tech roles. What career are you interested in exploring?",
        timestamp: new Date()
      }
    ]);
    setInput('');
    setShowSuggestions(true);
  };

  const extractCareerFromInput = (input) => {
    const careers = [
      { keywords: ['front', 'frontend', 'front-end', 'react', 'vue', 'angular', 'ui'], name: 'Frontend Developer' },
      { keywords: ['back', 'backend', 'back-end', 'server', 'api', 'node', 'django', 'express'], name: 'Backend Developer' },
      { keywords: ['full', 'fullstack', 'full-stack', 'full stack'], name: 'Full Stack Developer' },
      { keywords: ['devops', 'deployment', 'infrastructure', 'aws', 'cloud', 'docker'], name: 'DevOps Engineer' },
      { keywords: ['machine', 'ml', 'ai', 'artificial', 'data science', 'tensorflow', 'pytorch'], name: 'Machine Learning Engineer' },
      { keywords: ['mobile', 'android', 'ios', 'app', 'flutter', 'react native'], name: 'Mobile App Developer' },
      { keywords: ['cyber', 'security', 'hacker', 'ethical', 'penetration'], name: 'Cybersecurity Specialist' },
      { keywords: ['data', 'analytics', 'database', 'sql', 'hadoop', 'spark', 'big data'], name: 'Data Engineer' }
    ];

    for (const career of careers) {
      for (const keyword of career.keywords) {
        if (input.includes(keyword)) {
          return career.name;
        }
      }
    }

    return 'Software Developer'; // Default if no specific career is detected
  };

  const generateRoadmap = (career) => {
    const roadmaps = {
      'Frontend Developer': `# Frontend Developer Roadmap 🚀
      
## 1. Fundamentals (3-6 months)
- **HTML/CSS:** Master semantic HTML5 and CSS3 (including Flexbox and Grid)
- **JavaScript:** Learn core concepts, ES6+ features, and DOM manipulation
- **Responsive Design:** Make websites work on all device sizes
- **Version Control:** Learn Git and GitHub workflows

## 2. Frontend Frameworks (3-4 months)
- Choose one to start: **React**, Vue.js, or Angular
- Learn state management (Context API, Redux, Vuex, etc.)
- Component-based architecture principles
- Frontend routing and navigation

## 3. Build Tools & Performance (2-3 months)
- Package managers: npm or Yarn
- Bundlers: Webpack, Vite, or Parcel
- CSS preprocessors: SASS/SCSS
- Web performance optimization

## 4. Testing & Deployment (2 months)
- Unit testing with Jest, React Testing Library, etc.
- Learn CI/CD basics
- Static site hosting (Vercel, Netlify, GitHub Pages)

## 5. Specialization (3+ months)
- Advanced animations
- Server-side rendering (Next.js)
- PWAs and offline functionality
- Accessibility standards

## Recommended Learning Resources:
- freeCodeCamp.org (free)
- Frontend Masters (paid)
- MDN Web Docs (free)
- "You Don't Know JS" book series
- Josh Comeau's blog and courses

The entire journey typically takes 12-18 months to become job-ready, but you can start applying for junior roles after completing the fundamentals and basic framework knowledge.`,

      'Backend Developer': `# Backend Developer Roadmap 🚀

## 1. Programming Fundamentals (3-4 months)
- Choose a language: **JavaScript (Node.js)**, Python, Java, C#, Go, or Rust
- Data structures and algorithms basics
- OOP principles and design patterns
- Asynchronous programming concepts

## 2. Databases (2-3 months)
- SQL databases: PostgreSQL or MySQL
- NoSQL databases: MongoDB or Redis
- Database design and normalization
- ORM/ODM tools (Sequelize, Mongoose, etc.)

## 3. APIs & Server Development (3 months)
- RESTful API design principles
- Authentication and authorization
- Framework (Express.js, Django, Spring Boot, etc.)
- API documentation (Swagger/OpenAPI)

## 4. DevOps Basics (2 months)
- Container basics (Docker)
- CI/CD pipelines
- Deployment strategies
- Basic server management

## 5. Advanced Topics (3+ months)
- Microservices architecture
- Message queues (RabbitMQ, Kafka)
- GraphQL APIs
- Serverless architecture
- Caching strategies

## Recommended Learning Resources:
- The Odin Project (free)
- Udemy courses by Stephen Grider or Maximilian Schwarzmüller
- "Clean Code" by Robert C. Martin
- Official documentation for your chosen technology

A typical backend journey takes 12-24 months to become job-ready, depending on your prior programming experience.`,

      'Full Stack Developer': `# Full Stack Developer Roadmap 🚀

## 1. Frontend Fundamentals (3 months)
- HTML5, CSS3, and responsive design
- JavaScript ES6+ and DOM manipulation
- Basic UI/UX principles
- Frontend build tools and package managers

## 2. Backend Fundamentals (3 months)
- Choose a language: JavaScript (Node.js), Python, etc.
- RESTful API development
- Authentication and security
- Database design and queries

## 3. Database Technologies (2 months)
- SQL database (PostgreSQL or MySQL)
- NoSQL database (MongoDB)
- ORM/ODM tools
- Database optimization

## 4. Full Stack Framework (3 months)
- MERN (MongoDB, Express.js, React, Node.js) or
- MEAN (MongoDB, Express.js, Angular, Node.js) or
- Django + React or other combinations
- State management (Redux, Context API, etc.)

## 5. DevOps & Deployment (2 months)
- Version control with Git
- Docker containers
- CI/CD pipelines
- Cloud platforms (AWS, Google Cloud, or Azure)

## 6. Advanced Topics (3+ months)
- Testing strategies (unit, integration, e2e)
- GraphQL
- Websockets for real-time applications
- Progressive Web Apps
- Mobile development with React Native

## Recommended Learning Resources:
- Full Stack Open by University of Helsinki (free)
- Traversy Media on YouTube
- Academind courses
- "JavaScript: The Good Parts" by Douglas Crockford

The full stack journey typically takes 12-24 months to become proficient enough for employment.`,

      'DevOps Engineer': `# DevOps Engineer Roadmap 🚀

## 1. System Administration Basics (2-3 months)
- Linux fundamentals and bash scripting
- Networking essentials (TCP/IP, DNS, HTTP, etc.)
- Web server configuration (Nginx, Apache)
- Basic security practices

## 2. Infrastructure as Code (3 months)
- Configuration management (Ansible, Chef, or Puppet)
- Infrastructure provisioning (Terraform)
- Cloud platforms (AWS, Azure, or GCP)
- Containerization with Docker

## 3. CI/CD & Automation (2-3 months)
- CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI)
- Build automation and deployment strategies
- Testing integration
- Release management

## 4. Container Orchestration (3 months)
- Kubernetes fundamentals
- Service mesh (Istio)
- Helm charts
- Kubernetes operators

## 5. Monitoring & Observability (2 months)
- Logging systems (ELK stack)
- Monitoring tools (Prometheus, Grafana)
- Alerting systems
- APM solutions

## 6. Site Reliability Engineering (3+ months)
- SLIs, SLOs, and SLAs
- Incident response
- Chaos engineering
- Performance optimization

## Recommended Learning Resources:
- "The DevOps Handbook" by Gene Kim et al.
- A Cloud Guru courses
- KodeKloud courses
- Kubernetes documentation
- TechWorld with Nana YouTube channel

The journey to becoming a proficient DevOps engineer typically takes 12-24 months, depending on prior experience with systems administration.`,

      'Machine Learning Engineer': `# Machine Learning Engineer Roadmap 🚀

## 1. Programming & Math Foundations (3-4 months)
- Python programming and libraries (NumPy, Pandas)
- Linear algebra and calculus
- Statistics and probability
- Data structures and algorithms

## 2. Data Processing & Analysis (2-3 months)
- Data cleaning and preprocessing
- Feature engineering
- Exploratory data analysis
- Data visualization (Matplotlib, Seaborn)

## 3. Machine Learning Fundamentals (4 months)
- Supervised learning algorithms
- Unsupervised learning algorithms
- Model evaluation and validation
- Scikit-learn library

## 4. Deep Learning (3-4 months)
- Neural network architecture
- TensorFlow or PyTorch
- Convolutional and recurrent networks
- Transfer learning

## 5. MLOps & Deployment (3 months)
- Model serving and API development
- Model monitoring and maintenance
- Containerization and orchestration
- CI/CD for ML pipelines

## 6. Specialization Areas (3+ months)
- Computer vision
- Natural language processing
- Reinforcement learning
- Generative models

## Recommended Learning Resources:
- Andrew Ng's courses on Coursera
- "Hands-On Machine Learning" by Aurélien Géron
- fast.ai courses
- Kaggle competitions
- "Deep Learning" by Ian Goodfellow

The journey to becoming a machine learning engineer typically takes 18-36 months, depending on your background in mathematics and programming.`,

      'Mobile App Developer': `# Mobile App Developer Roadmap 🚀

## 1. Programming Fundamentals (2-3 months)
- Choose a path: Native (iOS/Android) or Cross-platform
- For iOS: Swift and SwiftUI
- For Android: Kotlin and Jetpack Compose
- For Cross-platform: JavaScript/TypeScript or Dart

## 2. Mobile Development Basics (3 months)
- UI components and layouts
- Navigation and app architecture
- State management
- Data persistence (local storage)

## 3. Networking & APIs (2 months)
- HTTP/REST fundamentals
- API integration
- JSON parsing
- Authentication flows

## 4. Advanced UI & UX (2-3 months)
- Animations and transitions
- Responsive layouts
- Accessibility
- Material Design or Apple Human Interface Guidelines

## 5. Mobile-Specific Features (3 months)
- Push notifications
- Geolocation and maps
- Camera and media
- Permissions handling
- Background processing

## 6. Deployment & Distribution (1-2 months)
- App store guidelines
- Build configuration
- Release management
- Analytics integration

## Recommended Learning Resources:
- For iOS: Apple Developer Documentation, Hacking with Swift
- For Android: Android Developers Documentation, Coding with Mitch
- For React Native: React Native Documentation, Wix Engineering Blog
- For Flutter: Flutter Documentation, Flutter Create

The journey to become a proficient mobile developer typically takes 12-18 months.`,

      'Cybersecurity Specialist': `# Cybersecurity Specialist Roadmap 🚀

## 1. Networking Fundamentals (2-3 months)
- TCP/IP model and protocols
- Network architecture and devices
- Firewalls and routing
- Wireshark packet analysis

## 2. Operating System Security (3 months)
- Linux and Windows security features
- Permissions and access controls
- Hardening techniques
- Virtualization security

## 3. Security Fundamentals (3-4 months)
- CIA triad and security principles
- Cryptography basics
- Authentication and authorization
- Common vulnerabilities (OWASP)

## 4. Offensive Security (3-4 months)
- Ethical hacking methodology
- Vulnerability assessment
- Penetration testing tools
- Social engineering techniques

## 5. Defensive Security (3 months)
- Security monitoring
- Incident response
- Digital forensics
- Threat intelligence

## 6. Governance & Compliance (2 months)
- Security frameworks (NIST, ISO 27001)
- Risk assessment
- Security policies and procedures
- Compliance requirements

## Recommended Learning Resources:
- TryHackMe and HackTheBox platforms
- SANS courses
- CompTIA Security+ certification materials
- "The Web Application Hacker's Handbook"
- Cybrary.it courses

The journey to become a cybersecurity specialist typically takes 18-24 months, though building practical experience is crucial and ongoing.`,

      'Data Engineer': `# Data Engineer Roadmap 🚀

## 1. Programming & Basics (3 months)
- Python or Scala programming
- SQL mastery
- Linux fundamentals
- Version control with Git

## 2. Database Systems (3-4 months)
- Relational databases (PostgreSQL, MySQL)
- NoSQL databases (MongoDB, Cassandra)
- Data modeling and normalization
- Query optimization

## 3. Big Data Technologies (4 months)
- Hadoop ecosystem
- Apache Spark
- Distributed systems concepts
- Data lakes and warehouses

## 4. Data Processing (3 months)
- ETL/ELT pipelines
- Batch vs. streaming processing
- Apache Kafka or similar
- Airflow for workflow orchestration

## 5. Cloud & Infrastructure (3 months)
- Cloud platforms (AWS, GCP, Azure)
- Infrastructure as Code
- Containers and Kubernetes
- Serverless architecture

## 6. Advanced Topics (2+ months)
- Data governance
- Security and compliance
- Performance optimization
- Real-time analytics

## Recommended Learning Resources:
- "Designing Data-Intensive Applications" by Martin Kleppmann
- DataCamp or Dataquest courses
- Cloudera or Databricks training
- Udemy courses by Frank Kane
- DataTalks.Club community

The journey to become a data engineer typically takes 12-24 months, depending on your prior database and programming experience.`,

      'Software Developer': `# General Software Developer Roadmap 🚀

## 1. Programming Fundamentals (3-4 months)
- Choose a language: JavaScript, Python, Java, C#, etc.
- Data structures and algorithms
- Object-oriented programming
- Version control with Git

## 2. Web Development Basics (3 months)
- HTML, CSS, and JavaScript
- HTTP and API concepts
- Basic frontend and backend separation
- Simple full-stack applications

## 3. Databases & Storage (2-3 months)
- SQL fundamentals
- Database design
- ORM concepts
- Basic NoSQL

## 4. Software Engineering Practices (3 months)
- Testing methodologies
- Design patterns
- Code quality and review
- Agile development

## 5. DevOps Basics (2 months)
- CI/CD concepts
- Deployment strategies
- Basic cloud services
- Containers with Docker

## 6. Specialization Path (4+ months)
- Choose an area: Web, mobile, AI/ML, gaming, etc.
- Learn framework(s) specific to your path
- Build portfolio projects
- Contribute to open source

## Recommended Learning Resources:
- freeCodeCamp or The Odin Project
- "Clean Code" by Robert C. Martin
- Harvard's CS50 course
- Language-specific documentation
- Stack Overflow and DEV.to communities

The journey to become a software developer typically takes 12-18 months of consistent learning and practice.`
    };

    return roadmaps[career] || roadmaps['Software Developer'];
  };

  const generateSkillsAdvice = (input) => {
    // This could be enhanced with more specific advice based on input analysis
    return `# Essential Skills to Focus On

## Technical Skills
- **Programming Languages:** Choose 1-2 languages to master deeply rather than learning many superficially
- **Data Structures & Algorithms:** Critical for interviews and practical problem-solving
- **Version Control:** Git is non-negotiable in modern development
- **Testing:** Learn both unit and integration testing approaches

## Soft Skills
- **Communication:** Practice explaining technical concepts to non-technical people
- **Collaboration:** Contribute to open source or group projects
- **Time Management:** Learn to estimate task completion time realistically
- **Problem-Solving:** Break down complex issues methodically

## Learning Methods
1. **Projects over tutorials:** Build real projects to solidify your knowledge
2. **Teach others:** Explaining concepts helps deepen your understanding
3. **Code review:** Get feedback on your code from experienced developers
4. **Consistency:** Daily practice is better than occasional cramming

Remember that T-shaped knowledge is valuable: deep expertise in one area with broad knowledge across related fields.

Would you like me to recommend specific learning resources for any of these skills?`;
  };

  const generateInterviewTips = (input) => {
    return `# Tech Interview Preparation Guide

## Before the Interview
- **Research the company:** Understand their products, culture, and recent news
- **Study the job description:** Identify key skills and prepare examples demonstrating them
- **Prepare your projects:** Be ready to discuss your work in detail
- **Review fundamentals:** Data structures, algorithms, and language-specific concepts

## Technical Interview Tips
- **Think aloud:** Explain your thought process as you solve problems
- **Clarify requirements:** Ask questions before diving into solutions
- **Consider edge cases:** Show thoroughness in your approach
- **Optimize gradually:** Start with a working solution, then improve it

## Behavioral Interview Preparation
- **Use the STAR method:** Situation, Task, Action, Result
- **Prepare stories:** Have 5-7 stories about challenges, failures, successes, leadership, and conflict resolution
- **Questions to ask:** Prepare thoughtful questions about the team, culture, and projects

## Common Interview Topics
1. **Coding challenges:** Practice on LeetCode, HackerRank, or CodeSignal
2. **System design:** Study scalability, database design, and architecture principles
3. **Technical trivia:** Review language-specific features and best practices
4. **Problem-solving:** Practice breaking down ambiguous problems

Remember that interviews are also an opportunity for you to evaluate the company. Look for red flags and assess if the environment aligns with your career goals.

Would you like more specific advice on any part of the interview process?`;
  };

  const generateGeneralAdvice = (input) => {
    return `# Career Development Advice

Based on your question, here are some general pointers for tech career growth:

## Finding Your Path
- **Explore before specializing:** Try different areas of tech through small projects
- **Follow your interests:** You'll excel more in areas you genuinely enjoy
- **Consider industry trends:** Balance passion with practical market demand
- **Talk to professionals:** Connect with people in roles you're interested in

## Building Experience
- **Portfolio projects:** Create projects that solve real problems
- **Open source contributions:** Great way to gain experience and visibility
- **Freelance work:** Start with small gigs to build your resume
- **Volunteer tech work:** Help non-profits while building skills

## Continuous Learning
- **Set learning goals:** Create a personal curriculum
- **Join communities:** Participate in tech forums and meetups
- **Find mentors:** Connect with experienced developers for guidance
- **Tech blogs & podcasts:** Stay current with industry developments

## Career Progression
- **Document achievements:** Keep a running list of your accomplishments
- **Develop soft skills:** Communication and teamwork are just as important as technical abilities
- **Regular self-assessment:** Review your skills gap every few months
- **Create a 5-year plan:** Set long-term goals with shorter milestones

Would you like more specific guidance on any of these areas? Or would you prefer a roadmap for a specific tech role?`;
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render markdown content as HTML with formatting
  const renderMarkdown = (content) => {
    // Simple markdown-like rendering
    // Handle headers
    let formatted = content.replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mt-3 mb-2">$1</h1>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold mt-3 mb-1">$1</h2>');
    formatted = formatted.replace(/^### (.*$)/gm, '<h3 class="text-base font-medium mt-2 mb-1">$1</h3>');
    
    // Handle lists
    formatted = formatted.replace(/^\- (.*$)/gm, '<li class="ml-4">• $1</li>');
    formatted = formatted.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4"><span class="mr-1">$1.</span> $2</li>');
    
    // Handle bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle paragraphs
    formatted = formatted.split('\n\n').map(para => {
      if (!para.startsWith('<h') && !para.startsWith('<li')) {
        return `<p class="mb-2">${para}</p>`;
      }
      return para;
    }).join('');
    
    return (
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: formatted }} />
    );
  };

  return (
    <main className="main_box h-full w-full flex flex-col">
      <div className="bg-gray-800/50 text-white p-4 shadow-md">
        <div className="flex items-center">
          <FaRobot className="text-blue-400 text-xl mr-2" />
          <h1 className="text-lg font-semibold">UniCode Career Guidance AI</h1>
        </div>
        <p className="text-gray-300 text-sm">Ask about tech career paths, roadmaps, and interview preparation</p>
      </div>
      
      <div className="flex-grow overflow-auto p-4 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, idx) => (
            <div 
              key={idx} 
              className={`mb-4 ${message.role === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
            >
              <div 
                className={`p-3 rounded-lg shadow ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                <div className="flex items-start">
                  {message.role === 'assistant' && (
                    <FaRobot className="text-blue-300 mr-2 mt-1 text-lg flex-shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <BsPersonFill className="text-blue-200 mr-2 mt-1 text-lg flex-shrink-0" />
                  )}
                  <div className="flex-grow markdown-content">
                    {message.content.includes('#') 
                      ? renderMarkdown(message.content)
                      : <p>{message.content}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="mb-4 max-w-[85%]">
              <div className="p-3 rounded-lg shadow bg-gray-700 text-white rounded-bl-none">
                <div className="flex items-center">
                  <FaRobot className="text-blue-300 mr-2" />
                  <div className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {showSuggestions && !isLoading && messages.length < 3 && (
        <div className="bg-gray-800/50 p-2 border-t border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {careerSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-700 hover:bg-gray-600 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center transition-colors"
              >
                <RiRoadMapLine className="mr-1" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-gray-800/50 p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-3xl mx-auto">
          <button
            type="button"
            onClick={resetConversation}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Reset conversation"
          >
            <FiRefreshCw />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about career paths, skills or interview preparation..."
            className="flex-grow bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            ref={inputRef}
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-full ${
              isLoading || !input.trim() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            <FiSend />
          </button>
        </form>
      </div>

      <style>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .dot {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #3b82f6;
          margin-right: 4px;
          animation: typing 1.5s infinite ease-in-out;
        }
        
        /* ...rest of your CSS... */
      `}</style>
    </main>
  );
}
