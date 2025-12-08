import React from 'react';
import { Check, Bookmark, Star, RefreshCcw } from 'lucide-react';

interface SuccessMessageProps {
    onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 sm:p-12 bg-white text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Check size={48} className="text-green-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">¡Solucionado!</h2>
        <p className="text-slate-600 mb-8 max-w-sm text-lg">
            Al desactivar los mensajes temporales, la estrella ⭐ <strong className="font-bold">DESTACAR</strong> vuelve a estar disponible para todos.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full mb-8 shadow-inner">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 opacity-60">
                <span className="text-sm font-medium text-slate-500">Antes</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 font-bold">TEMPORALES ON</span>
                    <Bookmark size={24} className="text-slate-400" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-700">Ahora</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">TEMPORALES OFF</span>
                    <Star size={32} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                </div>
            </div>
        </div>

        <button
            onClick={onReset}
            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-green-200 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <RefreshCcw size={18} />
            Volver al inicio
        </button>
    </div>
);

export default SuccessMessage;
