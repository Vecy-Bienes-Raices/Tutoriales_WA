import React, { useState, useEffect } from 'react';
import {
    MoreVertical,
    ArrowLeft,
    Clock,
    Star,
    Bookmark,
    ChevronRight,
    Search,
    Phone,
    Video,
    Check,
    Monitor,
    Smartphone,
    RefreshCcw,
    X,
    ChevronLeft
} from 'lucide-react';

// --- INTERFACES & TYPES ---
interface StepData {
    id: string;
    instruction: React.ReactNode;
    details: React.ReactNode;
}

interface StepsConfig {
    mobile: StepData[];
    desktop: StepData[];
}

interface HighlighterProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

// --- STATIC DATA ---
const steps: StepsConfig = {
    mobile: [
        {
            id: 'chat',
            instruction: "Paso 1: Toca el nombre del grupo.",
            details: "Arriba, donde aparece la foto."
        },
        {
            id: 'info',
            instruction: "Paso 2: Busca 'Mensajes temporales'.",
            details: "Puede decir '24 horas', '7 días'..."
        },
        {
            id: 'settings',
            instruction: "Paso 3: Selecciona 'Desactivados'.",
            details: "Esto es crucial."
        },
        {
            id: 'success',
            instruction: "¡Listo! Ya puedes destacar.",
            details: <>La estrella ⭐ <strong className="font-bold">DESTACAR</strong> ha regresado.</>
        }
    ],
    desktop: [
        {
            id: 'chat',
            instruction: "Paso 1: Haz clic en la barra superior.",
            details: "Donde está el nombre del grupo."
        },
        {
            id: 'info',
            instruction: "Paso 2: Busca 'Mensajes temporales'.",
            details: "Haz clic para configurar."
        },
        {
            id: 'settings',
            instruction: "Paso 3: Marca 'Desactivados'.",
            details: "Evita que los mensajes se borren."
        },
        {
            id: 'success',
            instruction: "¡Configuración guardada!",
            details: <>La estrella ⭐ <strong className="font-bold">DESTACAR</strong> es visible nuevamente.</>
        }
    ]
};

