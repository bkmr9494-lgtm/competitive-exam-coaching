/**
 * Chatbot Configuration File
 * This file contains configuration for AI integration and chatbot settings
 * 
 * INSTITUTE OWNERS: Edit this file to configure your chatbot
 */

// Chatbot Configuration
const chatbotConfig = {
    // Basic Settings
    botName: "AI Admission Assistant",
    welcomeMessage: "Hello! 👋 Welcome to Premium Coaching Institute. I'm your AI Admission Assistant. How can I help you today?",
    
    // Lead Capture Settings
    enableLeadCapture: true,
    leadCaptureThreshold: 0.3, // Confidence threshold below which lead capture is triggered
    
    // Quick Reply Buttons
    quickReplies: [
        "Admission Process",
        "Fee Structure",
        "Courses Offered",
        "Book Demo Class",
        "Scholarship Information",
        "Contact Admissions"
    ],
    
    // Contact Information
    contact: {
        phone: "+91-XXXXXXXXXX",
        email: "info@yourinstitute.com",
        whatsapp: "91XXXXXXXXXX"
    },
    
    // Working Hours
    workingHours: {
        weekdays: "9:00 AM - 8:00 PM",
        sunday: "10:00 AM - 5:00 PM"
    }
};

/**
 * ============================================
 * AI MODEL INTEGRATION PLACEHOLDERS
 * ============================================
 * 
 * This section contains placeholder functions for future AI integration
 * Currently, the chatbot uses a knowledge base system (chatbot-data.json)
 * 
 * To integrate with AI services, uncomment and configure the relevant section
 */

/**
 * GEMINI API INTEGRATION
 * 
 * To integrate with Google Gemini API:
 * 1. Get API key from https://makersuite.google.com/app/apikey
 * 2. Replace 'YOUR_GEMINI_API_KEY' with your actual API key
 * 3. Uncomment the function below
 * 4. Update script.js to call this function instead of processMessage()
 */
/*
async function callGeminiAPI(userMessage) {
    const API_KEY = 'YOUR_GEMINI_API_KEY';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an admission assistant for a coaching institute. Answer this query: ${userMessage}`
                    }]
                }]
            })
        });
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "I'm having trouble connecting right now. Please try again or contact our admissions team directly.";
    }
}
*/

/**
 * OPENAI API INTEGRATION
 * 
 * To integrate with OpenAI GPT API:
 * 1. Get API key from https://platform.openai.com/api-keys
 * 2. Replace 'YOUR_OPENAI_API_KEY' with your actual API key
 * 3. Uncomment the function below
 * 4. Update script.js to call this function instead of processMessage()
 */
/*
async function callOpenAIAPI(userMessage) {
    const API_KEY = 'YOUR_OPENAI_API_KEY';
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an admission assistant for a coaching institute. Provide helpful, accurate information about courses, fees, admission process, and other institute-related queries.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return "I'm having trouble connecting right now. Please try again or contact our admissions team directly.";
    }
}
*/

/**
 * CUSTOM AI API INTEGRATION
 * 
 * To integrate with a custom AI service:
 * 1. Replace the function below with your API call
 * 2. Update script.js to call this function instead of processMessage()
 */
/*
async function callCustomAIAPI(userMessage) {
    const API_URL = 'YOUR_CUSTOM_API_ENDPOINT';
    const API_KEY = 'YOUR_API_KEY';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                message: userMessage,
                context: 'coaching_institute_admission'
            })
        });
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Custom API Error:', error);
        return "I'm having trouble connecting right now. Please try again or contact our admissions team directly.";
    }
}
*/

/**
 * HYBRID CHATBOT MODE
 * 
 * This function implements the hybrid approach:
 * Priority 1: Knowledge Base Answers (chatbot-data.json)
 * Priority 2: FAQ Search
 * Priority 3: Lead Capture Form
 * Priority 4: Future AI API Integration
 * 
 * To enable AI integration, uncomment the relevant API function above
 * and set useAI to true
 */
const hybridConfig = {
    useAI: false, // Set to true to enable AI integration
    useKnowledgeBase: true, // Set to false to disable knowledge base
    useLeadCapture: true // Set to false to disable lead capture
};

