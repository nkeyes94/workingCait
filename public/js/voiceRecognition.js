    //                                          *********************** 
    //                                          *** Note before use ***
    //                          ! This script will ONLY EXECUTE IN CHROME AND FIREFOX
    //                              ! The webpack doesn't support other browsers
    //                                          ***********************
    //                                          ***********************

    $(document).ready(function(){
        console.log("PUB FOLDER");
        // * Selecting our run button.
        $runBtn = $("#thisButton");
        
        
        // * Ensuring the button works
        $runBtn.on("click", function(){                    // ? When clicked...
            console.log("Run btn hit");                    // ? ...Log the event...
            recognition.start();                           // ? ...Start the voice recognition.
        });
    
        // * Need a global var to save the user input to
        const userInput ="";
    
        // * Getting the speech recognition packages
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    
        // * Grammar config
        // * In this case, we're using Java Speech Grammar Format (JSGF)
        var grammar = "#JSGF V1.0";
    
        // * Configuring the recognition API
        var recognition = new SpeechRecognition();          // ? Create a new speech recognition
        var recognitionList = new SpeechGrammarList();      // ? Create a new grammar list
        recognitionList.addFromString(grammar, 1);          // ? Load the new grammar list with our JSGF
        recognition.lang = "en-US";                         // ? Setting the language to English-US
        recognition.interimResults = false;
    
        // * Setting up a second recognition call. This one is for interracting with the AI better
        var dialogue = new SpeechRecognition();
        var dialogueList = new SpeechGrammarList();
        dialogueList.addFromString(grammar, 1);
        dialogue.lang = "en-US";
        dialogue.interimResults = false;
    
        dialogue.onspeechend = function(){
            dialogue.stop();
        }
    
        // * Creating a function for when a command is entered
        recognition.onresult = function(e){
            var last = e.results.length - 1;                // ? Get the last result
            var command = e.results[last][0].transcript;    // ? Get the last result's transcript
            var userInput = command.trim().toLowerCase();   // ? Save the transcript to the global
            console.log("Voice input: " + command);         // ? Console log the transcript
            console.log(userInput);
            // * Command checking
            // * After a command is made, we should check it against our command arrays
                // TODO: Find a more effecient way to do this
                // TODO: Look into using FS, and saving these commands to individual text files
            if(greetings.includes(userInput)){                                      // ? If the user commmand is in the greetings arr
                console.log("Found in greetings");                                  // ? Log that it's been found 
                var selector = randomNum(greetings);                                // ? Return a randomly generated greeting
                responsiveVoice.speak(greetings[selector]);                         // ? Issue a voice response for the greeting
                console.log(greetings[selector]);
                                       
            } else if(command.includes("what is the weather in")){                  // ? If the user command includes a request for weather
                getWeather(command);                                                // ? Launch the weather function (line 132)
            } else if(command.includes("what is today's date")){                  // ? If the user command includes a request for weather
                getDate();                                                // ? Launch the weather function (line 132)
            } else if(command.includes("what time is it")){                  // ? If the user command includes a request for weather
                getTime();                                                // ? Launch the weather function (line 132)
            } else if(command.includes("open")){                                    // ? If the user command has "open" in it
                openSite(userInput);                                                // ? Launch the open external website function (Line 162)
            } else if(command.includes("show me recipes for")){                     // ? If the user command has "show me recipes for" in it
                recipeSearch(userInput);                                            // ? Launch the recipe search function (Line 178)
            } else if(command.includes("show me directions from")){                 // ? If the user command has "show me" in it
                directions(userInput);                                              // ? Launch the recipe search function (Line 178)                             
            } else if(command.includes("get directions from")){                     // ? If the user command has "show me" in it
                directions(userInput);                                              // ? Launch the recipe search function (Line 178)                             
            } else if(command.includes("show me the traffic for my drive to")){     // ? If the user command has "show me" in it
                directions(userInput);                                              // ? Launch the recipe search function (Line 178)                             
            } else if(command.includes("what does traffic look like from")){        // ? If the user command has "show me" in it
                directions(userInput);                                              // ? Launch the recipe search function (Line 178)                             
            } else if(command.includes("help me with coding")){                     // ? If the user command has "help me with coding" in it
                codeHelper(userInput);                                                  // ? Launch the recipe search function (Line 266)                             
            } else {
                console.log("Undefined");                                           // ? Otherwise if the command can't be found, return undefined
                // ? Issue a response if the command is undefined
                responsiveVoice.speak("I'm sorry, I don't understand your command");
            }
        };
    
        // * Once voice input is no longer detected, stop the recognition software
        // * Note: This is built in functionality of the webpack
        recognition.onspeechend = function(){
            recognition.stop();
        };
    
        // * If there is an error, we will log the error
        // ! Common errors I've come across thus far
            // ! "Network" -> This is likely due to not using Chrome or Firefox (The webpack *ONLY* works with these browsers)
            // ! "HTML Error, Undefinted" -> This happens when you try to start another command while the program is parsing one
                // ? It takes approximately 1-2 seconds for the commmand to be returned as text
        recognition.onerror = function(err){
            console.log(err);
        };
    
        // * We can now begin to configure different commands with the voice recognition
    
        // * For statements, we can make a random number generator.
        function randomNum(arr){                                            // ? The arr takes the argument of an arr...
            var randomNumber = Math.floor(Math.random() * arr.length);      // ? ...then gets it's length for the maximum cap on the random function
            return randomNumber;                                            // ? And returns a random number generated from this
        }
    
        // TODO: Program different functions and commands based around the input text.
    
        // * An array of greetings
        const greetings = [
            "hello",
            "hi",
            "whats up?",
            "hey"
        ];
    
        // * Known commands
        const commands = [
            "what time is it",
            "what is today's date",
            "what is the weather in",
            "open",
            "show me recipes for",
            "show me directions from",
            "get directions from",
            "show me the traffic for my drive to",
            "what does traffic look like from",
            "help me with coding"
        ]
    
        const codingAsist = [
            "make a for loop",
        ]
    
        // * The correlating functions for the previous commands arr
        const commandFunctions = [
            getTime(),                                                    // ? Function to get the time (Line 116)
            getDate(),                                                    // ? Function to get the date (Line 123)
            openSite(),                                                   // ? Function to open an external website (Line 162)
            recipeSearch(),                                               // ? Function to search recipes (Line 178)
            directions(),                                                 // ? Function to get directions (Line 209)
            codeHelper(),                                                 // ? Function to get help with coding (Line 266)
        ]
    
        // * Might be beneficial to have different arrays to hold different but related commands.
        // * This way we can search for specific keywords in a user input and launch an appropriate command
        const weatherCommands = [
            "what is the weather in",
            "what's the weather in",
            "whats the weather in",
            "tell me the weather for"
        ]
    
        // ***************************************************************************************************************************
        //                                          TODO: CUSTOM FUNCTIONS LISTED BELOW
        // ***************************************************************************************************************************
    
        // * Simple function for getting the time.
        function getTime(){
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            responsiveVoice.speak("The current time is "+ time);
            return time;
        }
    
        // * Simple function for getting the date.
        function getDate(){
            var today = new Date();
            var date = today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear();
            responsiveVoice.speak("Todays date is "+ date);
            return date;
        };
    
        // * Open a website
        // ? The command to open an external website is "open <web address>" i.e. "open google.com"
        // ? First we seperate the website
        // ? Then CAIT say "opening <website>"
        // ? Then a new tab opens with the requested site
        function openSite(string){
            var n = string.split(" ");                      // ? Turn the expression into an arr
            // var lastWord = n.pop();
            var lastWord = n.filter(e => e !== "open")                         // ? Pop to remove/return the last element. The last element will the website
            responsiveVoice.speak("Opening " + lastWord);   // ? Responding voice with the website to open
            console.log("Opening", lastWord);
            window.open("http://www." + lastWord.join().replace(/,/g, ""));          // ? Opening the website requested in a new tab
        };
    
        // * My recipe search
        function recipeSearch (string){
            var n = string.toLowerCase().split(" ");                  // ? Turn the expression into an arr and lower case
            var x = n.indexOf("for");
            var y = n.slice(x);
            var recipe = y.filter(e => e !== "for");
            console.log("recipe for ", recipe.join().replace(/,/g, (" ")));
            responsiveVoice.speak("recipes for " + recipe.join().replace(/,/g, (" ")));          // ? Responding voice with the recipes to open
            console.log("Opening ", recipe, " Recipe");
            window.open("https://api.edamam.com/recipes/" + recipe.join().replace(/,/g, ("+"))); // ? for now opens recipes in a new tab
        };
    
        function directions (string) {
    
                            // * Separating our starting and ending addresses from the voice command
    
            var n = string.toLowerCase().split(" ");                  // ? Turn the expression into an arr and lower case
            var y = string.toLowerCase().split(" ");                  // ? Assigning the array to a new variable in case of mutation
            var to = n.indexOf("to");                                 // ? Finding the index of "to" as a starting point to seperate the addresses
            var startIndex = to;                                      // ? Assinging "to" index to a new variable for mutation
            y.length = startIndex;                                    // ? Mutating the length of y to include everything before the word "to"
            var from = y.indexOf("from");                             // ? Finding the index of the word "from"
            var z = y.slice(from);                                    // ? Mutating the array to remove to command phrase 
            var start = z.filter(e => e !== "from")                   // ? Removing "from" from the array to complete the (start) address variable
            console.log("start", start);                              // ? Print the "start" variable to the console
            var x = n.slice(to);                                      // ? Removing everything from the n array before the "to" index
            var end = x.filter(e => e !== "to");                      // ? Removing "to" from the array to complete the "end" variable  
            console.log("end", end);                                  // ? Print the "end" variable to the console
    
                // * Inserting our starting and ending addresses into the URL to open a new tab with directions and traffic
    
            window.open("https://www.google.com/maps/dir/"+start+"/"+ end);
            responsiveVoice.speak("Getting directions, and driving time from " + start.join().replace(/,/g, " ") + " to " + end.join().replace(/,/g, " "));
        };
    
        // * Weather function
        // ? The weather command is "What is the weather in <location>"
        // ? First we need to get the location
        function getWeather(string){
            var n = string.toLowerCase().split(" ");                // ? Turn the expression into an arr and lower case         
            var x = n.indexOf("in");                                // ? Finding the index of "in" in order to seperate the command from the location
            var y = n.slice(x);                                     // ? Removing everything from the n array before the "in" index      
            var location = y.filter(e => e !== "in")                // ? Removing "in" from the array to complete the "location" variable  
        
            console.log("Location test: "+ location);               // ? Testing the last element
                                                                    // ! ^---This line can be removed for production version
    
            // * Now that we have the location, we can test further
            // * Since for the weather command, the last word is the location, we can pass that into an API. 
            var weatherApiKey = "45fcf52b47d79723b15c821561fb0595";
            // * QueryURL lastWord var is the location in the command.
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=imperial&APPID="+ weatherApiKey;
            $.ajax({
                url: queryURL,                              // ? Send the request to the queryURL above
                method: "GET"
            }).then(
                function(response){                         
                    console.log(response);
                    console.log("The weather in "+ location + " is..")         // ? Return the response name
                    console.log(response.weather[0].description);                   // ? Description of the weather (rain, partly cloudy, etc)
                    console.log("With a temperature of: "+ response.main.temp);     // ? And temperature in F
                    responsiveVoice.speak("The current weather in "+ location.join().replace(/,/g, " ") +
                    ". The temperature is "+ response.main.temp +" degrees fahrenheit with "
                    + response.weather[0].description);
                }
            )
        };
    
        function codeHelper(string){
            var n = string.toLowerCase().split(" ");                
            var x = n.indexOf("coding");                                
            var y = n.slice(x);                                    
            var topic = y.filter(e => e !== "coding")
            console.log("Code Topic: "+ topic);              
        }
    
        // * Testing the coding assistant functionality.
            // ? The idea behind this is having a coding assistant. This can be a reference for coding. 
            // ? Other functions can be added to this
                // TODO: Once the response comes throguh, create a popup window
                // TODO: The popup window should display the code and have a "copy to clipboard" button
        function createForLoop(stirng){
            responsiveVoice.speak("Okay! Creating for loop.");                      // ? Acknowledge command
            responsiveVoice.speak("How many iterations would you like to do?")
                .then(recognitionStart())
                .then(function(command){
                    responsiveVoice.speak("Creating a loop with "+ command +" iterations.");
                })
    
        }
    
        // * News
            // ? A user may want to check headlines for that day
            // ? By saying a command, return 10 headlines
            // ? Put the headlines into an arr, and ask the user if they'd like to hear more about the stories
            // ? If yes, read a summary of the story
    
    })