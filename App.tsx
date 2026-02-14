import React, { useState, useEffect } from 'react';
import { UserProfile, ViewState, Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import { simulatePaymentSuccess } from './services/mockClickService';

// Icons
import { ChefHat, ShoppingBag, Loader2, Sparkles, LogOut, Crown, User, ArrowRight, Menu, X } from 'lucide-react';

const Header = ({ 
  user, 
  onNavigate, 
  onLogout 
}: { 
  user: UserProfile | null, 
  onNavigate: (view: ViewState) => void,
  onLogout: () => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-olive-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(ViewState.LANDING)}>
            <div className="bg-olive text-white p-2 rounded-lg mr-2">
              <ChefHat size={24} />
            </div>
            <span className="font-heading font-bold text-xl text-olive-dark">Oshxona-AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <button 
                onClick={() => onNavigate(ViewState.LOGIN)}
                className="text-stone-600 hover:text-olive font-medium transition"
              >
                Kirish
              </button>
            ) : (
              <>
                <div className="flex items-center text-stone-700">
                  <User size={18} className="mr-2" />
                  <span className="font-medium">{user.name}</span>
                  {user.isPremium && (
                    <span className="ml-2 bg-orange-100 text-orange-dark text-xs px-2 py-0.5 rounded-full flex items-center border border-orange-200">
                      <Crown size={12} className="mr-1" /> PRO
                    </span>
                  )}
                </div>
                {!user.isPremium && (
                  <button 
                    onClick={() => onNavigate(ViewState.SUBSCRIPTION)}
                    className="bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-full text-sm font-medium transition shadow-md hover:shadow-lg flex items-center"
                  >
                    <Crown size={16} className="mr-1" /> Premium oling
                  </button>
                )}
                <button 
                  onClick={onLogout}
                  className="text-stone-400 hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-4 shadow-lg">
           {!user ? (
              <button 
                onClick={() => { onNavigate(ViewState.LOGIN); setIsMenuOpen(false); }}
                className="block w-full text-left text-stone-600 font-medium py-2"
              >
                Kirish
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between text-stone-700 py-2 border-b border-stone-100">
                  <span className="font-medium flex items-center"><User size={18} className="mr-2"/> {user.name}</span>
                  {user.isPremium && <span className="text-orange text-xs font-bold">PRO</span>}
                </div>
                {!user.isPremium && (
                  <button 
                    onClick={() => { onNavigate(ViewState.SUBSCRIPTION); setIsMenuOpen(false); }}
                    className="w-full bg-orange text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Premium oling
                  </button>
                )}
                <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="block w-full text-left text-red-500 font-medium py-2"
                >
                  Chiqish
                </button>
              </>
            )}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none">
       <div className="absolute top-0 right-0 w-96 h-96 bg-olive rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-olive-dark mb-6 leading-tight">
          Bor masalliqdan <span className="text-orange">shohona taom</span> yarating
        </h1>
        <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed">
          Muzlatgichingizda nima borligini ayting, Oshxona-AI sizga o'zbek milliy va zamonaviy taomlar retseptini taqdim etadi. Ortiqcha ovora bo'lmang!
        </p>
        <button 
          onClick={onGetStarted}
          className="bg-olive hover:bg-olive-dark text-white text-lg font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto"
        >
          Boshlash <ArrowRight className="ml-2" />
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Aqlli Retseptlar", desc: "GPT-4o (Gemini) texnologiyasi asosida noyob retseptlar.", icon: <Sparkles className="text-orange" /> },
          { title: "Milliy va Zamonaviy", desc: "Palovdan tortib, tez tayyorlanadigan salatlargacha.", icon: <ChefHat className="text-olive" /> },
          { title: "Tejamkorlik", desc: "Bor mahsulotlarni isrof qilmasdan mazali taom tayyorlang.", icon: <ShoppingBag className="text-stone-600" /> },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-stone-100 hover:border-olive-light/30 transition">
            <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-4 text-2xl">
              {item.icon}
            </div>
            <h3 className="text-xl font-heading font-bold text-stone-800 mb-2">{item.title}</h3>
            <p className="text-stone-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const IngredientInput = ({ onSubmit, loading }: { onSubmit: (ings: string[]) => void, loading: boolean }) => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = () => {
    if (input.trim()) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 md:p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-heading font-bold text-olive-dark mb-4 text-center">Masalliqlarni kiriting</h2>
      <p className="text-stone-500 text-center mb-6">Muzlatgichda nima bor? Masalan: Go'sht, piyoz, sabzi...</p>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Mahsulot nomi..."
          className="flex-1 border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent"
        />
        <button 
          onClick={addIngredient}
          className="bg-stone-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-900 transition"
        >
          Qo'shish
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 min-h-[50px]">
        {ingredients.map((ing, idx) => (
          <span key={idx} className="bg-olive-light/10 text-olive-dark border border-olive-light/30 px-3 py-1.5 rounded-full flex items-center text-sm font-medium">
            {ing}
            <button onClick={() => removeIngredient(idx)} className="ml-2 hover:text-red-500"><X size={14} /></button>
          </span>
        ))}
        {ingredients.length === 0 && (
          <span className="text-stone-400 italic text-sm py-2">Hozircha hech narsa kiritilmadi...</span>
        )}
      </div>

      <button
        onClick={() => onSubmit(ingredients)}
        disabled={loading || ingredients.length === 0}
        className={`w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition flex items-center justify-center ${
          loading || ingredients.length === 0 
            ? 'bg-stone-300 cursor-not-allowed' 
            : 'bg-orange hover:bg-orange-dark hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Retseptlar izlanmoqda...
          </>
        ) : (
          <>
            Retseptlarni Ko'rish <ChefHat className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

const RecipeCard: React.FC<{ recipe: Recipe, isPremium: boolean }> = ({ recipe, isPremium }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-stone-100 hover:shadow-xl transition duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${
              recipe.difficulty === 'Oson' ? 'bg-green-100 text-green-700' :
              recipe.difficulty === 'O\'rtacha' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              {recipe.difficulty}
            </span>
            <h3 className="text-xl font-heading font-bold text-stone-800">{recipe.name}</h3>
          </div>
          <div className="text-right">
            <span className="block text-sm text-stone-500">{recipe.cookingTime}</span>
            {isPremium && recipe.calories && (
               <span className="block text-xs font-bold text-orange mt-1">{recipe.calories} kkal</span>
            )}
          </div>
        </div>
        
        <p className="text-stone-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="mb-4">
          <h4 className="font-bold text-sm text-stone-700 mb-2">Masalliqlar:</h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 5).map((ing, i) => (
              <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md">{ing}</span>
            ))}
            {recipe.ingredients.length > 5 && (
              <span className="text-xs text-stone-400 px-2 py-1">+ yana {recipe.ingredients.length - 5} ta</span>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-stone-100 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-stone-700 mb-2">Tayyorlash jarayoni:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-stone-600">
              {recipe.steps.map((step) => (
                <li key={step.stepNumber} className="pl-2">
                  <span className="font-medium text-stone-800">Qadam {step.stepNumber}:</span> {step.instruction}
                </li>
              ))}
            </ol>
          </div>
        )}

        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 text-olive font-medium text-sm hover:underline flex items-center justify-center"
        >
          {expanded ? "Yashirish" : "To'liq ko'rish"}
        </button>
      </div>
    </div>
  );
};

const SubscriptionModal = ({ onClose, onSubscribe }: { onClose: () => void, onSubscribe: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate Click API call
    await simulatePaymentSuccess("current_user_id");
    setLoading(false);
    onSubscribe();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 text-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold text-stone-800">Oshxona-AI Premium</h2>
          <p className="text-stone-500 mt-2">Cheklovlarsiz mazali hayot!</p>
        </div>

        <ul className="space-y-4 mb-8">
          {[
            "Cheksiz retseptlar generatsiyasi",
            "Har bir taom uchun kaloriya hisobi",
            "Murakkab va bayramona taomlar",
            "Retseptlarni saqlab qo'yish"
          ].map((feature, i) => (
            <li key={i} className="flex items-center text-stone-700">
              <span className="w-5 h-5 bg-olive text-white rounded-full flex items-center justify-center text-xs mr-3">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6 text-center">
          <span className="text-3xl font-bold text-stone-800">15,000 so'm</span>
          <span className="text-stone-500 text-sm"> / oyiga</span>
        </div>

        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-[#00AEEF] hover:bg-[#009bd6] text-white py-3.5 rounded-xl font-bold transition shadow-md flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Click orqali to'lash"}
        </button>
        <p className="text-center text-xs text-stone-400 mt-3">Xavfsiz to'lov Click.uz orqali amalga oshiriladi</p>
      </div>
    </div>
  );
};

const AuthView = ({ onLogin }: { onLogin: (user: UserProfile) => void }) => {
  const [email, setEmail] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Supabase Auth
    onLogin({
      id: 'user-123',
      email: email,
      name: email.split('@')[0] || 'Foydalanuvchi',
      isPremium: false,
      dailyUsageCount: 0
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 max-w-sm w-full">
        <h2 className="text-2xl font-heading font-bold text-center mb-6 text-olive-dark">Xush kelibsiz</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Parol</label>
            <input 
              type="password" 
              required
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-olive hover:bg-olive-dark text-white font-bold py-3 rounded-xl transition">
            Kirish
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-stone-500">Yoki</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => onLogin({id: 'google-user', email: 'test@gmail.com', name: 'Google User', isPremium: false, dailyUsageCount: 0})}
            className="mt-4 w-full border border-stone-300 bg-white text-stone-700 font-medium py-2.5 rounded-xl hover:bg-stone-50 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google orqali
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check local storage for persistent auth (Mock)
    const storedUser = localStorage.getItem('oshxona_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView(ViewState.DASHBOARD);
    }
  }, []);

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('oshxona_user', JSON.stringify(newUser));
    setView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setRecipes([]);
    localStorage.removeItem('oshxona_user');
    setView(ViewState.LANDING);
  };

  const handleGenerate = async (ingredients: string[]) => {
    if (!user) {
      setView(ViewState.LOGIN);
      return;
    }

    // Free tier limit check
    if (!user.isPremium && user.dailyUsageCount >= 3) {
      alert("Bepul foydalanish limiti tugadi. Davom etish uchun Premium oling!");
      setView(ViewState.SUBSCRIPTION);
      return;
    }

    setLoading(true);
    try {
      const generated = await generateRecipes(ingredients, user);
      setRecipes(generated);
      
      // Update usage count
      const updatedUser = { ...user, dailyUsageCount: user.dailyUsageCount + 1 };
      setUser(updatedUser);
      localStorage.setItem('oshxona_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('oshxona_user', JSON.stringify(updatedUser));
      alert("Tabriklaymiz! Siz Premium a'zosiga aylandingiz.");
      setView(ViewState.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Header 
        user={user} 
        onNavigate={setView} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {view === ViewState.LANDING && (
          <Hero onGetStarted={() => setView(user ? ViewState.DASHBOARD : ViewState.LOGIN)} />
        )}

        {view === ViewState.LOGIN && (
          <AuthView onLogin={handleLogin} />
        )}

        {view === ViewState.DASHBOARD && (
          <div className="space-y-12 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-olive-dark">Bugun nima pishiramiz?</h1>
              <p className="text-stone-500 mt-2">Muzlatgichingizni tekshiring va bizga ayting</p>
            </div>
            
            <IngredientInput onSubmit={handleGenerate} loading={loading} />

            {recipes.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h2 className="text-2xl font-heading font-bold text-stone-800 mb-6 border-b border-stone-200 pb-2">
                  Siz uchun maxsus retseptlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} isPremium={user?.isPremium || false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === ViewState.SUBSCRIPTION && (
          <div className="flex items-center justify-center min-h-[60vh]">
             <SubscriptionModal onClose={() => setView(ViewState.DASHBOARD)} onSubscribe={handleSubscribe} />
          </div>
        )}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2 font-heading text-stone-200 font-bold">Oshxona-AI</p>
          <p className="text-sm">© 2024 Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}