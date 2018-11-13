$(document).ready(function () {
    
    microsoftTeams.initialize();
    microsoftTeams.getContext(function (context) {
        $('#name').text(`Welcome, ${context.upn}`);
    });
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