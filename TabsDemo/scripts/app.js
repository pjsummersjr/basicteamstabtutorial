$(document).ready(function () {
    
    microsoftTeams.initialize();
    microsoftTeams.getContext(function (context) {
        $('#name').text(`Welcome, ${context.upn}`);
    });
    microsoftTeams.getTabInstances(function (tabInstances) {

        if (tabInstances && tabInstances.teamTabs.length > 0) {
            let tab = tabInstances.teamTabs[0];
            let htmlData = `<div class="alert alert-secondary"><b>Tab Information</b><br/>`;
            htmlData += `<div>Tab name: ${tab.tabName}</div>`;
            htmlData += `</div>`;
            $('#infoPane').append(htmlData);
        }
    }, null);
});

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
                "Ocp-Apim-Subscription-Key":"6d8ca4536c9e4740a9c1ca3208f2c209"
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