let selectCharacter = [
    {
        "character": "Obiwan Kenobi",
        "image": "assets/images/obiwan.jpg",
        "select": "obiwan",
        "hp" : 125,
        "attackPower": 6,
        "defendPower": 20
    },
    {
        "character": "Luke Skywalker",
        "image": "assets/images/lukeskywalker.jpg",
        "select": "luke",
        "hp" : 100,
        "attackPower": 8,
        "defendPower": 25
    },
    {
        "character": "Darth Insidious",
        "image": "assets/images/darthsidious.jpg",
        "select": "insidious",
        "hp" : 150,
        "attackPower": 2,
        "defendPower": 6
    },
    {
        "character": "Darth Maul",
        "image": "assets/images/darthmaul.jpg",
        "select": "maul",
        "hp" : 175,
        "attackPower": 1,
        "defendPower": 4
    }    
];

let selectedCharacter, selectedEnemyCharacter;
let enemies = [];


function resetGame() {
    $('#restart').remove();
    $('#game-over').remove();
    $('.choose-character-title').empty();
    $('.choose-character').empty();
    $('.selected-character-title').empty();
    $('.selected-character').empty();
    $('.enemy-characters-title').empty();
    $('.enemy-characters').empty();
    $('.defending-enemy-title').empty();
    $('.defending-enemy').empty();
    $('.attack-area').empty();
    $('.container').animate({opacity: "1"});

    selectCharacter = [
        {
            "character": "Obiwan Kenobi",
            "image": "assets/images/obiwan.jpg",
            "select": "obiwan",
            "hp" : 125,
            "attackPower": 6,
            "defendPower": 20
        },
        {
            "character": "Luke Skywalker",
            "image": "assets/images/lukeskywalker.jpg",
            "select": "luke",
            "hp" : 100,
            "attackPower": 8,
            "defendPower": 25
        },
        {
            "character": "Darth Insidious",
            "image": "assets/images/darthsidious.jpg",
            "select": "insidious",
            "hp" : 150,
            "attackPower": 2,
            "defendPower": 6
        },
        {
            "character": "Darth Maul",
            "image": "assets/images/darthmaul.jpg",
            "select": "maul",
            "hp" : 175,
            "attackPower": 1,
            "defendPower": 4
        }    
];
    enemies = [];

    startGame(selectCharacter);
}

function attack(character, enemy) {
    enemy.hp -= character.attackPower;
    character.hp -= enemy.defendPower;
    character.attackPower += character.attackPower;
}

function didCharacterDie(character) {
    if (character.hp > 0) {
        return false;
    } else {
        return true;
    }
}

