import { ClickPaymentRequest } from "../types";

/**
 * BU FAYL SERVER TOMONDA (Next.js API Routes) QANDAY YOZILISHI KERAKLIGINI KO'RSATADI.
 * Client-side demo uchun biz buni faqat simulyatsiya qilamiz.
 * 
 * Reference implementation for /api/payment/click
 */

const CLICK_SECRET_KEY = "bu_yerda_maxfiy_kalit_boladi";
const SERVICE_ID = 12345;

export const handleClickRequest = (data: ClickPaymentRequest) => {
  // 1. Check sign signature (MD5 hash check usually)
  // const mySign = md5(click_trans_id + service_id + secret_key + merchant_trans_id + amount + action + sign_time);
  // if (data.sign_string !== mySign) return { error: -1, error_note: 'Sign check failed' };

  // 2. Action 0: Prepare (Foydalanuvchini tekshirish)
  if (data.action === 0) {
    // Database check: Does user exist?
    // const user = await db.users.find(data.merchant_trans_id);
    // if (!user) return { error: -5, error_note: 'User not found' };

    return {
      click_trans_id: data.click_trans_id,
      merchant_trans_id: data.merchant_trans_id,
      merchant_prepare_id: Math.floor(Math.random() * 100000), // Transaction ID in our system
      error: 0,
      error_note: 'Success'
    };
  }

  // 3. Action 1: Complete (To'lovni tasdiqlash)
  if (data.action === 1) {
    // Database update: Set user to premium
    // await db.users.update({ id: data.merchant_trans_id }, { is_premium: true });
    
    return {
      click_trans_id: data.click_trans_id,
      merchant_trans_id: data.merchant_trans_id,
      merchant_confirm_id: Math.floor(Math.random() * 100000),
      error: 0,
      error_note: 'Success'
    };
  }

  return { error: -3, error_note: 'Action not found' };
};

// Client-side helper to simulate payment success
export const simulatePaymentSuccess = async (userId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Payment processed for user: ${userId} via Click.uz`);
      resolve(true);
    }, 2000);
  });
};