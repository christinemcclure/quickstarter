$(document).ready(function() {
    // save original container items
    var startingPoint = $('#qsContainer').html();
    var animationTime = 500;
    var pauseTime = 2000;
    var itemH=200;
    var itemW=300;
    var mainItems = new Array(
    {id:'mainTitle', text:'a specific title...'},
    {id:'mainJournal', text:'a journal...'},
    {id:'mainResearch',text:'research materials about...'},
    {id:'mainOther', text:'something else...'}
    );

    var titleItems = new Array(
    {id:'book', text:'Book?'},
    {id:'article', text:'Article?'},
    {id:'thesis',text:'Thesis?'},
    {id:'journal', text:'Journal?'},
    {id:'database', text:'Database?'}
    );

    var thesisItems = new Array (
    {id:'master', text:'IIT Master\'s thesis'},
    {id:'phd', text:'Dissertation'},
    {id:'unknown', text:'I\'m not sure.'}
    );


    // function 
    (function($){ 
        init=function() {
            $('#startOverBtn').hide();
            $('#qsContainer').html(startingPoint);
            $('#qsAnswers').find('.answer').hide();		
            printItems(mainItems, 'button');
            $('#qsContainer').prepend('<h2 id="query">I\'m looking for...</h2>');
        }
    })($);
    
    

    function startOver (){
    $('#qsContainer').empty();
    init();			
    }

    //prints an array of objects, wrapped in a specified tag 
    function printItems (arr, tag){
            for(i in arr) {
                    var obj = arr[i];
                    var newItem = '<' + tag + ' id=' + obj.id + '>' + obj.text + '</' + tag + '>';
                    $('#qsContainer').append(newItem);
            }
    }

    function fadeInItems (arr, tag){
            for(i in arr) {
                    var obj = arr[i];
                    var newItem = '<' + tag + ' id=' + obj.id + '>' + obj.text + '</' + tag + '>';
                    $('#qsContainer').hide().append(newItem).fadeIn(animationTime);
            }
    }

    function animateItem (item)	{
                    $('#'+item).animate({
                            x:100,
                            y:100,
                            width: itemW,
                            height: itemH
                            },animationTime);
    }

    function fadeOutItems(itemArr) {
    for (i in itemArr) {
            $('#'+itemArr[i].id).fadeOut(animationTime, function() {
                    $(this).remove(); // remove must be used as the callback function for fadeOut or it happens immediately
            });
    }
    }// end function



    $('#startOverBtn').click(function(){
                    startOver();
    });			

    // TITLE items
    $("#qsContainer").on("click", "#mainTitle", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(mainItems);
            $('#query').text('Is it a . . .').fadeIn(animationTime);
            fadeInItems (titleItems, 'button');
            $('#startOverBtn').fadeIn(animationTime);
    });

    $("#qsContainer").on("click", "#book", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(titleItems);
            $('#textbooks').fadeIn(animationTime);
            $('#otherBooks').fadeIn(animationTime);
    });

    $("#qsContainer").on("click", "#article", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(titleItems);
            $('#articles').fadeIn(animationTime);
    });

    $("#qsContainer").on("click", "#thesis", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(titleItems);
            $('#query').text('Is this a . . .').fadeIn(animationTime);
            fadeInItems (thesisItems, 'button');
    });

                    $("#qsContainer").on("click", "#master", function(event){
                            $('#query').fadeOut(animationTime);
                            fadeOutItems(thesisItems);
                            $('#masters').fadeIn(animationTime);
                    });

                    $("#qsContainer").on("click", "#phd", function(event){
                            $('#query').fadeOut(animationTime);
                            fadeOutItems(thesisItems);
                            $('#phds').fadeIn(animationTime);
                    });

                    $("#qsContainer").on("click", "#unknown", function(event){
                            $('#query').fadeOut(animationTime);
                            fadeOutItems(thesisItems);
                            $('#unknowns').fadeIn(animationTime);
                    });


    $("#qsContainer").on("click", "#journal", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(titleItems);
            $('#journals').fadeIn(animationTime);
    });

    $("#qsContainer").on("click", "#database", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(titleItems);
            $('#databases').fadeIn(animationTime);
    });


    $("#qsContainer").on("click", "#mainJournal", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(mainItems);
            $('#journals').fadeIn(animationTime);
            $('#citations').fadeIn(animationTime);
            $('#startOverBtn').fadeIn(animationTime);
    });


    $("#qsContainer").on("click", "#mainResearch", function(event){
            $('#query').fadeOut(animationTime);
            fadeOutItems(mainItems);
            $('#researchGuides').fadeIn(animationTime);
            $('#metaLib').fadeIn(animationTime);
            $('#googleScholar').fadeIn(animationTime);
            $('#startOverBtn').fadeIn(animationTime);
    });




});

