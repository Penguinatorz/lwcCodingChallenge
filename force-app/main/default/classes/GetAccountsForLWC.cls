public with sharing class GetAccountsForLWC {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetail(String userQuery){
        try {
            String sanitizeString = String.escapeSingleQuotes(userQuery);
            String query = '%' + sanitizeString + '%';
    
            return [SELECT Name, Phone FROM Account WHERE Name LIKE :query];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetailImperatively(String searchInput){
        try {
            String sanitizeString = String.escapeSingleQuotes(searchInput);
            String query = '%' + sanitizeString + '%';
    
            return [SELECT Name, Phone FROM Account WHERE Name LIKE :query];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}