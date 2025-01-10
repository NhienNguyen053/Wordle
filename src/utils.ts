import CryptoJS from 'crypto-js';
import wordList from '../wordsList.json';

const secretKey = 'my_secret_key_053';

export const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
    return CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
};

export const getRandomWord = (usedWords: string[]): string[] => {
    const wordsArray = Object.keys(wordList);
    const remainingWords = wordsArray.filter((word) => !usedWords.includes(word));
    const selectedWord = remainingWords.length
        ? remainingWords[Math.floor(Math.random() * remainingWords.length)]
        : wordsArray[Math.floor(Math.random() * wordsArray.length)];
    console.log(selectedWord)
    return selectedWord.toUpperCase().split('');
};
