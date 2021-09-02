import CryptoJS from 'crypto-js';
 
export default {
    //随机生成指定数量的16进制key
    generatekey(num) {
        let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (var i = 0; i < num; i++) {
            let randomPoz = Math.floor(Math.random() * library.length);
            key += library.substring(randomPoz, randomPoz + 1);
        }
        return key;
    },
    
    //加密
    encrypt(word, keyStr) {
        keyStr = keyStr ? keyStr : 'F9B753BA93A1E7B8'; //判断是否存在ksy，不存在就用定义好的key
        let iv = "F9B753BA93A1E7B8"
		 iv = CryptoJS.enc.Utf8.parse(iv);
		var key = CryptoJS.enc.Utf8.parse(keyStr);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv:iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        // return encrypted.toString();
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    },
    //解密
    decrypt(word, keyStr) {
       let key = 'F9B753BA93A1E7B8';
               let iv = 'F9B753BA93A1E7B8';
       
               key = CryptoJS.enc.Utf8.parse(key);
               iv = CryptoJS.enc.Utf8.parse(iv);
       
               let base64 = CryptoJS.enc.Base64.parse(word);
               
               let src = CryptoJS.enc.Base64.stringify(base64);
       
               // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
               let decrypt = CryptoJS.AES.decrypt(src, key, {
                       iv: iv,
                       mode: CryptoJS.mode.CBC,
                       padding: CryptoJS.pad.Pkcs7
               });
       
               let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
               return decryptedStr.toString();
    }
 
}