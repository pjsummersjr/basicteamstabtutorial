$(document).ready(function () {
    
    microsoftTeams.initialize();
    microsoftTeams.getContext(function (context) {
        $('#name').text(`Welcome, ${context.upn}`);
    });

    let preferredSearchEngine = getSetting('preferredSearchRadio');
    if (preferredSearchEngine) {
        let htmlData = `<div id="tabSettings"><b>Tab Settings</b><br/>`;
        htmlData += `<div>Preferred Search Engine: ${preferredSearchEngine}</div>`;
        htmlData += `</div>`;
        $('#infoPane').append(htmlData);
        //$('#preferredSearchEngine').text(`Your preferred search engine is ${preferredSearchEngine}`);
    }
    microsoftTeams.getTabInstances(function (tabInstances) {

        if (tabInstances && tabInstances.teamTabs.length > 0) {
            let tab = tabInstances.teamTabs[0];
            let htmlData = `<div id="tabInfo"><b>Tab Information</b><br/>`;
            htmlData += `<div>Tab name: ${tab.tabName}</div>`;
            htmlData += `<div>Team name: ${tab.teamName}</div>`;
            htmlData += `</div>`;
            $('#infoPane').append(htmlData);
        }
    }, null);
    microsoftTeams.settings.getSettings(function (theSettings) {
        console.log('Coming back');
    });
});

function getSetting(settingName) {
    let queryParams = window.location.search.split('&');
    if (queryParams && queryParams.length > 0) {
        for (var i = 0; i < queryParams.length; i++) {
            if (queryParams[i].split('=')[0] == settingName) {
                return queryParams[i].split('=')[1];
            }
        }
    }
    return null;
}

function searchClick() {
    var input = $('#searchTerms').val();
    let bingNewsUrl = `https://api.cognitive.microsoft.com/bing/v7.0/news/search`;
    if (input && input.length > 0) {
        bingNewsUrl += `?q=${input}`;
    }
    var request = $.get({
            url: bingNewsUrl,
            crossDomain: true,
            headers: {
                "Ocp-Apim-Subscription-Key":"7b8b0e1bc1e74db48f3389ba2ce84ff3"
            }
        })
        .done(function (data) {
            let resultsHtml = '<ul class="list-group">';
            data.value.map((object, i) => {
                resultsHtml += `<li class="list-group-item"><a href="${object.url}">${object.name}</a><br/>${object.description}</li>`;
            })
            resultsHtml += '</ul>';
            $('#results').html(resultsHtml);
        })
        .fail(function () {
            $('#results').text(`Couldn't load search results. Sorry.`);
        })
}