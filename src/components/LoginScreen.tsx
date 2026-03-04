import React, { useState, useEffect } from 'react';

interface LoginScreenProps {
  onLogin: (pin: string) => void;
  onGoogleLogin: () => void;
  isLoading: boolean;
  isFirebaseAvailable: boolean;
  userProfile?: {
    email: string;
    pin: string;
    avatarUrl?: string;
  };
  pinError?: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoogleLogin, isLoading, isFirebaseAvailable, userProfile, pinError }) => {
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (pinError) {
      setPin('');
    }
  }, [pinError]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      onLogin(pin);
    }
  };

  const isGoogleAuthenticated = !!userProfile?.email;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="h-20 w-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20 text-amber-500 shadow-2xl">
            {isGoogleAuthenticated && userProfile?.avatarUrl ? (
              <img src={userProfile.avatarUrl} alt="Avatar" className="h-full w-full object-cover rounded-3xl" referrerPolicy="no-referrer" />
            ) : (
              <i className="fa-solid fa-gem text-3xl"></i>
            )}
          </div>
          <h1 className="text-white font-black text-4xl uppercase tracking-tighter">OASIS</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Fundo de Arte Mobile</p>
        </div>

        {!isFirebaseAvailable && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-500 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            Firebase não configurado. Algumas funções podem estar limitadas.
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          <div className="space-y-4">
            {!isGoogleAuthenticated ? (
              <button 
                onClick={onGoogleLogin}
                disabled={isLoading || !isFirebaseAvailable}
                className="w-full bg-white border border-slate-300 rounded-full py-3.5 px-6 flex items-center justify-center gap-3 text-slate-700 font-medium text-sm hover:bg-gray-50 transition-all active:scale-95 shadow-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com o Google
              </button>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Conectado como</p>
                <p className="text-white font-black text-xs truncate px-4">{userProfile.email}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-amber-500 text-[9px] font-black uppercase tracking-widest hover:underline"
                >
                  Trocar conta
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-slate-800"></div>
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                {isGoogleAuthenticated ? 'SEGURANÇA' : 'OU PIN'}
              </span>
              <div className="h-[1px] flex-1 bg-slate-800"></div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="space-y-4">
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest text-center">
                  {userProfile?.pin ? 'Insira seu PIN de acesso' : 'Defina seu PIN de 4 dígitos'}
                </p>
                
                <div className="flex justify-center gap-3 relative h-16">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`h-14 w-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${pin.length > idx ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105' : 'border-slate-800 bg-slate-950'}`}>
                      {pin.length > idx && (
                        <span className="text-amber-500 text-2xl font-black animate-in zoom-in duration-300">
                          *
                        </span>
                      )}
                    </div>
                  ))}
                  
                  <input 
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    autoFocus
                    value={pin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setPin(val);
                      if (val.length === 4) {
                        setTimeout(() => {
                          onLogin(val);
                        }, 300);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-default z-10 w-full h-full"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading || pin.length !== 4}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'PROCESSANDO...' : (userProfile?.pin ? 'DESBLOQUEAR' : 'CADASTRAR PIN')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
