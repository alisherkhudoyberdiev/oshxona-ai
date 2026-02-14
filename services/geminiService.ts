import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, UserProfile } from "../types";

// NOTE: In a real Next.js app, this would be a server-side call.
// Since this is a client-side demo, we use the key directly.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRecipes = async (
  ingredients: string[], 
  user: UserProfile
): Promise<Recipe[]> => {
  const ai = getClient();
  const isPremium = user.isPremium;

  const prompt = `
    Siz o'zbek milliy taomlari va zamonaviy oshxona bo'yicha ekspert oshpazsiz.
    Foydalanuvchida quyidagi mahsulotlar bor: ${ingredients.join(", ")}.
    
    Ushbu mahsulotlardan foydalanib, 3 ta retsept taklif qiling.
    Kamida bittasi o'zbek milliy taomi bo'lishi kerak.
    Agar mahsulotlar yetarli bo'lmasa, uyda topilishi oson bo'lgan qo'shimcha mahsulotlarni qo'shishingiz mumkin.
    
    Javobni faqat JSON formatida qaytaring.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Efficient model for JSON tasks
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Taom nomi" },
              description: { type: Type.STRING, description: "Qisqacha ta'rif (ishtahani ochuvchi)" },
              cookingTime: { type: Type.STRING, description: "Pishirish vaqti (masalan, 45 daqiqa)" },
              difficulty: { type: Type.STRING, enum: ["Oson", "O'rtacha", "Qiyin"] },
              ingredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Kerakli masalliqlar ro'yxati"
              },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER },
                    instruction: { type: Type.STRING }
                  }
                }
              },
              calories: { type: Type.INTEGER, description: "Bir porsiya uchun kaloriya (taxminiy)" }
            },
            required: ["name", "cookingTime", "difficulty", "ingredients", "steps", "description"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      // Clean up data based on premium status if necessary
      // Note: We requested calories in JSON, but purely in frontend logic we can hide it
      return data.map((r: any, index: number) => ({
        ...r,
        id: `recipe-${Date.now()}-${index}`,
        // If not premium, we might hide calories in UI, but AI returns it.
        calories: isPremium ? r.calories : undefined 
      }));
    }
    return [];
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Retseptlarni yaratishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
  }
};