// Subtle background pattern (Base64 SVG) to replace external dependency
const chatBackground = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function WhatsAppTutorial() {
    const [mode, setMode] = useState<'intro' | 'mobile' | 'desktop'>('intro');
    const [step, setStep] = useState(0);
    const [showHighlight, setShowHighlight] = useState(true);

    // Reset steps when changing modes
    useEffect(() => {
        setStep(0);
        setShowHighlight(true);
    }, [mode]);

    const handleNextStep = () => {
        if (step < 3) {
            setStep(prev => prev + 1);
            setShowHighlight(true);
        }
    };

    const handlePrevStep = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
            setShowHighlight(true);
        }
    };

    const resetTutorial = () => {
        setMode('intro');
        setStep(0);
    };

    // --- COMPONENTS FOR UI ---

    const Highlighter: React.FC<HighlighterProps> = ({ children, active, onClick, className = "" }) => {
        // Accessibility: Use button for interactive elements, div for passive
        const Component = active ? 'button' : 'div';

        return (
            <Component
                onClick={active ? onClick : undefined}
                // Accessibility: Add key handler if needed, though button handles Enter/Space natively
                className={`relative transition-all duration-300 text-left w-full ${className} ${active ? 'cursor-pointer z-20 shadow-lg ring-2 ring-green-500 ring-offset-2 rounded-md focus:outline-none focus:ring-green-600' : ''}`}
                type={active ? "button" : undefined}
            >
                {children}
                {active && showHighlight && (
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-3 z-50 flex h-10 w-10 pointer-events-none">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-10 w-10 bg-green-600 justify-center items-center text-white shadow-xl ring-2 ring-white">
                            <span className="text-xl filter drop-shadow-md">👆</span>
                        </span>
                    </span>
                )}
                {active && showHighlight && (
                    <div className="absolute inset-0 bg-green-500/10 pointer-events-none rounded-md animate-pulse"></div>
                )}
            </Component>
        );
    };

    const IntroScreen = () => (
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

    const SuccessMessage = () => (
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
                onClick={resetTutorial}
                className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-green-200 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                <RefreshCcw size={18} />
                Volver al inicio
            </button>
        </div>
    );

    // --- MOBILE MOCKUP SCREENS ---

    // --- UI HELPERS ---

    const MobileMockup = () => {
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
                                    className="absolute inset-0 opacity-[0.4] pointer-events-none"
                                    style={{ backgroundImage: chatBackground }}
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
                                <Highlighter active={true} onClick={handleNextStep} className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
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

                                    <Highlighter active={true} onClick={handleNextStep} className="flex items-center gap-4 p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer border border-green-100 mt-2">
                                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center bg-white">
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="font-bold text-slate-800">Desactivados</span>
                                    </Highlighter>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && <SuccessMessage />}

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
                </div>
            </div>
        );
    };

    // --- DESKTOP MOCKUP SCREENS ---

    const DesktopMockup = () => {
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
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{ backgroundImage: chatBackground }}
                        ></div>

                        {/* Header */}
                        <Highlighter
                            active={step === 0}
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
                                    <SuccessMessage />
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

                                                        <Highlighter active={true} onClick={handleNextStep} className="flex items-center justify-between text-slate-700 py-4 cursor-pointer hover:bg-slate-50 px-6 transition-colors">
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

                                                        <Highlighter active={true} onClick={handleNextStep} className="flex items-center gap-4 p-3 hover:bg-green-50 bg-green-50/30 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-green-200">
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

    // --- MAIN LAYOUT ---

    const currentInstructions = mode === 'mobile' ? steps.mobile[step] : (mode === 'desktop' ? steps.desktop[step] : undefined);

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="bg-[#111b21] text-white px-4 py-3 shadow-md flex justify-between items-center z-50 flex-shrink-0 relative">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-1.5 rounded-lg shadow-lg shadow-green-900/50">
                        <Star size={18} fill="white" className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-base sm:text-lg leading-tight">Tutorial WhatsApp</h1>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">Cómo destacar mensajes</p>
                    </div>
                </div>

                {mode !== 'intro' && (
                    <button
                        onClick={resetTutorial}
                        className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors flex items-center gap-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <RefreshCcw size={14} />
                        <span className="hidden sm:inline">Reiniciar</span>
                    </button>
                )}
            </div>

            {/* Instruction Banner - Sticky/Dynamic */}
            {mode !== 'intro' && step < 3 && (
                <div className="bg-[#00a884] text-white px-4 py-3 text-center shadow-lg animate-in slide-in-from-top duration-300 z-40 flex-shrink-0 flex items-center justify-between relative">
                    {/* Back Button */}
                    <button
                        onClick={handlePrevStep}
                        disabled={step === 0}
                        className={`p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        aria-label="Paso anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex-1 px-2">
                        <p className="font-bold text-base sm:text-lg drop-shadow-sm leading-tight">{currentInstructions?.instruction}</p>
                        <p className="text-green-50 text-xs sm:text-sm mt-0.5 opacity-90 leading-tight">{currentInstructions?.details}</p>
                    </div>

                    <div className="w-10"></div>
                </div>
            )}

            <div className="flex-1 overflow-hidden relative bg-slate-200 w-full h-full flex flex-col">
                {mode === 'intro' && <IntroScreen />}
                {mode === 'mobile' && <MobileMockup />}
                {mode === 'desktop' && <DesktopMockup />}
            </div>

            {/* Footer - Vecy Developers */}
            <div className="bg-[#111b21] py-4 border-t border-slate-800 flex-shrink-0 flex flex-col items-center justify-center gap-2 shadow-inner z-50 relative">
                <div className="flex items-center gap-3">
                    {/* Animated Logo */}
                    <img src="/vecy.gif" alt="Vecy Developers Logo" className="h-8 w-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity" />

                    <p className="text-slate-500 text-[10px] sm:text-xs">
                        © 2025 Creado por{' '}
                        <a
                            href="https://wa.me/573166569719?text=Hola%20Vecy%20Developers!%20%F0%9F%91%8B%20Me%20interesa%20contratarlos%20para%20un%20proyecto%20web%20o%20app%20%F0%9F%9A%80"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-slate-300 hover:text-green-400 transition-colors tracking-wide"
                        >
                            Vecy Developers
                        </a>
                    </p>

                    {/* WhatsApp Icon Link */}
                    <a
                        href="https://wa.me/573166569719?text=Hola%20Vecy%20Developers!%20%F0%9F%91%8B%20Me%20interesa%20contratarlos%20para%20un%20proyecto%20web%20o%20app%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600/10 p-1.5 rounded-full hover:bg-green-600/20 transition-all group"
                        aria-label="Contactar por WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-500 group-hover:fill-green-400 transition-colors" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
