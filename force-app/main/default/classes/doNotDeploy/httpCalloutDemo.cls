/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 09-24-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class HttpCalloutDemo {
    @AuraEnabled
    public static map<string,Object> httpCalloutDemoMethod(String strEndPointURL){
        map<string,Object> mapjsondata=new map<string,Object>();
        String strresponse=null;
        if(string.isNotBlank(strEndPointURL))
        {
            HttpRequest httpRequest =new httpRequest();
            httpRequest.setEndpoint(strEndPointURL);
            httpRequest.setMethod('GET');
            httpRequest.setHeader('Authorization','OAuth '+UserInfo.getSessionId());
            httpRequest.setHeader('Authorization','Bearer '+UserInfo.getSessionId());
            try {
                Http http =new Http();
                HttpResponse httpResponse=http.send(httpRequest);
                if(httpResponse.getStatusCode()==200)
                {
                    strresponse=httpResponse.getBody();
                }else {
                    throw new CalloutException(httpResponse.getBody());
                }
               
            } catch (Exception e) {
                throw e;
            }
        }
        if(String.isNotBlank(strresponse))
        {
            mapjsondata=(map<string,Object>)JSON.deserializeUntyped(strresponse);
            System.debug('mapjsondata=> '+mapjsondata);
        }
        return mapjsondata;
        
        
        
    }
   
}
