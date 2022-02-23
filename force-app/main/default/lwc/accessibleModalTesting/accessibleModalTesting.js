import { LightningElement } from 'lwc';

export default class AccessibleModalTesting extends LightningElement {
    openModel = false;
    openModal(){
        this.openModel = true;
    }
    closeModal(){
        this.openModel = false;
    }
    aa(event){
        console.log(JSON.stringify(event.detail))
    }
}