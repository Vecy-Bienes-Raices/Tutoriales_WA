import React from 'react';
import {
    MoreVertical, Search, Star, Clock, ChevronRight, ArrowLeft, X
} from 'lucide-react';
import Highlighter from '../common/Highlighter';
import SuccessMessage from '../common/SuccessMessage';

interface DesktopMockupProps {
    step: number;
    setStep: (step: number) => void;
    handleNextStep: () => void;
    showHighlight: boolean;
    resetTutorial: () => void;
}

const DesktopMockup: React.FC<DesktopMockupProps> = ({ step, setStep, handleNextStep, showHighlight, resetTutorial }) => {
    return (
        <div className="flex justify-center items-center h-full w-full bg-slate-200 p-2 sm:p-4 font-sans overflow-hidden">
            {/* Responsive Desktop Container: Uses h-full to fill available flex space without overflowing */}
            <div className="w-full max-w-[1100px] h-full max-h-full bg-white rounded-lg shadow-xl overflow-hidden border border-slate-300 flex relative">

                {/* Left Sidebar (Contacts) */}
                <div className="hidden md:flex w-[35%] lg:w-[320px] border-r border-slate-200 bg-white flex-col flex-shrink-0">
                    <div className="bg-[#f0f2f5] h-16 flex items-center px-4 justify-between border-b border-slate-200 flex-shrink-0">
                        <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                        <div className="flex gap-5 text-slate-500">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-500 border-dashed"></div>
                            <MoreVertical size={22} />
                        </div>
                    </div>
                    <div className="p-2 flex-shrink-0">
                        <div className="bg-[#f0f2f5] rounded-lg h-9 flex items-center px-4 gap-4 text-slate-500 text-sm">
                            <Search size={18} /> Buscar o empezar un chat nuevo
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`flex items-center gap-3 p-3 px-4 hover:bg-[#f0f2f5] cursor-pointer group ${i === 1 ? 'bg-[#f0f2f5]' : ''}`}>
                                <div className="w-12 h-12 bg-slate-300 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 border-b border-slate-100 pb-3 group-hover:border-transparent">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-slate-800 font-medium text-base">Grupo {i === 1 ? 'de Trabajo' : i}</span>
                                        <span className="text-xs text-slate-400">10:30</span>
                                    </div>
                                    <p className="text-sm text-slate-500 truncate">
                                        {i === 1 ? 'Ana: Necesitamos cambiar esto...' : 'Mensaje reciente...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-[#efeae2] relative min-w-0">
                    {/* Chat Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none bg-chat-pattern"
                    ></div>

                    {/* Header */}
                    <Highlighter
                        active={step === 0}
                        showHighlight={showHighlight}
                        onClick={step === 0 ? handleNextStep : undefined}
                        className="bg-[#f0f2f5] h-16 flex items-center px-4 justify-between border-b border-slate-200 z-10 cursor-pointer flex-shrink-0 shadow-sm"
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">G</div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-slate-800 text-base font-medium truncate">Grupo de Trabajo</span>
                                <span className="text-xs text-slate-500 truncate">Ana, Carlos, Diana, Tú...</span>
                            </div>
                        </div>
                        <div className="flex gap-6 text-slate-500 px-2 flex-shrink-0">
                            <Search size={22} />
                            <MoreVertical size={22} />
                        </div>
                    </Highlighter>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 sm:p-8 flex flex-col gap-3 z-0 overflow-y-auto">
                        <div className="bg-white p-2 px-3 rounded-lg rounded-tl-none self-start shadow-sm text-sm max-w-[80%] sm:max-w-[60%]">
                            <span className="text-xs font-bold text-orange-800 block mb-1">Carlos</span>
                            <p className="text-slate-800 leading-relaxed">Hola a todos, necesitamos desactivar los mensajes temporales para poder destacar info importante. Ahora mismo no aparece la estrella.</p>
                            <span className="text-[10px] text-slate-400 block text-right mt-1">10:30 AM</span>
                        </div>

                        {step === 0 && (
                            <div className="self-center bg-blue-50 text-blue-800 text-xs px-3 py-1.5 rounded-full shadow-sm mt-4 animate-bounce">
                                👆 Haz clic en la barra superior para empezar
                            </div>
                        )}
                    </div>

                    {/* Footer Input Mock */}
                    <div className="h-16 bg-[#f0f2f5] px-4 flex items-center gap-4 flex-shrink-0 z-10">
                        <div className="text-slate-500"><span className="text-2xl">😊</span></div>
                        <div className="flex-1 bg-white h-10 rounded-lg border border-slate-200 flex items-center px-4 text-slate-400 text-sm">
                            Escribe un mensaje aquí...
                        </div>
                        <div className="text-slate-500"><span className="text-xl">🎤</span></div>
                    </div>

                    {/* Sidebar Overlay for Settings (Steps 1 & 2) - Overlay logic for mobile/desktop split */}
                    {(step === 1 || step === 2 || step === 3) && (
                        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[400px] h-full bg-white border-l border-slate-200 z-20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                            {step === 3 ? (
                                <SuccessMessage onReset={resetTutorial} />
                            ) : (
                                <>
                                    <div className="h-16 bg-[#f0f2f5] flex items-center px-4 gap-6 border-b border-slate-200 flex-shrink-0">
                                        <div onClick={() => step === 2 && setStep(1)} className="cursor-pointer p-1 hover:bg-slate-200 rounded-full transition-colors">
                                            {step === 2 ? <ArrowLeft size={22} className="text-slate-600" /> : <X size={22} className="text-slate-600" />}
                                        </div>
                                        <span className="text-slate-800 font-medium text-lg">{step === 1 ? 'Info. del grupo' : 'Mensajes temporales'}</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
                                        {step === 1 && (
                                            <>
                                                <div className="flex flex-col items-center py-10 border-b border-slate-100 bg-white mb-2 shadow-sm">
                                                    <div className="w-48 h-48 bg-slate-200 rounded-full mb-6 flex items-center justify-center text-6xl text-slate-400 shadow-inner">G</div>
                                                    <h2 className="text-2xl text-slate-800 font-semibold mb-1">Grupo de Trabajo</h2>
                                                    <p className="text-slate-500 text-base">Grupo · 5 participantes</p>
                                                </div>
                                                <div className="bg-white p-2 shadow-sm border-b border-slate-100">
                                                    <div className="flex items-center justify-between text-slate-700 py-4 cursor-pointer hover:bg-slate-50 px-6 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <Star size={20} className="text-slate-400" />
                                                            <span className="font-medium">Mensajes destacados</span>
                                                        </div>
                                                        <ChevronRight size={18} className="text-slate-400" />
                                                    </div>

                                                    <div className="h-px bg-slate-100 mx-6"></div>

                                                    <Highlighter active={true} showHighlight={showHighlight} onClick={handleNextStep} className="flex items-center justify-between text-slate-700 py-4 cursor-pointer hover:bg-slate-50 px-6 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <Clock size={20} className="text-slate-600" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-medium">Mensajes temporales</span>
                                                                <span className="text-xs text-slate-400">24 horas</span>
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={18} className="text-slate-400" />
                                                    </Highlighter>

                                                    <div className="h-px bg-slate-100 mx-6"></div>

                                                    <div className="flex items-center justify-between text-slate-700 py-4 cursor-pointer hover:bg-slate-50 px-6 transition-colors opacity-70">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-5 h-5 flex items-center justify-center border-2 border-slate-400 rounded text-[10px]">🔒</div>
                                                            <span className="font-medium">Cifrado</span>
                                                        </div>
                                                        <span className="text-xs text-slate-400">Activado</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {step === 2 && (
                                            <div className="p-8">
                                                <div className="flex justify-center mb-8">
                                                    <div className="bg-slate-50 p-6 rounded-full">
                                                        <Clock size={64} className="text-teal-600" />
                                                    </div>
                                                </div>
                                                <h3 className="text-center font-bold text-slate-800 mb-2">Duración de los mensajes</h3>
                                                <p className="text-slate-600 text-sm mb-8 text-center leading-relaxed">
                                                    Los mensajes nuevos desaparecerán de este chat después del plazo seleccionado. Los mensajes guardados no se verán afectados.
                                                </p>

                                                <div className="space-y-2 text-base">
                                                    {['24 horas', '7 días', '90 días'].map((label) => (
                                                        <div key={label} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                                                            <div className="w-5 h-5 rounded-full border-2 border-slate-400"></div>
                                                            <span className="text-slate-700">{label}</span>
                                                        </div>
                                                    ))}

                                                    <div className="my-2 border-t border-slate-100"></div>

                                                    <Highlighter active={true} showHighlight={showHighlight} onClick={handleNextStep} className="flex items-center gap-4 p-3 hover:bg-green-50 bg-green-50/30 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-green-200">
                                                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center bg-white">
                                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                                        </div>
                                                        <span className="font-semibold text-slate-800">Desactivados</span>
                                                    </Highlighter>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DesktopMockup;
