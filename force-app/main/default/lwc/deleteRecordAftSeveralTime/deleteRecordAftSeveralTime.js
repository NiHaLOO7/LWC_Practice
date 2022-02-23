import { LightningElement } from 'lwc';
import insertTest from '@salesforce/apex/TestController.insertTest'

export default class DeleteRecordAftSeveralTime extends LightningElement {
    handleClick(){
        insertTest().then((result)=>{
            console.log(result);
        })
        .catch(()=>{
            console.log(error);
        })
    }
}