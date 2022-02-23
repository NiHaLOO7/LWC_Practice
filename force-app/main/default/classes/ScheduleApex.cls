/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-24-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class ScheduleApex implements Schedulable {
    public static void execute(SchedulableContext sc){
        List<Test__C> test = [Select Name from Test__c where Deletable__c = true];
        database.delete(test);
    }
}
