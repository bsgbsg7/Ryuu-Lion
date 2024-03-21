import sha1 from 'crypto-js/sha1';
import WordArray from 'crypto-js/lib-typedarrays'
export function getSha1(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
        if (!file) {
            resolve("");
            return;
        }
        const reader = new FileReader(); //define a Reader
        reader.onload = function (f) {
            const file_result = this.result; // this == reader, get the loaded file "result"
            //@ts-ignore
            const file_wordArr = WordArray.create(file_result);
            const sha1_hash = sha1(file_wordArr);
            resolve(sha1_hash.toString());
        };
        reader.readAsArrayBuffer(file); //read file as ArrayBuffer
    })
}