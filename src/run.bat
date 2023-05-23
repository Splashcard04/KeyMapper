@echo off

::clr = clear console on refresh

if exist "kmconfig.ini" (

    for /f "tokens=1,2 delims==" %%a in (settings.ini) do (
    if %%a==clr set %%a=%%b
    )

) else (
    echo Keymapper Setup:
    set /p "clr=Clear Console On Refresh? (y/n)"
    if %clr% = "y" do (
        echo clr=true >> "kmconfig.ini"
    ) else (
        echo clr=false >> "kmconfig.ini"
    )
)

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