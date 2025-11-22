import { useState } from 'react';
import { TRANSLATIONS } from '../constants/translations';

/**
 * Hook to manage language state and provide translations.
 * @returns {object} - { t, language, setLanguage }
 */
export function useTranslation() {
    const [language, setLanguage] = useState('es');
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;

    return { t, language, setLanguage };
}
