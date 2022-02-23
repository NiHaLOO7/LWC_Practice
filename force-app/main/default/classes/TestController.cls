/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-24-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class TestController {
    @AuraEnabled
    public static void insertTest(){
        Datetime dt = System.now();  
        List<Test__c> tst = new List<Test__c>();
        Test__c ts = new Test__c();
        ts.Name= 'Nihal';
        ts.DateTime__c = dt; 
        tst.add(ts);
        insert(tst);    
    }
}
