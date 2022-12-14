import { defineRule } from "vee-validate";
import { required, email, min } from '@vee-validate/rules';
import i18n from '@/i18n/index.js'

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

defineRule('required', (value) => {
    if(i18n.global.locale === 'en' && !value) {
        return 'Field is required';
    }

    if(i18n.global.locale === 'ka' && !value) {
        return 'ველის შევსება სავალდებულოა';
    }
    return true;
});

defineRule('genre', (value) => {
    if(i18n.global.locale === 'en' && !value[0]) {
        return 'Genre field is required';
    }

    if(i18n.global.locale === 'ka' && !value[0]) {
        return 'ჟანრის ველის შევსება სავალდებულოა';
    }
    return true;
});

defineRule('image', (value) => {
    if(i18n.global.locale === 'en' && !value) {
        return 'Image field is required';
    }

    if(i18n.global.locale === 'ka' && !value[0]) {
        return 'ფოტოს ველის შევსება სავალდებულოა';
    }
    return true;
});


defineRule('lowalphanumeric', (value) => {
    const regexAlpha = /^[a-z0-9_]*$/
    if(value.match(regexAlpha)) {
        return true;
    }
    if(i18n.global.locale === 'en' && !value.match(regexAlpha)) {
        return 'Use only low alphanumeric characters';
    }
    if(i18n.global.locale === 'ka' && !value.match(regexAlpha)) {
        return 'სახელის ველი უნდა შეიცავდეს მხოლოდ პატარა ასოებს ან რიცხვებს';
    }
})

defineRule('email', (value) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(value.match(regexEmail)) {
        return true;
    } 
    if(i18n.global.locale === 'en' && !value.match(regexEmail)){
        return 'Incorrect mail format';
    }
    if(i18n.global.locale === 'ka' && !value.match(regexEmail)){
        return 'თქვენ მიერ შეყვანილი მეილი არასწორია';
    }
});


defineRule('min', (value, [limit]) => {
    if(value.length >= limit) {
        return true;
    }
    if(value.length <= limit && i18n.global.locale === 'en') {
        return `Use min ${limit} symbols`
    }
    if(value.length <= limit && i18n.global.locale === 'ka') {
        return `მინიმუმ ${limit} სიმბოლო`
    }
})

defineRule('max', (value, [limit]) => {
    if(value.length < limit) {
        return true;
    }
    if(value.length >= limit && i18n.global.locale === 'en') {
        return `Use max ${limit} symbols`
    }
    if(value.length >= limit && i18n.global.locale === 'ka') {
        return `მაქსიმუმ ${limit} სიმბოლო`
    }
})

defineRule('en', (value) => {
    const regexAlpha = /^[a-zA-Z0-9\s?!:,.IXV]+$/
    if(value.match(regexAlpha)) {
        return true;
    } else {
        return 'Only English letters';
    }
})

defineRule('ge', (value) => {
    const regexAlpha = /^[ა-ჰ0-9\s?!:,.IXV_]+$/
    if(value.match(regexAlpha)) {
        return true;
    } else {
        return 'დასაშვებია მხოლოდ ქართული ასოები';
    }
})