/**
 * Enhanced message processing with AI integration support
 * 
 * @param {string} userMessage - The user's message
 * @param {object} knowledgeBase - The knowledge base data from chatbot-data.json
 * @returns {string} - The bot's response
 */
async function processMessageEnhanced(userMessage, knowledgeBase) {
    // Priority 1: AI Integration (if enabled)
    if (hybridConfig.useAI) {
        try {
            // Uncomment the API function you want to use
            // const aiResponse = await callGeminiAPI(userMessage);
            // const aiResponse = await callOpenAIAPI(userMessage);
            // const aiResponse = await callCustomAIAPI(userMessage);
            
            // For now, return knowledge base response
            // return aiResponse;
        } catch (error) {
            console.error('AI Error, falling back to knowledge base:', error);
        }
    }
    
    // Priority 2: Knowledge Base (if enabled)
    if (hybridConfig.useKnowledgeBase) {
        const kbResponse = searchKnowledgeBase(userMessage, knowledgeBase);
        if (kbResponse) {
            return kbResponse;
        }
    }
    
    // Priority 3: Lead Capture (if enabled and no answer found)
    if (hybridConfig.useLeadCapture) {
        return "Our Admission Team can help you further. Please provide your details so we can assist you better.";
    }
    
    // Default response
    return "I'm not sure about that. Would you like me to connect you with our admissions team?";
}

/**
 * Knowledge Base Search Function
 * 
 * Searches the knowledge base for relevant answers
 * 
 * @param {string} query - The user's query
 * @param {object} knowledgeBase - The knowledge base data
 * @returns {string|null} - The answer or null if not found
 */
function searchKnowledgeBase(query, knowledgeBase) {
    const lowerQuery = query.toLowerCase();
    
    // Search in different categories
    const categories = [
        'admission',
        'fees',
        'courses',
        'batch',
        'demo',
        'facilities',
        'faculty',
        'study_material',
        'test_series',
        'contact',
        'scholarship',
        'hostel'
    ];
    
    for (const category of categories) {
        if (knowledgeBase[category]) {
            const categoryData = knowledgeBase[category];
            
            // Check if query contains category name
            if (lowerQuery.includes(category)) {
                // Return appropriate response based on sub-category
                if (typeof categoryData === 'string') {
                    return categoryData;
                }
                
                // For objects, search for matching keys
                for (const key in categoryData) {
                    if (lowerQuery.includes(key)) {
                        if (typeof categoryData[key] === 'string') {
                            return categoryData[key];
                        }
                        // For course objects, return description
                        if (categoryData[key].description) {
                            return categoryData[key].description;
                        }
                    }
                }
                
                // If no specific match, return first string value or description
                const firstValue = Object.values(categoryData)[0];
                if (typeof firstValue === 'string') {
                    return firstValue;
                }
                if (firstValue.description) {
                    return firstValue.description;
                }
            }
        }
    }
    
    // Search FAQ
    if (knowledgeBase.faq) {
        for (const faq of knowledgeBase.faq) {
            if (lowerQuery.includes(faq.question.toLowerCase()) || 
                faq.question.toLowerCase().includes(lowerQuery)) {
                return faq.answer;
            }
        }
    }
    
    return null;
}

/**
 * Lead Capture Function
 * 
 * Captures user information when the bot cannot answer
 * 
 * @param {object} leadData - The lead information
 * @returns {boolean} - Success status
 */
function captureLead(leadData) {
    // In production, send this to your backend/server
    console.log('Lead Captured:', leadData);
    
    // Example: Send to your server
    /*
    fetch('https://your-server.com/api/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
    });
    */
    
    return true;
}

/**
 * Analytics Function
 * 
 * Track chatbot interactions for analytics
 * 
 * @param {string} eventType - Type of event (message, lead_capture, etc.)
 * @param {object} data - Event data
 */
function trackChatbotEvent(eventType, data) {
    // In production, send to your analytics service
    console.log('Chatbot Event:', eventType, data);
    
    // Example: Google Analytics
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventType, {
            'event_category': 'chatbot',
            'event_label': JSON.stringify(data)
        });
    }
    */
}

// Export configuration for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        chatbotConfig,
        hybridConfig,
        processMessageEnhanced,
        searchKnowledgeBase,
        captureLead,
        trackChatbotEvent
    };
}
