/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-17-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SkillController {
    @AuraEnabled
    public static string updSkill(){
        updateSkill();
        return 'done';
    }
    @future(callout=true)
    @AuraEnabled
    public static void updateSkill(){
        List<Skill__c> skl = [SELECT Skill_Name__c from Skill__c LIMIT 1];
        skl[0].Skill_Name__c = 'Nihal';
        try {
            update skl; 
        } catch (Exception e) {
            System.debug(e.getMessage());
        }
    }
}

