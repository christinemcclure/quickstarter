$(document).ready(function() {
    
    var pagesPath = "/pages/"; // will need to change when switching to app or galvin site
    var animationTime = 800;
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
            $('#noJS').addClass('hide');
            $('#quickstarter').removeClass('hide');
            $('#startOverBtn').hide();
            $('#goBackBtn').hide();
            $('#descriptor').text('Find the resource you need by answering a few questions:'); 
            $('#qsAnswers').empty().css({'top':'1000px', 'left':'100%'}); 
            // For some reason, 100% top doesn't work. Could calculate from height of window, but this is adequate.
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

//Same as loadPage in common functions, but keeping separate for app         
function loadQSPage(pageName, element){
    if(pageName){
        $.ajax({
            type: "POST",
            url: pageName,
            cache: false,
            dataType: "text",
            success: onSuccess
        });
    }
    $(element).ajaxError(function(event, request, settings, exception) {
    $(element).html("Error Calling: " + settings.url + "<br />HTPP Code: " + request.status);});
    function onSuccess(data){	
        $(element).html(data);
    }
}            
            
function loadAnswer(page, items){
//    $('#query').fadeOut(animationTime);
    fadeOutItems(items);
    $('#descriptor').text(' ').fadeIn(animationTime); // use a space instead of fading out to keep location static
    loadQSPage(pagesPath+page, "#qsAnswers");
    $('#query').text('Try this:').fadeIn(animationTime);
    $('#startOverBtn').fadeIn(animationTime);
    $('#goBackBtn').fadeIn(animationTime);    
    var top = $('#query').offset().top;// use query object because qsContainer is flexible
    var height = $('#query').height();
    var setTop = top + height +20; 
    setTop = setTop + 'px';
//    alert(top + ' + ' + height + ' = ' + myOffset);
    $('#qsAnswers').animate({
        position:'relative',
        width:'80%',
        top:setTop,
        left:"10%" // matches leftover from width
        },animationTime);            
}            

    // TITLE items
    $("#qsContainer").on("click", "#mainTitle", function(event){
            $('#query').fadeOut(animationTime);
            $('#descriptor').text(' ').fadeIn(animationTime); // use a space instead of fading out to keep location static
            fadeOutItems(mainItems);
            $('#query').text('Is this a . . .').fadeIn(animationTime);
            fadeInItems (titleItems, 'button');
            $('#startOverBtn').fadeIn(animationTime);
            $('#goBackBtn').fadeIn(animationTime);


    });

    $("#qsContainer").on("click", "#book", function(event){
        loadAnswer("books.html", titleItems);   
    });
    
    $("#qsContainer").on("click", "#article", function(event){
        loadAnswer("articles.html", titleItems);
    });
    
    $("#qsContainer").on("click", "#journal", function(event){
        loadAnswer("journals.html", titleItems);
});

// Thesis items
    $("#qsContainer").on("click", "#thesis", function(event){
            $('#query').fadeOut(animationTime);
            $('#descriptor').text(' ').fadeIn(animationTime); // use a space instead of fading out to keep location static
            fadeOutItems(titleItems);
            $('#query').text('Is this a . . .').fadeIn(animationTime);
            fadeInItems (thesisItems, 'button');
    });
    
        $("#qsContainer").on("click", "#master", function(event){
            loadAnswer("masters.html", thesisItems);
        });

        $("#qsContainer").on("click", "#phd", function(event){
            loadAnswer("phds.html", thesisItems);
        });

        $("#qsContainer").on("click", "#unknown", function(event){
            loadAnswer("masters.html", thesisItems);
        });
        
    
    $("#qsContainer").on("click", "#database", function(event){
        loadAnswer("databases.html", titleItems);
    });
    
    $("#qsContainer").on("click", "#mainJournal", function(event){
        loadAnswer("journals.html", mainItems);       
    });
    
    $("#qsContainer").on("click", "#mainResearch", function(event){
        loadAnswer("research.html", mainItems);
    });


    $("#qsContainer").on("click", "#mainOther", function(event){
        loadAnswer("other.html", mainItems);
    });            
            

}); // end doc ready

