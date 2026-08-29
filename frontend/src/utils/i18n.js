/**
 * Internationalization (i18n) Framework
 * Multi-language support system
 */

const translations = {
  en: {
    home: 'Home',
    contracts: 'Contracts',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    welcome: 'Welcome to ConditionalBlock',
    contractTitle: 'Create a New Contract',
    conditions: 'Conditions',
    amount: 'Amount',
    recipient: 'Recipient',
    unlockTime: 'Unlock Time',
    signatures: 'Required Signatures',
    oracleData: 'Oracle Data',
  },
  es: {
    home: 'Inicio',
    contracts: 'Contratos',
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    welcome: 'Bienvenido a ConditionalBlock',
    contractTitle: 'Crear un nuevo contrato',
    conditions: 'Condiciones',
    amount: 'Cantidad',
    recipient: 'Destinatario',
    unlockTime: 'Tiempo de desbloqueo',
    signatures: 'Firmas requeridas',
    oracleData: 'Datos del Oráculo',
  },
  fr: {
    home: 'Accueil',
    contracts: 'Contrats',
    create: 'Créer',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    welcome: 'Bienvenue chez ConditionalBlock',
    contractTitle: 'Créer un nouveau contrat',
    conditions: 'Conditions',
    amount: 'Montant',
    recipient: 'Destinataire',
    unlockTime: 'Temps de déverrouillage',
    signatures: 'Signatures requises',
    oracleData: 'Données Oracle',
  },
};

let currentLanguage = localStorage.getItem('language') || 'en';

export const t = (key) => {
  return translations[currentLanguage]?.[key] || key;
};

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    window.dispatchEvent(new Event('languageChanged'));
  }
};

export const getLanguage = () => currentLanguage;
export const getAvailableLanguages = () => Object.keys(translations);