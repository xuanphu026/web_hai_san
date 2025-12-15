import React, { useState, useEffect, useRef } from 'react';
import { getChefAdvice } from '../services/geminiService';
import { CartItem, ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChefAssistantProps {
  cartItems: CartItem[];
}

export const ChefAssistant: React.FC<ChefAssistantProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Xin chào! 👨‍🍳 Tôi là Đầu Bếp AI.\nBạn muốn tôi gợi ý món ăn gì từ **Tôm, Cua, Cá** không?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Get AI response
    const responseText = await getChefAdvice(textToSend, cartItems);
    
    // Add AI message
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const suggestBasedOnCart = () => {
    const query = "Gợi ý món ăn ngon từ những gì tôi có trong giỏ hàng";
    handleSend(query);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-red-500 rotate-45' : 'bg-ocean-600'
        } text-white`}
      >
        {isOpen ? <i className="fas fa-plus text-xl"></i> : <i className="fas fa-utensils text-xl"></i>}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 h-[500px]' : 'opacity-0 scale-50 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-ocean-600 p-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
             <i className="fas fa-hat-chef text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold">Đầu Bếp AI</h3>
            <p className="text-xs text-ocean-100">Gợi ý công thức & Mẹo vặt</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[90%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-ocean-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  <div className="prose prose-sm max-w-none text-gray-800">
                    <ReactMarkdown 
                      components={{
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mt-1 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mt-1 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        strong: ({node, ...props}) => <span className="font-bold text-ocean-700" {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 text-ocean-800" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1 text-ocean-600" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none flex space-x-2">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Suggestions */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button 
              onClick={() => suggestBasedOnCart()}
              className="inline-flex items-center space-x-1 bg-white border border-ocean-200 text-ocean-600 px-3 py-1 rounded-full text-xs hover:bg-ocean-50 mr-2"
            >
              <i className="fas fa-magic"></i>
              <span>Nấu gì với giỏ hàng?</span>
            </button>
            <button 
               onClick={() => handleSend("Cách làm tôm hấp bia")}
              className="inline-flex items-center space-x-1 bg-white border border-ocean-200 text-ocean-600 px-3 py-1 rounded-full text-xs hover:bg-ocean-50"
            >
              <span>Cách làm tôm hấp bia</span>
            </button>
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi về cách chế biến..."
            className="flex-grow px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-ocean-600 text-white flex items-center justify-center hover:bg-ocean-700 disabled:opacity-50 transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};