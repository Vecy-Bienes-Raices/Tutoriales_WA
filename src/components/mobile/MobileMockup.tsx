import React from 'react';
import {
    ArrowLeft, Video, Phone, MoreVertical, Check,
    Star, Search, Clock, ChevronRight
} from 'lucide-react';
import Highlighter from '../common/Highlighter';
import SuccessMessage from '../common/SuccessMessage';

interface MobileMockupProps {
    step: number;
    handleNextStep: () => void;
    showHighlight: boolean;
    resetTutorial: () => void;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ step, handleNextStep, showHighlight, resetTutorial }) => {
    return (
        <div className="flex justify-center items-center h-full w-full bg-slate-200 p-4 font-sans overflow-hidden">
            {/* Responsive Mobile Container: Uses h-full to fill available flex space without overflowing */}
            <div className="w-full max-w-[360px] h-full max-h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-slate-800 relative flex flex-col shrink-0 ring-4 ring-black/5">

                {/* Status Bar Mock */}
                <div className="bg-[#075E54] h-8 w-full flex justify-between items-center px-6 flex-shrink-0 z-30 pt-2">
                    {/* Dynamic Notch/Island Mock */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl"></div>
                    <div className="flex gap-1.5 pt-1">
                        <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                    </div>
                    {/* Signal/Battery Mock */}
                    <div className="flex gap-1 pt-1 opacity-80">
                        <div className="w-3 h-3 border border-white rounded-sm"></div>
                    </div>
                </div>

                {/* Screen Content Switcher */}
                {step === 0 && (
                    <div className="flex flex-col h-full bg-[#efe7dd]">
                        {/* Header */}
                        <Highlighter
                            active={true}
                            showHighlight={showHighlight}
                            onClick={handleNextStep}
                            className="bg-[#075E54] text-white py-2 px-3 flex items-center gap-2 shadow-md cursor-pointer flex-shrink-0"
                        >
                            <ArrowLeft size={22} />
                            <div className="w-9 h-9 bg-slate-300 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
                                <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold">G</div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-base truncate leading-tight">Grupo de Trabajo</h3>
                                <p className="text-xs text-green-100 truncate opacity-90">Tú, Ana, Carlos, Diana...</p>
                            </div>
                            <div className="flex gap-3">
                                <Video size={22} />
                                <Phone size={20} />
                                <MoreVertical size={20} />
                            </div>
                        </Highlighter>

                        {/* Chat Area */}
                        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 relative scrollbar-hide">
                            {/* Chat Background Pattern Mock (CSS-based now) */}
                            <div
                                className="absolute inset-0 opacity-[0.4] pointer-events-none bg-chat-pattern"
                            ></div>

                            <div className="bg-[#dcf8c6] p-2.5 rounded-lg self-end max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] text-sm z-10">
                                <p className="text-slate-800">¿Por qué no me deja destacar el mensaje de la reunión?</p>
                                <span className="text-[10px] text-gray-500 flex justify-end items-center gap-1 mt-1">10:30 AM <Check size={14} className="text-blue-500" /></span>
                            </div>

                            <div className="bg-white p-2.5 rounded-lg self-start max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] text-sm z-10">
                                <span className="text-xs font-bold text-orange-800 block mb-1">Carlos</span>
                                <p className="text-slate-800">Creo que es porque activaron los mensajes temporales. Desaparece la opción de la estrella.</p>
                                <span className="text-[10px] text-gray-500 mt-1 block text-right">10:31 AM</span>
                            </div>

                            <div className="bg-[#fff5c4] text-center text-xs text-gray-600 p-2 rounded-lg my-2 shadow-sm border border-yellow-200 z-10 mx-4">
                                ℹ️ Toca la barra verde superior para ir a la configuración.
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto scrollbar-thin">
                        {/* Header Info */}
                        <div className="bg-white pb-6 pt-6 flex flex-col items-center shadow-sm mb-2 flex-shrink-0">
                            <div className="w-28 h-28 bg-slate-200 rounded-full mb-3 flex items-center justify-center text-4xl font-bold text-slate-400 shadow-inner">G</div>
                            <h2 className="text-2xl font-bold text-slate-800">Grupo de Trabajo</h2>
                            <p className="text-slate-500 text-sm font-medium">Grupo · 5 participantes</p>
                        </div>

                        {/* Options */}
                        <div className="bg-white mb-2 shadow-sm">
                            <div className="p-4 flex items-center gap-4 border-b border-slate-50 active:bg-slate-50 transition-colors">
                                <div className="bg-slate-100 p-2 rounded-full"><Star size={20} className="text-green-600" /></div>
                                <span className="flex-1 text-slate-800 font-medium">Mensajes destacados</span>
                            </div>
                            <div className="p-4 flex items-center gap-4 border-b border-slate-50 active:bg-slate-50 transition-colors">
                                <div className="bg-slate-100 p-2 rounded-full"><Search size={20} className="text-slate-600" /></div>
                                <span className="flex-1 text-slate-800 font-medium">Buscar</span>
                            </div>
                        </div>

                        <div className="bg-white mb-8 shadow-sm">
                            <Highlighter active={true} showHighlight={showHighlight} onClick={handleNextStep} className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
                                <div className="bg-slate-100 p-2 rounded-full"><Clock size={20} className="text-blue-500" /></div>
                                <div className="flex-1">
                                    <p className="text-slate-800 font-medium">Mensajes temporales</p>
                                    <p className="text-slate-500 text-xs mt-0.5">24 horas</p>
                                </div>
                                <ChevronRight size={20} className="text-slate-400" />
                            </Highlighter>
                            <div className="p-4 flex items-center gap-4 opacity-60">
                                <div className="bg-slate-100 p-2 rounded-full"><div className="w-5 h-5 border-2 border-slate-400 rounded flex items-center justify-center text-[10px] font-bold">🔒</div></div>
                                <div className="flex-1">
                                    <p className="text-slate-800 font-medium">Cifrado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
                        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white flex-shrink-0">
                            <ArrowLeft size={24} className="text-slate-600" />
                            <h2 className="font-semibold text-slate-800 text-lg">Duración</h2>
                        </div>

                        <div className="p-6 overflow-y-auto pb-48">
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-100 p-4 rounded-full">
                                    <Clock size={48} className="text-slate-400" />
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm mb-8 leading-relaxed text-center px-2">
                                Los mensajes nuevos desaparecerán para todos los participantes después del plazo seleccionado.
                            </p>

                            <div className="space-y-1">
                                {['24 horas', '7 días', '90 días'].map((label) => (
                                    <div key={label} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <span className="text-slate-700 font-medium">{label}</span>
                                    </div>
                                ))}

                                <Highlighter active={true} showHighlight={showHighlight} onClick={handleNextStep} className="flex items-center gap-4 p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer border border-green-100 mt-2">
                                    <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center bg-white">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="font-bold text-slate-800">Desactivados</span>
                                </Highlighter>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && <SuccessMessage onReset={resetTutorial} />}

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
            </div>
        </div>
    );
};

export default MobileMockup;
