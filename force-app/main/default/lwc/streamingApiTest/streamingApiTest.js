import { LightningElement, track } from 'lwc';
import {subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled} from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class StreamingApiTest extends LightningElement {
    channelName='/event/Test_Event__e'
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled
    subscription = {}
    @track respon = null


    showToast(title, message, variant) {                               //function to make toast instances
        const event = new ShowToastEvent({
            title,
            message,
            variant,
            messageData: [
                'Salesforce', {
                    url: 'http://www.salesforce.com/',
                    label: 'Click Here'
                }
            ],
            mode: 'dismissible'
        })
        this.dispatchEvent(event)
    }

    connectedCallback(){
        this.respon = null;
        this.handleSubscribe();
    }

    handleSubscribe(){
        subscribe(this.channelName, -1, this.messageCallback).then(response => {
            console.log(JSON.stringify(response.channel))
            console.log(JSON.stringify(response))
            this.subscription = response
        })
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription, response =>{
            console.log(JSON.stringify(response))
        })
    }


    messageCallback = (response) => {
        let res = response.data.payload.Response__c;
        this.respon = res
        console.log(JSON.stringify(this.respon))
    }

    renderedCallback(){
        if(this.respon === 'Nihal'){
            console.log('we got it')
            this.showToast("Success!!", "Comment Successfully Added!!", "success")
            this.respon = null
        }
        else if(this.respon === null || this.respon === ''){
            console.log("error")
        }
        else if(this.respon !== 'Nihal' && this.respon !== null || this.respon !== ''){
            console.log('we did not got it')
            this.showToast("failure!!", "Comment is not Successfully Added!!", "error")
        }
        else{
            console.log("error found")
        }
    }

    disconnectedCallback(){
        this.handleUnsubscribe()
    }

}