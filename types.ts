export interface Ingredient {
  id: string;
  name: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  name: string;
  cookingTime: string; // e.g., "45 daqiqa"
  difficulty: 'Oson' | 'O\'rtacha' | 'Qiyin';
  ingredients: string[];
  steps: RecipeStep[];
  calories?: number; // Only for premium
  description: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  dailyUsageCount: number;
}

export interface ClickPaymentRequest {
  click_trans_id: number;
  service_id: number;
  click_paydoc_id: number;
  merchant_trans_id: string;
  amount: number;
  action: number; // 0 for Prepare, 1 for Complete
  error: number;
  error_note: string;
  sign_time: string;
  sign_string: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  LOGIN = 'LOGIN',
  SUBSCRIPTION = 'SUBSCRIPTION'
}