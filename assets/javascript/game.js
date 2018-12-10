let selectCharacter = [
    {
        "character": "Obiwan Kenobi",
        "image": "assets/images/obiwan.jpg",
        "select": "obiwan",
        "hp" : 120
    },
    {
        "character": "Luke Skywalker",
        "image": "assets/images/lukeskywalker.jpg",
        "select": "luke",
        "hp" : 100
    },
    {
        "character": "Darth Insidious",
        "image": "assets/images/darthsidious.jpg",
        "select": "insidious",
        "hp" : 150
    },
    {
        "character": "Darth Maul",
        "image": "assets/images/darthmaul.jpg",
        "select": "maul",
        "hp" : 100
    }
];

let selectedCharacter, selectedEnemyCharacter;
let enemies = [];

function displayCharacters(character) {
    var selectionTitle = $("<h2>");
    selectionTitle.text("Select a Character");
    $(".choose-character").append(selectionTitle);

    for(var i = 0; i < selectCharacter.length; i++) {
        var img = $("<img>");
        img.addClass("char-img");
        img.addClass("character-choice")
        img.attr("src", character[i].image);
        img.attr("select-data", character[i].select)
        $(".choose-character").append(img);
    }
}


$( document ).ready(function() {

    displayCharacters(selectCharacter);

    // select good character
    $('.character-choice').on("click", function (){
        var selected = $(this).attr('select-data');
        
        for(var i = 0; i < selectCharacter.length; i++) {
            if (selected == selectCharacter[i].select) {
                selectedCharacter = selectCharacter[i];
            } else{
                enemies.push(selectCharacter[i]);
            }
        }
        $(".choose-character").empty()

        var selectedTitle = $("<h2>");
        selectedTitle.text("Chosen Character");
        $(".selected-character").append(selectedTitle);

        var img = $("<img>");
        img.addClass("char-img");
        img.attr("src", selectedCharacter.image);
        img.attr("select-data", selectedCharacter.select)
        $(".selected-character").append(img);


        var enemyTitle = $("<h2>");
        enemyTitle.text("Enemies Available for Attack");
        $(".enemy-characters").append(enemyTitle);

        for(var i = 0; i < enemies.length; i++) {
            var img = $("<img>");
            img.addClass("char-img enemy-character-choice");
            img.attr("src", enemies[i].image);
            img.attr("select-data", enemies[i].select)
            $(".enemy-characters").append(img);
        }


    });
        // select bad guy
        $(document).on("click", '.enemy-character-choice', function () {
            var selectedEnemy = $(this).attr('select-data');

            for(var i = 0; i < enemies.length; i++) {
                if (selectedEnemy == enemies[i].select) {
                    selectedEnemyCharacter = enemies[i];
                } 
            }

            if($('.defending-enemy h2').length) {
                var img = $('.defending-enemy img.char-img')
                img.attr("src", selectedEnemyCharacter.image);
                img.attr("select-data", selectedEnemyCharacter.select)
            } else{
                var selectedEnemyTitle = $("<h2>");
                selectedEnemyTitle.text("Chosen Enemy to Fight");
                $(".defending-enemy").append(selectedEnemyTitle);
        
                var img = $("<img>");
                img.addClass("char-img");
                img.attr("src", selectedEnemyCharacter.image);
                img.attr("select-data", selectedEnemyCharacter.select)
                $(".defending-enemy").append(img);

                var button = $("<button>");
                button.text("Attack");
                $(".defending-enemy").append(button);
            }
        });

        // fighting

});