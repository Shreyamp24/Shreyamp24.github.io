// AI Chatbot JavaScript
class PortfolioChatbot {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.responses = {
            greetings: [
                'Hello! Welcome to Shreya\'s portfolio. I\'m here to help you explore her work and achievements.',
                'Hi there! I can guide you through Shreya\'s portfolio and answer any questions you might have.',
                'Greetings! Feel free to ask me about Shreya\'s skills, projects, experience, or education.',
                'Welcome! I\'m your portfolio assistant. Let me help you discover Shreya\'s amazing work!'
            ],
            skills: [
                'Shreya is proficient in Python, SQL, Machine Learning, Artificial Intelligence, Excel, HTML, Java, Neural Networks, Data Annotation, NumPy, Pandas, Flask, Matplotlib, and ROS. She has strong foundations in both theoretical and practical aspects of AI/ML.',
                'Her technical expertise includes programming languages (Python, Java, HTML), machine learning frameworks (TensorFlow, PyTorch), data science tools (Pandas, NumPy, Matplotlib), and robotics (ROS). She\'s also skilled in database management with SQL and web development with Flask.',
                'Shreya\'s skill set spans the full AI/ML pipeline - from data collection and annotation to model development and deployment. She\'s particularly strong in Python programming, statistical analysis, and neural network architectures.'
            ],
            projects: [
                'Shreya has developed 4 impressive projects: 1) Sentiment Analysis for Stock Market Prediction using NLP, 2) Artificial Neural Network for Robot Kinematics using Python and ROS, 3) RouteRover Traffic Optimization System using ML and web technologies, and 4) Farmers Database Management System using Flask and MySQL. Each project demonstrates her versatility across different AI domains.',
                'Her project portfolio showcases expertise in NLP (sentiment analysis), robotics (kinematics), traffic optimization (ML), and database management. She uses technologies like Python, ROS, Flask, MySQL, and modern web frameworks to build comprehensive solutions.',
                'From financial market prediction to agricultural database management, Shreya\'s projects cover diverse real-world applications. She combines machine learning, web development, and robotics to create impactful solutions.'
            ],
            experience: [
                'Shreya has gained valuable industry experience through multiple internships: At NASSCOM as Data Analytics Intern (2025-Present), Samsung Innovation Campus as AI/ML Developer (2024), Samsung as Data Annotation Intern (2024), and Innovative Sherphere as Data Science Intern (2024). This experience spans data analytics, AI development, and data science across leading tech companies.',
                'Her professional journey includes working with industry leaders like Samsung and NASSCOM. She\'s applied her skills in real-world scenarios including data annotation for computer vision, AI/ML project development, data analytics with statistical techniques, and data science applications.',
                'Through these internships, Shreya has hands-on experience in data preprocessing, model development, statistical analysis, and collaborative problem-solving. She\'s worked on actual projects that impact business operations and product development.'
            ],
            education: [
                'Shreya is currently pursuing B.E. in Artificial Intelligence & Machine Learning at Cambridge Institute of Technology, Bangalore (2021-2025) with an impressive 8.41 CGPA (84.1%). She completed her PUC at Krupanidhi PU College, Bangalore (2019-2021) with 86.5%, and SSLC at HAL East Primary and Girls High School, Bangalore (2018-2019) with 88.96%.',
                'Her academic journey shows consistent excellence with scores above 84% throughout. She chose to specialize in AI & Machine Learning, demonstrating her early passion for the field. Her strong academic foundation supports her practical skills in AI development.',
                'Shreya\'s educational background is perfectly aligned with her career goals in AI/ML. The combination of theoretical knowledge from Cambridge Institute of Technology and practical skills through internships makes her a well-rounded AI professional.'
            ],
            contact: [
                'You can connect with Shreya via email at shreyamp2003@gmail.com or call her at +91 8317349035. She\'s based in Bangalore, India and is always open to exciting tech collaborations. You can also find her on LinkedIn and GitHub - the links are in the portfolio footer.',
                'Shreya welcomes professional connections and collaboration opportunities. Whether you want to discuss AI projects, share opportunities, or just connect professionally, she\'s reachable through multiple channels. Her social media profiles are linked in the footer section.',
                'Feel free to reach out to Shreya for any AI/ML projects, internships, or collaborative opportunities. She\'s particularly interested in innovative tech projects that push the boundaries of AI and machine learning applications.'
            ],
            about: [
                'Shreya M P is a passionate 21-year-old AI & ML Engineering student with exceptional hands-on experience in data science, market research, and AI solutions. She has an IEEE publication in traffic optimization and extensive internship experience at Samsung, DISQ Aspire, and NASSCOM. Her technical skills span Python, machine learning, data cleaning, and annotation.',
                'Beyond her technical skills, Shreya is an innovator with a publication in traffic optimization systems. She combines academic excellence with practical industry experience, making her a standout AI professional. Her work spans from robotics to financial market prediction.',
                'Shreya represents the new generation of AI professionals who bridge theoretical knowledge with practical application. Her diverse experience across different companies and projects shows her adaptability and continuous learning mindset in the rapidly evolving AI field.'
            ],
            default: [
                'I can help you explore Shreya\'s portfolio in detail. Try asking about her skills, projects, experience, education, or contact information. I can also navigate you to specific sections - just mention what you\'d like to see!',
                'I\'m here to guide you through Shreya\'s professional journey. You can ask me anything about her background, and I\'ll either provide detailed information or take you directly to the relevant section.',
                'Feel free to explore! Ask me about Shreya\'s technical skills, her impressive projects, her industry experience, or her educational background. I can provide detailed answers and show you the exact sections in her portfolio.'
            ]
        };
    }

    init() {
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbot = document.getElementById('chatbot');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
        this.chatMessages = document.getElementById('chatbot-messages');
    }

    setupEventListeners() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());

        // Send message
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.chatbotContainer.contains(e.target) && this.chatbot.classList.contains('active')) {
                this.closeChatbot();
            }
        });
    }

    toggleChatbot() {
        this.chatbot.classList.toggle('active');
        if (this.chatbot.classList.contains('active')) {
            this.chatInput.focus();
        }
    }

    closeChatbot() {
        this.chatbot.classList.remove('active');
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process and respond
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            
            // Auto-navigate if response suggests it
            this.handleNavigation(message);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageP = document.createElement('p');
        messageP.textContent = message;
        messageDiv.appendChild(messageP);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-container';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator-container');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords and generate appropriate response
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            return this.getRandomResponse('skills');
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
            return this.getRandomResponse('projects');
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('intern') || lowerMessage.includes('job')) {
            return this.getRandomResponse('experience');
        } else if (lowerMessage.includes('education') || lowerMessage.includes('college') || lowerMessage.includes('degree')) {
            return this.getRandomResponse('education');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return this.getRandomResponse('contact');
        } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('shreya')) {
            return this.getRandomResponse('about');
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.getRandomResponse('greetings');
        } else {
            return this.getRandomResponse('default');
        }
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleNavigation(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            this.navigateToSection('skills');
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            this.navigateToSection('work');
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('intern')) {
            this.navigateToSection('experience');
        } else if (lowerMessage.includes('education') || lowerMessage.includes('college')) {
            this.navigateToSection('education');
        } else if (lowerMessage.includes('contact')) {
            this.navigateToSection('footer');
        } else if (lowerMessage.includes('about')) {
            this.navigateToSection('about');
        } else if (lowerMessage.includes('home')) {
            this.navigateToSection('home');
        }
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Add a subtle highlight effect
            section.style.transition = 'background-color 0.3s ease';
            section.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
            setTimeout(() => {
                section.style.backgroundColor = '';
            }, 2000);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
