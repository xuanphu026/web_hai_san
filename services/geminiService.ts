import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey });

export const getChefAdvice = async (
  query: string,
  cartItems: CartItem[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct context based on cart
    let context = "Bạn là một đầu bếp chuyên nghiệp 5 sao chuyên về hải sản Việt Nam và Quốc tế. Phong cách trả lời: Thân thiện, nhiệt tình, sử dụng các biểu tượng cảm xúc (emoji) phù hợp.";
    
    if (cartItems.length > 0) {
      const itemsList = cartItems.map(item => item.name).join(", ");
      context += `\nNgười dùng hiện có các nguyên liệu sau trong giỏ hàng: ${itemsList}.`;
    } else {
      context += `\nNgười dùng chưa chọn mua gì.`;
    }

    const prompt = `${context}\n\nCâu hỏi của người dùng: "${query}"\n\nYêu cầu:\n1. Nếu là công thức nấu ăn, hãy trình bày rõ ràng với phần "Nguyên liệu" (dùng gạch đầu dòng) và "Cách làm" (dùng số thứ tự).\n2. Sử dụng định dạng Markdown (in đậm, danh sách) để bài viết dễ đọc.\n3. Nếu không liên quan đến ẩm thực/hải sản, hãy từ chối khéo léo.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Xin lỗi, bếp trưởng đang bận, bạn thử hỏi lại nhé!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đang có sự cố kết nối với đầu bếp AI. Vui lòng kiểm tra mạng hoặc thử lại sau.";
  }
};