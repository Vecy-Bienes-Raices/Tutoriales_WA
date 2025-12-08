import React from 'react';
import { Star, Smartphone, Monitor } from 'lucide-react';

interface IntroScreenProps {
    setMode: (mode: 'intro' | 'mobile' | 'desktop') => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ setMode }) => (
    <div className="h-full bg-slate-100 font-sans overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl max-w-lg w-full transform transition-all hover:scale-[1.01] animate-in fade-in zoom-in duration-500">

                {/* ÍCONO DE ESTRELLA DESTACADO */}
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-green-200 shadow-xl ring-4 ring-green-50">
                    <Star size={48} fill="white" className="drop-shadow-md animate-pulse" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">Administradores de Grupo</h1>
                <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6">Cómo activar "La estrella ⭐ DESTACAR"</h2>

                <p className="text-slate-600 mb-8 text-base sm:text-lg leading-relaxed">
                    Si los <strong>Mensajes temporales</strong> están activos en el grupo que administras, la opción de <strong>La estrella ⭐ DESTACAR</strong> desaparece.
                    <br /><br />
                    Selecciona tu dispositivo para aprender a desactivarlos y recuperarla:
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => setMode('mobile')}
                        className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 p-5 rounded-2xl transition-all group shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <div className="bg-slate-100 p-3 rounded-full group-hover:bg-white transition-colors">
                            <Smartphone className="text-slate-500 group-hover:text-green-600" size={24} />
                        </div>
                        <div className="text-left flex-1">
                            <span className="block font-bold text-slate-700 group-hover:text-green-700 text-lg">Modo Celular</span>
                            <span className="text-slate-400 text-sm group-hover:text-green-600/70">iPhone / Android</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setMode('desktop')}
                        className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 p-5 rounded-2xl transition-all group shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <div className="bg-slate-100 p-3 rounded-full group-hover:bg-white transition-colors">
                            <Monitor className="text-slate-500 group-hover:text-green-600" size={24} />
                        </div>
                        <div className="text-left flex-1">
                            <span className="block font-bold text-slate-700 group-hover:text-green-700 text-lg">Modo Computador</span>
                            <span className="text-slate-400 text-sm group-hover:text-green-600/70">WhatsApp Web / App</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default IntroScreen;
