var UL = $('.list-group');

var hasQuarter = false;

function machineItems(options){
    var options = options || {};
    this.name = options.name || "Soda";
    this.count = options.count || 100;
    this.decrease = options.decrease || 1;
    this.dispense = function(){
        this.count -= this.decrease;
        if (this.count < 0){
            $('#message').addClass('alert alert-warning');
            $('#message').text('No quarter');
        } else {
            hasQuarter = false;
            removeMessageClasses();
            $('#message').addClass('alert alert-success');
            $('#message').text('Please collect your ' + this.name + '. Thank you for using our services!')
            UL.append('<li class="list-group-item">' + this.name + '</li>');
        }
    }
}

var cocaCola = new machineItems({
    name:"Coca-Cola",
    count:10,
    decrease:1
});

var dietCoke = new machineItems({
    name:"Diet Coke",
    count:10,
    decrease:1
});

var drPaper = new machineItems({
    name:"Dr. Paper",
    count:10,
    decrease:1
});

var sprite = new machineItems({
    name:"Sprite",
    count:10,
    decrease:1
});

var fanta = new machineItems({
    name:"Fanta",
    count:10,
    decrease:1
});

var gingerAle = new machineItems({
    name:"Ginger Ale",
    count:10,
    decrease:1
});

var selectedInventoryItem = cocaCola;

$('.buttons').on('click', '.jumbotron', function() {
    if (hasQuarter) {
        selectedInventoryItem = getItemFromInventory($(this).text());
        selectedInventoryItem.dispense();
    } else {
        removeMessageClasses();
        $('#message').addClass('alert alert-danger').text('Please insert coin');
    }
});

$('#insertCoin').on('click', function () {
    hasQuarter = true;
    removeMessageClasses();
    $('#message').addClass('alert alert-warning').text('Coin inserted');
});

$('#returnCoin').on('click', function () {
    if (hasQuarter) {
        hasQuarter = false;
        removeMessageClasses();
        $('#message').addClass('alert alert-warning').text('Coin Returned');
    } else {
        $('#message').addClass('alert alert-warning').text('Soda dispense for inserted coin');
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
