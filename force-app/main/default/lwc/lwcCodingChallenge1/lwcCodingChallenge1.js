/**
 * Create a LWC that can accept user input and dynamically 
 * display account records where the account name is similar to the value of the text input. 
 * Use the wire service only. 
 
    Next, recreate the same component but this time use imperative apex. 
 */

import { LightningElement, wire, track } from 'lwc';
import nameField from '@salesforce/schema/Account.Name';
import phoneField from '@salesforce/schema/Account.Phone';
import getAccountDetail from '@salesforce/apex/GetAccountsForLWC.getAccountDetail';
import getAccountDetailImperatively from '@salesforce/apex/GetAccountsForLWC.getAccountDetailImperatively';

export default class LwcCodingChallenge1 extends LightningElement {
    columns = [
        {label: 'Name', fieldName: 'Name'},
        {label: 'Phone', fieldName: 'Phone', type: 'phone'}
    ]

    userQuery;
    accountList;

    @wire(getAccountDetail, {userQuery : '$userQuery'})
    accountList;
    

    handleButton(){
        let input = this.template.querySelector('.input').value;
        this.userQuery = input;
    }

    searchInput;
    imperativeAccountList;
    error;

    handleOnChange(event){
        this.searchInput = event.target.value;
    }

    async handleSearch(){
        try{
            this.imperativeAccountList = await getAccountDetailImperatively({ searchInput: this.searchInput});
            this.error = undefined;
        } catch(error){
            this.error = error;
            this.imperativeAccountList = undefined;
        }
    }


}