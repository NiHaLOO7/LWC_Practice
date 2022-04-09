import { LightningElement, api, track } from 'lwc';

export default class MultiselectCombobox extends LightningElement {

    @api label = "";
    _disabled = false;
    @api
    get disabled(){
        return this._disabled;
    }
    set disabled(value){
        this._disabled = value;
        this.handleDisabled();
    }
    @track inputOptions;
    @api
    get options() {
        return this.inputOptions.filter(option => option.value);
    }
    set options(value) {
        let options = [];
        this.inputOptions = options.concat(value);
    }
    @api
    clear(){
        this.handleAllOption();
    }
    @track value = [];
    @track inputValue;

    hasRendered;
    renderedCallback() {
        if (!this.hasRendered) {
            //  we call the logic once, when page rendered first time
            this.handleDisabled();
            this.selectFirstValue();
        }
        this.hasRendered = true;
    }

    selectFirstValue(){
        this.inputValue = this.options[0].label;
        this.value = [this.options[0]];
        let values=[this.options[0].value];
        this.dispatchEvent(new CustomEvent("valuechange", {
            detail: values
        }));
    }

    handleDisabled(){
        let input = this.template.querySelector("input");
        if (input){
            input.disabled = this.disabled;
        }
    }

    comboboxIsRendered;
    handleClick() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.toggle("slds-is-open");
        if (!this.comboboxIsRendered){
            let firstOption = this.template.querySelectorAll('li.slds-listbox__item')[0];
            firstOption.firstChild.classList.add("slds-is-selected");
            this.comboboxIsRendered = true;
        }
    }

    handleSelection(event) {
        let value = event.currentTarget.dataset.value;
        let selectedListBoxOptions = this.template.querySelectorAll('.slds-is-selected span.optLabel');
        if(!(selectedListBoxOptions.length === 1 && selectedListBoxOptions[0].dataset.id === value)){
            this.handleOption(event, value);
        }
        let input = this.template.querySelector("input");
        input.focus();
    }

    sendValues(){
        let values = [];
        for (const valueObject of this.value) {
            values.push(valueObject.value);
        }
        this.dispatchEvent(new CustomEvent("valuechange", {
            detail: values
        }));
    }

    handleOption(event, value){
        let listBoxOption = event.currentTarget.firstChild;
        if (listBoxOption.classList.contains("slds-is-selected")) {
            this.value = this.value.filter(option => option.value !== value);
        }
        else {
            let option = this.options.find(option => option.value === value);
            this.value.push(option);
        }
        if (this.value.length > 1) {
            this.inputValue = this.value.length + ' options selected';
        }
        else{
            this.inputValue = this.value[0].label;
        }        
        listBoxOption.classList.toggle("slds-is-selected");
        this.sendValues();
    }
    dropDownInFocus = false;

    handleBlur() {
        if (!this.dropDownInFocus) {
            this.closeDropbox();
        }
    }

    handleMouseleave() {
        this.dropDownInFocus = false;
    }

    handleMouseEnter() {
        this.dropDownInFocus = true;
    }
    
    closeDropbox() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.remove("slds-is-open");
    }
}