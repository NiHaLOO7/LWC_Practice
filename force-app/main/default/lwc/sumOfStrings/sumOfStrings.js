import { LightningElement, track } from 'lwc';

export default class SumOfStrings extends LightningElement {
    @track val1='';
    @track val2='';
    @track sum='';

    add(str111, str222)
{
    let str1 = "";
    let str2 = "";
    let arr1 = [];
    let arr2 = [];
    let str11 = "0";
    let str22 = "0";
    let decSum = "00";
    let flag = false;
    if(str111.include(".")){
        arr1 = str111.split(".");
        str1 = arr1[0];
        str11 = arr1[1];
        flag = true;
    }
    else{
        str1 = str111
    }

    if(str222.include(".")){
        arr2 = str222.split(".");
        str1 = arr2[0];
        str22 = arr2[1];
        flag = true;
    }
    else{
        str2 = str222
    }
    if(str11 !== "0" || str22 !== "0"){
        decSum = this.add(str11,str22);
    }
    
     
    // Before proceeding further, make
    // sure length of str2 is larger.
    if (str1.length > str2.length)
    {
        let t = str1;
        str1 = str2;
        str2 = t;
    }
     
    // Take an empty String for storing result
    let str = "";
     
    // Calculate length of both String
    let n1 = str1.length, n2 = str2.length;
     
    // Reverse both of Strings
    str1 = str1.split("").reverse().join("");
    str2 = str2.split("").reverse().join("");
     
    let carry = 0;
    for(let i = 0; i < n1; i++)
    {
         
        // Do school mathematics, compute sum of
        // current digits and carry
        let sum = ((str1[i].charCodeAt(0) -
                        '0'.charCodeAt(0)) +
                   (str2[i].charCodeAt(0) -
                        '0'.charCodeAt(0)) + carry);
        str += String.fromCharCode(sum % 10 +
                        '0'.charCodeAt(0));
     
        // Calculate carry for next step
        carry = Math.floor(sum / 10);
    }
     
    // Add remaining digits of larger number
    for(let i = n1; i < n2; i++)
    {
        let sum = ((str2[i].charCodeAt(0) -
                        '0'.charCodeAt(0)) + carry);
        str += String.fromCharCode(sum % 10 +
                        '0'.charCodeAt(0));
        carry = Math.floor(sum / 10);
    }
     
    // Add remaining carry
    if (carry > 0)
        str += String.fromCharCode(carry +
                       '0'.charCodeAt(0));
     
    // reverse resultant String
    str = str.split("").reverse().join("");
    let strsum = str+"."+decSum;
     
    return strsum;
}

    changeHandler(event){
        this.val1 = event.target.value.toString();
        this.sum = this.add(this.val1 ,this.val2);
    }
    changeHandler2(event){
        this.val2 = event.target.value.toString();
        this.sum = this.add(this.val1 ,this.val2);
    }
}