$(document).ready(function () {
    var host = `https://${window.location.hostname}`;
    var name = '';
    var posting = '';
    var entity = '';
    var url = '';
    var websiteUrl = '';
    var context;

    microsoftTeams.initialize();

    microsoftTeams.settings.setValidityState(true);

    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
        microsoftTeams.getContext(function (context) {

            preferredSearchEngine = $('input[name=searchRadio]:checked').val();
            //alert(preferredSearchEngine);
            url = `${host}/index.html?teamId=` +
                `${encodeURIComponent(context.teamId)}` +
                `&channelId=${encodeURIComponent(context.channelId)}` +
                `&preferredSearchRadio=${encodeURIComponent(preferredSearchEngine)}`;
            websiteUrl = url + `&web=1`;

            entity = `searchtab-preferredSearch-${context.teamId}-${context.channelId}`;

            microsoftTeams.settings.setSettings({
                entityId: entity,
                contentUrl: url,
                suggestedDisplayName: name,
                websiteUrl: websiteUrl
            });
            saveEvent.notifySuccess();
        });
    });
});

function GoogleSelected() {
    alert('This search engine is inferior and is not allowed');
    $('#bingRadio').prop('checked',true);
}