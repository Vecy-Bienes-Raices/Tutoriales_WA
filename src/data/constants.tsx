
import type { StepsConfig } from '../types';

export const steps: StepsConfig = {
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
export const chatBackground = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
