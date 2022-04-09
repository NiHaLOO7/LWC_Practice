import { LightningElement, api, track } from 'lwc';

export default class MultiselectCombobox extends LightningElement {

    @api label = "";

    @track selectedOptions = [];                  // list of all the selected options
    @track inputValue;                  // label that is shown in the input of the combobox
    @track inputOptions;                // List of all the options
    
    // Flags
    @track hasRendered;
    @track comboboxIsRendered;
    @track dropDownInFocus = false;

    // Disabler.. passed from the parent using setter.
    @track _disabled = false;

    @api
    get disabled(){
        return this._disabled;
    }
    set disabled(value){
        this._disabled = value;
        this.handleDisabled();
    }
    
    @api
    get options() {
        return this.inputOptions;
    }
    set options(value) {
        let options = [];
        this.inputOptions = options.concat(value);
    }
    
    

    renderedCallback() {
        if (!this.hasRendered) {
            //  we call the logic once, when page rendered first time
            this.handleDisabled();
            this.setInitialValue();
        }
        this.hasRendered = true;
    }

    setInitialValue(){
        this.inputValue = this.options[0].label;
        this.selectedOptions = [this.options[0]];
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

    
    handleClick() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.toggle("slds-is-open");
        // Only happens on the first click
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

    // Dispatch event to send value to the parent on every change event
    sendValues(){
        let values = [];
        for (const valueObject of this.selectedOptions) {
            values.push(valueObject.value);
        }
        this.dispatchEvent(new CustomEvent("valuechange", {
            detail: values
        }));
    }

    handleOption(event, value){
        let listBoxOption = event.currentTarget.firstChild;
        if (listBoxOption.classList.contains("slds-is-selected")) {
            this.selectedOptions = this.selectedOptions.filter(option => option.value !== value);
        }
        else {
            let option = this.options.find(option => option.value === value);
            this.selectedOptions.push(option);
        }
        if (this.selectedOptions.length > 1) {
            this.inputValue = this.selectedOptions.length + ' options selected';
        }
        else{
            this.inputValue = this.selectedOptions[0].label;
        }        
        listBoxOption.classList.toggle("slds-is-selected");
        this.sendValues();
    }
    

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