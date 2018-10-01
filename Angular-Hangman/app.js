var app=angular.module("HangmanGame", []);
app.controller("GameControls", ['$scope', '$timeout', function($scope, $timeout){

var wordsgen=["summer", "letter", "canada", "awkward", "winter", "Bagpipes", "Banjo", "Dwarves", "Jazzy", "Jukebox", "Oxygen", "Zombie", "Twelfth", "Pixel", "Rogue", "Gypsy","Fishhook"];
$scope.incorrectLettersChosen=[];
$scope.correctLettersChosen=[];
$scope.guess = 6;
$scope.displayWord = '';
$scope.input = {
    letter : ''
}

var selectRandWord = function(){
    var index = Math.round(Math.random()*wordsgen.length);
    return wordsgen[index];
}

var newGame = function(){

    $scope.incorrectLettersChosen=[];
    $scope.correctLettersChosen=[];
    $scope.guess = 6;
    $scope.displayWord = '';

    selectedWord = selectRandWord();
    var tempDisplay = '';
    for (var i = 0; i < selectedWord.length; i++) {
        tempDisplay += '*';
    }
    $scope.displayWord = tempDisplay;
    
}

$scope.letterChosen = function(){
    for (var i = 0; i < $scope.correctLettersChosen.length; i++){
        if($scope.correctLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter = "";
            return;
        }
    }

    for (var i = 0; i < $scope.incorrectLettersChosen.length; i++){
        if($scope.incorrectLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter = "";
            return;
        }
    }

    var correct = false;
    for (var i = 0; i < selectedWord.length; i++) {
        if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
            correct = true;
        }
    }
    if(correct){
        $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
    }
    else{
        $scope.guess--;
        $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
    }
    $scope.input.letter = "";
    if($scope.guess == 0){
        
        $timeout(function(){
            newGame();
        }, 500);
    }
    if($scope.displayWord.indexOf("*")==-1){
        
        $timeout(function(){
            newGame();
        }, 500);
    }


}
newGame();

}]);