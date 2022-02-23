import { LightningElement } from 'lwc';
import updSkill from '@salesforce/apex/SkillController.updSkill'
export default class AsyncCallTest extends LightningElement {
    message
    handleClick(event){
        updSkill().then(result=>{
            this.message = result
            console.log(this.message)
        }).catch(error=>{
            console.log(error)

        })
    }
}