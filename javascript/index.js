var UL = $('.list-group');

var insertedCoinCount = 0;

function machineItems(options){
    var options = options || {};
    this.name = options.name || "Soda";
    this.count = options.count || 10;
    this.decrease = options.decrease || 1;
    this.cost = options.cost || 5;
    this.dispense = function() {
        if (this.count < 0) {
            $('#message').addClass('alert alert-warning');
            $('#message').text('No quarter');
        } else {
            this.count -= this.decrease;
            insertedCoinCount -= this.cost;
            removeMessageClasses();
            $('#message').addClass('alert alert-success');
            $('#message').text('Please collect your ' + this.name + '. Thank you for using our services! Current balance is ' + insertedCoinCount)
            UL.append('<li class="list-group-item">' + this.name + '</li>');
        }
    }
}

var cocaCola = new machineItems({
    name:"Coca-Cola",
    count:10,
    decrease:1,
    cost:20
});

var dietCoke = new machineItems({
    name:"Diet Coke",
    count:10,
    decrease:1,
    cost:15
});

var drPaper = new machineItems({
    name:"Dr. Paper",
    count:10,
    decrease:1,
    cost:10
});

var sprite = new machineItems({
    name:"Sprite",
    count:10,
    decrease:1,
    cost:25
});

var fanta = new machineItems({
    name:"Fanta",
    count:10,
    decrease:1,
    cost:8
});

var gingerAle = new machineItems({
    name:"Ginger Ale",
    count:10,
    decrease:1,
    cost:15
});

var selectedInventoryItem = cocaCola;

$('.buttons').on('click', '.jumbotron', function() {
        selectedInventoryItem = getItemFromInventory($(this).text());
        console.log(insertedCoinCount + "  " + selectedInventoryItem.cost);
        if (insertedCoinCount >= selectedInventoryItem.cost) {
            selectedInventoryItem.dispense();
        } else if (insertedCoinCount < selectedInventoryItem.cost) {
            removeMessageClasses();
            $('#message').addClass('alert alert-warning').text('Please insert ' + (selectedInventoryItem.cost - insertedCoinCount) + ' coins for ' + selectedInventoryItem.name);
        } else if (insertedCoinCount == 0) {
            removeMessageClasses();
            $('#message').addClass('alert alert-danger').text('Please insert coin');
        }
});

$('#insertCoin').on('click', function () {
    insertedCoinCount += parseInt($('#sodaPrice').val());
    removeMessageClasses();
    $('#message').addClass('alert alert-warning').text(insertedCoinCount + ' coins inserted');
});

$('#returnCoin').on('click', function () {
    if (parseInt($('#sodaPrice').val()) > insertedCoinCount) {
        $('#message').addClass('alert alert-danger').text('Less balance to withdraw coins.');
    } else if (insertedCoinCount >= parseInt($('#sodaPrice').val())) {
        insertedCoinCount = insertedCoinCount - parseInt($('#sodaPrice').val());
        removeMessageClasses();
        $('#message').addClass('alert alert-warning').text(parseInt($('#sodaPrice').val()) + ' coin returned');
    } else {
        $('#message').addClass('alert alert-danger').text('Please insert coin');
    }
});

function removeMessageClasses() {
    $('#message').removeClass('alert-danger').removeClass('alert-success').removeClass('alert-warning');
}

function getItemFromInventory(item) {
    switch (item) {
        case cocaCola.name: return cocaCola;
        case dietCoke.name: return dietCoke;
        case drPaper.name: return drPaper;
        case sprite.name: return sprite;
        case fanta.name: return fanta;
        case gingerAle.name: return gingerAle;
    }
}

$('#cocaCola').text(cocaCola.name);
$('#paper').text(drPaper.name);
$('#fanta').text(fanta.name);
$('#dietCoke').text(dietCoke.name);
$('#sprite').text(sprite.name);
$('#gingerAle').text(gingerAle.name)
$('#insertCoin').text('Insert Coin');
$('#returnCoin').text('Return Coin');
