import registerEn from './register/en.json';
import registerDe from './register/de.json';
import registerEs from './register/es.json';
import registerFr from './register/fr.json';
import registerIt from './register/it.json';
import registerPl from './register/pl.json';
import registerPt from './register/pt.json';
import registerTh from './register/th.json';
import registerZhhans from './register/zhhans.json';
import registerZhhant from './register/zhhant.json';

import commonEn from './common/en.json';
import commonDe from './common/de.json';

const translations = {
    en: {
        register: registerEn,
        common: commonEn
    },
    de: {
        register: registerDe,
        common: commonDe
    },
    es: {
        register: registerEs
    },
    fr: {
        register: registerFr
    },
    it: {
        register: registerIt
    },
    pl: {
        register: registerPl
    },
    pt: {
        register: registerPt
    },
    th: {
        register: registerTh
    },
    zhhans: {
        register: registerZhhans
    },
    zhhant: {
        register: registerZhhant
    }
};

export default translations;
