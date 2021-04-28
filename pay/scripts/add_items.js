var cardTemplate = ' \
<div class="col-md-4"> \
    <div class="card mb-4 shadow-sm">  \
        <img src="../mouplands_cover_files/images/@itemImageName" onerror="this.onerror=null; this.src=\'../mouplands_cover_files/images/brittney_bitch.jpg\'" class="card-img-top" alt="..."> \
        <div class="card-header"> \
            <h4 class="font-weight-normal">@itemTitle</h4> \
        </div> \
        <div class="card-body"> \
            <h5 class="card-title">$@cost</h5> \
            <h6 class="card-subtitle mb-2 text-muted">@itemDescription</h6> \
            <button id="@buttonId" type="button" class="btn btn-outline-primary">Add to cart</button> \
        </div> \
    </div> \
</div> \
';
var dogEntryUrl = document.URL.includes('localhost') ? `${document.URL}data/index.json` : 'https://www.mouplands.org/pay/data';//document.URL + "data";
// var dogEntryUrl = `${document.URL}data/index.json`


$.ajax({
    url: dogEntryUrl,
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
        var newTemplate = cardTemplate
                    .replace("@itemImageName", value.itemImageName)
                    .replace("@itemTitle", value.itemTitle)
                    .replace("@cost", value.cost)
                    .replace("@itemDescription", value.itemDescription)
                    .replace("@buttonId", value.buttonId);
        
        $(`#${value.row}`).append(newTemplate);
        
        
        var buttonn = document.getElementById(value.buttonId);
        
        buttonn.onclick = (x) => {
            var cart = JSON.parse(sessionStorage.getItem("cart"));
            if(!cart){
                cart = {items: []};
            }
            cart.items.push({"id": value.buttonId, "date": new Date().toLocaleDateString()});
            sessionStorage.setItem("cart", JSON.stringify(cart));
            // alert(x.srcElement.id + 'was put into the session storage');
        }
    });
}


//create html object on page
//wire up on click event
