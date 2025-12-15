import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
// Note: In a real production app, you should proxy requests through a backend
// to avoid exposing the API key if not using a secure environment variable injection system.
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey });

export const getChefAdvice = async (
  query: string,
  cartItems: CartItem[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct context based on cart
    let context = "Bạn là một đầu bếp chuyên nghiệp 5 sao chuyên về hải sản Việt Nam và Quốc tế. Hãy trả lời ngắn gọn, thân thiện.";
    
    if (cartItems.length > 0) {
      const itemsList = cartItems.map(item => item.name).join(", ");
      context += `\nNgười dùng hiện có các nguyên liệu sau trong giỏ hàng: ${itemsList}.`;
    } else {
      context += `\nNgười dùng chưa chọn mua gì.`;
    }

    const prompt = `${context}\n\nCâu hỏi của người dùng: "${query}"\n\nHãy đưa ra gợi ý món ăn hoặc công thức nấu ăn phù hợp.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Xin lỗi, tôi không thể nghĩ ra công thức ngay lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đang có sự cố kết nối với đầu bếp AI. Vui lòng thử lại sau.";
  }
};