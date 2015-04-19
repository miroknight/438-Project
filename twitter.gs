var API = {
    UPDATE_WITH_MEDIA : "https://api.twitter.com/1.1/statuses/update_with_media.json"
};
 
function oAuthConfig() {
    var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
 
    oAuthConfig.setAccessTokenUrl("https://api.twitter.com/oauth/access_token");
    oAuthConfig.setRequestTokenUrl("https://api.twitter.com/oauth/request_token");
    oAuthConfig.setAuthorizationUrl("https://api.twitter.com/oauth/authorize");
 
    oAuthConfig.setConsumerKey(ScriptProperties.getProperty(6ROjBwlk37J4KiVlABCUkLF5P));
    oAuthConfig.setConsumerSecret(ScriptProperties.getProperty(fAURhqWtrVyiiGL04JVDDG5OQYwvJDKj4AivjRdk2jWEuXSsAK));
}
 
function postImage(tweetText, imageUrl) {
    oAuthConfig();
 
    var boundary = "cuthere",
        status   = tweetText,
        picture  = UrlFetchApp.fetch(imageUrl).getBlob().setContentTypeFromExtension(),
        requestBody, options, request;
 
    requestBody = Utilities.newBlob("--" + boundary + "\r\n" +
        "Content-Disposition: form-data; name=\"status\"\r\n\r\n" + status + "\r\n" +
        "--" + boundary + "\r\n" +
        "Content-Disposition: form-data; name=\"media[]\"; filename=\"" + picture.getName() + "\"\r\n" +
        "Content-Type: " + picture.getContentType() + "\r\n\r\n"
    ).getBytes();
 
    requestBody = requestBody.concat(picture.getBytes());
    requestBody = requestBody.concat(Utilities.newBlob("\r\n--" + boundary + "--\r\n").getBytes());
 
    options = {
        oAuthServiceName : "twitter",
        oAuthUseToken    : "always",
        method           : "POST",
        contentType      : "multipart/form-data; boundary=" + boundary,
        payload          : requestBody
    };
 
    return UrlFetchApp.fetch(API.UPDATE_WITH_MEDIA, options);
}