function startGame(character) {
    // select a player
    var selectionTitle = $("<h2>");

    selectionTitle.text("Select a Character - ");
    
    $(".choose-character-title").append(selectionTitle);

    for(var i = 0; i < selectCharacter.length; i++) {
        var outerbox = $("<div>");
        var div = $("<div>");
        var img = $("<img>");

        outerbox.attr("id", character[i].select);
        outerbox.addClass("outer-box");

        div.attr("id", "char-hp-display");
        div.html("HP: " + character[i].hp + "<br> Name: " + character[i].character);

        img.addClass("char-img");
        img.addClass("character-choice")
        img.attr("src", character[i].image);
        img.attr("select-data", character[i].select)

        $(".choose-character").append(outerbox);            
        $(outerbox).append(div, img);
    }

        // click to select character
        $('.character-choice').on("click", function (){
            var selected = $(this).attr('select-data');
            
            for(var i = 0; i < selectCharacter.length; i++) {
                if (selected == selectCharacter[i].select) {
                    selectedCharacter = selectCharacter[i];
                } else{
                    enemies.push(selectCharacter[i]);
                }
            }
        
            $(".choose-character-title").empty();
            $(".choose-character").empty();
        
            var selectedTitle = $("<h2>");
            var img = $("<img>");
            var stats = $('<div id="player">');
            var hp = $('<p id="player-hp">');
            var ap = $('<p id="player-attack-power">');
        
        
            selectedTitle.text("Chosen Character");
            img.addClass("char-img");
            img.attr("src", selectedCharacter.image);
            img.attr("select-data", selectedCharacter.select)
            hp.html("Name: " + selectedCharacter.character + 
            "<br> Current Health Points: " + selectedCharacter.hp + "<br>" + 
            "Current Attack Power: " + selectedCharacter.attackPower);
            // ap.text("Current Attack Power: " + selectedCharacter.attackPower);
        
            $(".selected-character-title").append(selectedTitle);
            $(".selected-character").append(img);
            $(".selected-character").append(stats);
            $(stats).append(hp,ap);
        
            // choose enemy character to fight
            var enemyTitle = $("<h2>");
            enemyTitle.text("Enemies Available for Attack");
            $(".enemy-characters-title").append(enemyTitle);
        
            for(var i = 0; i < enemies.length; i++) {
                var outerbox = $("<div>");
                var div = $("<div>");
                var img = $("<img>");
        
                outerbox.attr("id", enemies[i].select);
                outerbox.addClass("outer-box");    
        
                div.attr("id", "char-hp-display");
                div.html("HP: " + enemies[i].hp + "<br> Name: " + enemies[i].character);
        
                img.addClass("char-img enemy-character-choice");
                img.attr("src", enemies[i].image);
                img.attr("select-data", enemies[i].select)
        
                $(".enemy-characters").append(outerbox);            
                $(outerbox).append(div, img)
            }        
        });

        $(document).on("click", '.enemy-character-choice', function () {
            var selectedEnemy = $(this).attr('select-data');
    
            for(var i = 0; i < enemies.length; i++) {
                if (selectedEnemy == enemies[i].select) {
                    selectedEnemyCharacter = enemies[i];
                }
            }
    
            if ($('.defending-enemy-title h2').length) {
                if (!$('.defending-enemy img.char-img').length) {
                    var img = $("<img>");
                    var stats = $('<div id="computer">');
                    var hp = $('<p id="computer-hp">');
                    var dp = $('<p id="computer-defend-power">');
                    var button = $('<button id="attack">');

                    img.addClass("char-img");
                    img.attr("src", selectedEnemyCharacter.image);
                    img.attr("select-data", selectedEnemyCharacter.select)
                    hp.html("Name: " + selectedEnemyCharacter.character + 
                    "<br> Current Health Points: " + selectedEnemyCharacter.hp + "<br>" +
                    "Counter Attack Power: " + selectedEnemyCharacter.defendPower);
                    // dp.text("Counter Attack Power: " + selectedEnemyCharacter.defendPower);  
                    button.text("Attack");
    
                    $(".defending-enemy").append(img);
                    $(".defending-enemy").append(stats);
                    $(stats).append(hp,dp);    
                    $(".attack-area").append(button);
                }
                var img = $('.defending-enemy img.char-img');
                var hp = $('#computer-hp');
                var dp = $('#computer-defend-power');
    
                img.attr("src", selectedEnemyCharacter.image);
                img.attr("select-data", selectedEnemyCharacter.select);
                hp.html("Name: " + selectedEnemyCharacter.character + 
                    "<br> Current Health Points: " + selectedEnemyCharacter.hp + "<br>" +
                    "Counter Attack Power: " + selectedEnemyCharacter.defendPower);
                // dp.text("Counter Attack Power: " + selectedEnemyCharacter.defendPower);                
            } else{
                var selectedEnemyTitle = $("<h2>");
                var img = $("<img>");
                var button = $('<button id="attack">');
                var stats = $('<div id="computer">');
                var hp = $('<p id="computer-hp">');
                var dp = $('<p id="computer-defend-power">');
    
                selectedEnemyTitle.text("Chosen Enemy to Fight");        
                img.addClass("char-img");
                img.attr("src", selectedEnemyCharacter.image);
                img.attr("select-data", selectedEnemyCharacter.select)
                hp.html("Name: " + selectedEnemyCharacter.character + 
                    "<br> Current Health Points: " + selectedEnemyCharacter.hp + "<br>" +
                    "Counter Attack Power: " + selectedEnemyCharacter.defendPower);
                // dp.text("Counter Attack Power: " + selectedEnemyCharacter.defendPower);        
                button.text("Attack");
    
                $(".defending-enemy-title").append(selectedEnemyTitle);
                $(".defending-enemy").append(img);
                $(".defending-enemy").append(stats);
                $(stats).append(hp,dp);
                $(".attack-area").append(button);
            }
    
        });        
}


$( document ).ready(function() {
    startGame(selectCharacter);

    $(document).on("click", '#attack', function() {
        attack(selectedCharacter, selectedEnemyCharacter);

        if (didCharacterDie(selectedCharacter)) {
            var restartButton = $('<button id="restart" class="game-over-loss">')
            var gameOver = $('<h1 id="game-over" class="game-over-loss"><br>');

            restartButton.text("Restart Game");
            $('.selected-character').empty();
            $('#attack').remove();
            $('.container').animate({opacity: ".15"});

            $('body').append(gameOver).append(restartButton);
            $('#game-over').text("Your Character Died, Game Over!");
        } else if (didCharacterDie(selectedEnemyCharacter)) {
            $('.defending-enemy').empty();
            $('#attack').remove();
            $('#' + selectedEnemyCharacter.select).remove();
            
            enemies = enemies.filter(function( enemyChar ) {
                return enemyChar.select !== selectedEnemyCharacter.select;
            });

            if (!enemies.length) {
                $('#attack').remove();
                $('.container').animate({opacity: ".15"});

                var restartButton = $('<button id="restart" class="game-over-won">')
                var gameOver = $('<h1 id="game-over" class="game-over-won"><br>');
    
                restartButton.text("Restart Game");

                $('body').append(gameOver).append(restartButton);
                $('#game-over').text("You saved the Galaxy, you Won!");
            }

        } else {    
            $('#player-hp').html("Name: " + selectedCharacter.character + 
            "<br> Current Health Points: " + selectedCharacter.hp + "<br>" +
            "Current Attack Power: " + selectedCharacter.attackPower);
            // $('#player-attack-power').html("Current Attack Power: " + selectedCharacter.attackPower);
            $('#computer-hp').html("Name: " + selectedEnemyCharacter.character + 
            "<br> Current Health Points: " + selectedEnemyCharacter.hp + "<br>" +
            "Counter Attack Power: " + selectedEnemyCharacter.defendPower);
            // $('#computer-attack-power').html("Counter Attack Power: " + selectedEnemyCharacter.defendPower);   
        }
    });

    $(document).on("click", '#restart', function () {
        resetGame();
    });
});