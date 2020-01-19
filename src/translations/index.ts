import registerEn from './en/register.json';
import registerDe from './de/register.json';
import registerEs from './es/register.json';
import registerFr from './fr/register.json';
import registerIt from './it/register.json';
import registerPl from './pl/register.json';
import registerPt from './pt/register.json';
import registerTh from './th/register.json';
import registerZhhans from './zh-CN/register.json';
import registerZhhant from './zh-TW/register.json';

import loginEn from './en/login.json';
import loginDe from './de/login.json';
import loginEs from './es/login.json';
import loginFr from './fr/login.json';
import loginIt from './it/login.json';
import loginPl from './pl/login.json';
import loginPt from './pt/login.json';
import loginTh from './th/login.json';
import loginZhhans from './zh-CN/login.json';
import loginZhhant from './zh-TW/login.json';

const translations = {
    en: {
        register: registerEn,
        login: loginEn
    },
    de: {
        register: registerDe,
        login: loginDe
    },
    es: {
        register: registerEs,
        login: loginEs
    },
    fr: {
        register: registerFr,
        login: loginFr
    },
    it: {
        register: registerIt,
        login: loginIt
    },
    pl: {
        register: registerPl,
        login: loginPl
    },
    pt: {
        register: registerPt,
        login: loginPt
    },
    th: {
        register: registerTh,
        login: loginTh
    },
    'zh-CN': {
        register: registerZhhans,
        login: loginZhhans
    },
    'zh-TW': {
        register: registerZhhant,
        login: loginZhhant
    }
};

export default translations;
