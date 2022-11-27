import { defineRule } from "vee-validate";
import { required, email, min } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

defineRule('required', value => {
    if(!value || !value.length) {
        return 'ველის შევსება სავალდებულოა';
    }
    return true;
});

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

defineRule('min_name', (value, [limit]) => {
    if(value.length >= limit) {
        return true;
    } else {
        return `სახელის ველი უნდა შედგებოდეს მინიმუმ ${limit} სიმბოლოსგან`
    }
})

defineRule('max_name', (value, [limit]) => {
    if(value.length < limit) {
        return true;
    } else {
        return `სახელის ველი უნდა შედგებოდეს მაქსიმუმ ${limit} სიმბოლოსგან`
    }
})

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

defineRule('name_alpha', (value) => {
    const regexAlpha = /^[ა-ჰ]+$/
    if(value.match(regexAlpha)) {
        return true;
    } else {
        return 'სახელის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს';
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

defineRule('email', value => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(value.match(regexEmail)) {
        return true;
    } else {
        return 'თქვენ მიერ შეყვანილი მეილი არასწორია';
    }
});

defineRule('email_redberry', value => {
    if(value.substring(value.length - 12, value.length) === '@redberry.ge') {
        return true;
    } else {
        return 'გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)';
    }
});

