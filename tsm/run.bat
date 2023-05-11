@echo off

:loop
Deno run --no-check --allow-all script.ts
pause

goto loop