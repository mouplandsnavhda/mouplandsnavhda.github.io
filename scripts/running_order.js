var dogEntryTemplate = ' \
<tr> \
    <td>@test</td> \
    <td>@breed</td> \
    <td>@name</td> \
    <td>@age</td> \
    <td>@handler</td> \
    <td>@owner</td> \
    <td>@paid</td> \
</tr> \
';
var dogEntryUrl = 'https://mouplandsnavhda.github.io/data';//document.URL + "data";


$.ajax({
    url: "https://mouplandsnavhda.github.io/data",
    method: 'GET',
    cache: false,
    dataType: "json",
    success: doIt
})
.done(function() {
    console.log("done");
});

function doIt(data){
    $.each(data.data,(index, value) => {
        var newTemplate = dogEntryTemplate
                    .replace("@test", value.test)
                    .replace("@breed", value.breed)
                    .replace("@name", value.name)
                    .replace("@age", value.ageInMonths)
                    .replace("@handler", value.handlerName)
                    .replace("@owner", value.ownerName)
                    .replace("@paid", value.hasPaid);
        $("#dayOne > tbody").append(newTemplate);
    });
}

/*
{
            "id": 1,
            "test": "UT",
            "breed": "GS",
            "name": "Jager",
            "handlerName": "Brandon Whitfield",
            "ownerName": "Brandon Whitfield",
            "ageInMonths": 32,
            "hasPaid": false
        },

*/