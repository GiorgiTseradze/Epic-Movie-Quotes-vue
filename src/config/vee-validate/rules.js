import { defineRule } from "vee-validate";
import { required, email, min } from '@vee-validate/rules';
import i18n from '@/i18n/index.js'

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

defineRule('required', value => {
    if(i18n.global.locale === 'en' && !value) {
        return 'Field is required';
    }

    if(i18n.global.locale === 'ka' && !value) {
        return 'ველის შევსება სავალდებულოა';
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
        return 'სახელის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს ან რიცხვებს';
    }
})

defineRule('email', value => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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

//

defineRule('required_boolean', value => {
    if(value === null) {
        return 'ველის შევსება სავალდებულოა';
    }s
    const stringifiedValue = value.toString();
    if(stringifiedValue.length < 1) {
        return 'ველის შევსება სავალდებულოა';
    } else {
        return true;
    } 
});


defineRule('required_radio', value => {
    if(value === 0 || value === 1) {
        return 'true';
    }
    return 'ველის შევსება სავალდებულოა';
});

defineRule('min_last_name', (value, [limit]) => {
    if(value.length >= limit) {
        return true;
    } else {
        return `გვარის ველი უნდა შედგებოდეს მინიმუმ ${limit} სიმბოლოსგან`
    }
})

defineRule('max_last_name', (value, [limit]) => {
    if(value.length < limit) {
        return true;
    } else {
        return `გვარის ველი უნდა შედგებოდეს მაქსიმუმ ${limit} სიმბოლოსგან`
    }
})


defineRule('last_name_alpha', (value) => {
    const regexAlpha = /^[ა-ჰ]+$/
    if(value.match(regexAlpha)) {
        return true;
    } else {
        return 'გვარის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს';
    }
})


defineRule('email_redberry', value => {
    if(value.substring(value.length - 12, value.length) === '@redberry.ge') {
        return true;
    } else {
        return 'გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)';
    }
});

