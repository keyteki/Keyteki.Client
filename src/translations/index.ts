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

import commonDe from './common/de.json';
import commonEn from './common/en.json';
import commonEs from './common/es.json';
import commonFr from './common/fr.json';
import commonIt from './common/it.json';
import commonPl from './common/pl.json';
import commonPt from './common/pt.json';
import commonTh from './common/th.json';
import commonZhans from './common/zhhans.json';
import commonZhant from './common/zhhant.json';

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
        register: registerEs,
        common: commonEs
    },
    fr: {
        register: registerFr,
        common: commonFr
    },
    it: {
        register: registerIt,
        common: commonIt
    },
    pl: {
        register: registerPl,
        common: commonPl
    },
    pt: {
        register: registerPt,
        common: commonPt
    },
    th: {
        register: registerTh,
        common: commonTh
    },
    zhhans: {
        register: registerZhhans,
        common: commonZhans
    },
    zhhant: {
        register: registerZhhant,
        common: commonZhant
    }
};

export default translations;
