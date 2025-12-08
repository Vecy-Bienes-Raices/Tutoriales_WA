import { useState, useEffect, Suspense, lazy } from 'react';
import { Star, RefreshCcw, ChevronLeft } from 'lucide-react';
import IntroScreen from './components/intro/IntroScreen';
import { steps } from './data/constants';

// Lazy load complex components for performance
const MobileMockup = lazy(() => import('./components/mobile/MobileMockup'));
const DesktopMockup = lazy(() => import('./components/desktop/DesktopMockup'));

// Loading fallback
const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full w-full bg-slate-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
);

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
                <Suspense fallback={<LoadingSpinner />}>
                    {mode === 'intro' && <IntroScreen setMode={setMode} />}
                    {mode === 'mobile' && (
                        <MobileMockup
                            step={step}
                            handleNextStep={handleNextStep}
                            showHighlight={showHighlight}
                            resetTutorial={resetTutorial}
                        />
                    )}
                    {mode === 'desktop' && (
                        <DesktopMockup
                            step={step}
                            setStep={setStep}
                            handleNextStep={handleNextStep}
                            showHighlight={showHighlight}
                            resetTutorial={resetTutorial}
                        />
                    )}
                </Suspense>
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
