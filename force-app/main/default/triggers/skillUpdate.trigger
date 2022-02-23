/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-18-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
trigger skillUpdate on Skill__c (After Update) {
    List<Test_Event__e> lst = new  List<Test_Event__e>();
    for(Skill__c skill: trigger.new){
        Test_Event__e te= new Test_Event__e(Response__c = skill.Skill_Name__c);
        lst.add(te);
    }
    List<Database.SaveResult> results = EventBus.publish(lst);
    for (Database.SaveResult sr : results) {
        if (sr.isSuccess()) {
            System.debug('Successfully published event.');
        } else {
            for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                            err.getStatusCode() +
                            ' - ' +
                            err.getMessage());
            }

}}}