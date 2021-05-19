var checkoutRow = '<div class="row" style="padding-bottom:3px;"> \
    <div class="col">@itemTitle</div> \
    <div class="col">@cost</div> \
    <div class="col text-right"> \
        <button id="@buttonId" type="button" class="btn btn-danger"> \
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> \
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> \
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> \
            </svg> \
        </button> \
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

var globalItems;
function doIt(data){
    globalItems = data.data;
}

var checkoutButtonn = document.getElementById('checkout-button');
checkoutButtonn.onclick = loadCheckoutModal;


function loadCheckoutModal(){
    $('#checkout-container').empty();
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    if(!cart){
        return;
    }

    $.each(cart.items,(index, value) => {
        var checkoutItem = globalItems.find(obj => {
            return obj.buttonId === value.id
          });

        var newRow = checkoutRow
                    .replace("@itemTitle", checkoutItem.itemTitle)
                    .replace("@cost", checkoutItem.cost)
                    .replace("@buttonId", `${checkoutItem.buttonId}-co`);
        
        $('#checkout-container').append(newRow);


       
        
        var buttonn = document.getElementById(`${checkoutItem.buttonId}-co`);
        
        buttonn.onclick = (x) => {
            //remove the item from the grid, and remove it from the sessionStorage
            var cart = JSON.parse(sessionStorage.getItem("cart"));
            if(!cart){
                cart = {items: []};
            }
            var newitems = cart.items.filter((x) => x.id!=checkoutItem.buttonId);
            cart.items = newitems;
            sessionStorage.setItem("cart", JSON.stringify(cart));
            
        }
    });

    var globalItemButtonIds = globalItems.map(gItem => {return gItem.buttonId});
    var total = 0;
    cart.items.forEach(item => {
        
        if(globalItemButtonIds.includes(item.id)){
            total += globalItems.find(g => g.buttonId == item.id).cost;
            // total += item.cost;
        }
    } );
    
    $('#checkout-total').text(`$ ${total}`);
}
