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
            <button id="@buttonId" type="button" data-id="@theId" class="btn btn-outline-primary">Add to cart</button> \
        </div> \
    </div> \
</div> \
';
var itemsUrl = document.URL.includes('localhost') ? `${document.URL}data/index.json` : 'https://www.mouplands.org/pay/data';//document.URL + "data";
// var itemsUrl = `${document.URL}data/index.json`


$.ajax({
    url: itemsUrl,
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
                    .replace("@buttonId", value.buttonId)
                    .replace("@theId", value.id);
        
        $(`#${value.row}`).append(newTemplate);
        
        
        var buttonn = document.getElementById(value.buttonId);
        
        buttonn.onclick = (x) => {
            var cart = JSON.parse(sessionStorage.getItem("cart"));
            if(!cart){
                cart = {items: []};
            }
            cart.items.push({"id": value.buttonId, "date": new Date().toLocaleDateString()});
            sessionStorage.setItem("cart", JSON.stringify(cart));
        }
    });
}


//create html object on page
//wire up on click event
