
import { useCounterStore } from '@/context/store';
import en from './langs/en.json';
import es from './langs/es.json';

interface Translations {
    [key: string]: any;
}

const translations: { [key: string]: Translations } = {
    en,
    es
};

export const useTranslation = (page: string) => {
    const { lang: lg } = useCounterStore();
    const lang = lg || "es";
    const pageTranslations = translations[lang][page];
    
    return (path: string) => {
        const keys = path.split('.');
        let value: any = pageTranslations;
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return '';
            }
        }
        if( typeof value === 'object'){
            return ""
        }
        return value || '';
    };
};