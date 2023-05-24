@echo off

IF not EXIST "script.ts" (
    ::copy the script.ts file directly from /files/script.ts into map dir
    
    echo "Downloading script.ts..."
    curl -o script.ts https://raw.githubusercontent.com/Splashcard04/KeyMapper/main/files/script.ts
)

:loop
:: clear console on refresh
cls

:: run the script
Deno run --no-check --allow-all script.ts
::await user input to refresh again
pause

::activate the loop
goto loop