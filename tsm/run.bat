@echo off

IF EXIST "script.ts" (
    ::Literally just does nothing 💀
    cls 
) ELSE (
    ::copy the script.ts file directly from /files/script.ts into map dir
    echo "Downloading script.ts..."
    curl -o script.ts https://raw.githubusercontent.com/Splashcard04/KeyMapper/main/files/script.ts
)

:loop
:: clear console on refresh
cls

:: run the script
echo "Restarting TSM..."
Deno run --no-check --allow-all script.ts
::await user input to refresh again
pause

::activate the loop
goto loop