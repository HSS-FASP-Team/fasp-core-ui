import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import Cache from 'i18next-localstorage-cache';
import { initReactI18next } from 'react-i18next';
//import moment from 'moment';
var lang =localStorage.getItem('lang');
if(lang==null){
  lang='en';
  localStorage.setItem('lang',lang);

}
    i18n
  .use(LanguageDetector)
  .use(Backend)
 // .use(Cache)
  .use(initReactI18next)
  .init({
    lng: lang,
    backend: {
      /* translation file path */
      loadPath: '/locales/{{lng}}.json',
      crossDomain: true
    },
    fallbackLng: 'en',
    debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    },debug: true 
  }, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key'); // -> same as i18next.t
  }
  )

  i18n.on('initialized', () => {
    if (i18n.options && i18n.options.second) {
      // seems 2nd init was done
    }
  });
  export default i18n;