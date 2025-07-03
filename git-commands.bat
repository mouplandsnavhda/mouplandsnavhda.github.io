@echo off
REM Git Commands Helper for Missouri Uplands NAVHDA Website
REM Usage: git-commands.bat [command] [optional-message]

set GIT_PATH="C:\Program Files\Git\bin\git.exe"

if "%1"=="status" (
    %GIT_PATH% status
    goto :eof
)

if "%1"=="add" (
    %GIT_PATH% add .
    echo Added all changes to staging area
    goto :eof
)

if "%1"=="commit" (
    if "%2"=="" (
        %GIT_PATH% commit -m "Update website content"
    ) else (
        %GIT_PATH% commit -m "%2"
    )
    echo Committed changes
    goto :eof
)

if "%1"=="push" (
    %GIT_PATH% push origin master
    echo Pushed changes to GitHub
    goto :eof
)

if "%1"=="pull" (
    %GIT_PATH% pull origin master
    echo Pulled latest changes from GitHub
    goto :eof
)

if "%1"=="log" (
    %GIT_PATH% log --oneline -10
    goto :eof
)

if "%1"=="diff" (
    %GIT_PATH% diff
    goto :eof
)

if "%1"=="quick" (
    %GIT_PATH% add .
    %GIT_PATH% commit -m "Quick update - %date% %time%"
    %GIT_PATH% push origin master
    echo Quick commit and push completed!
    goto :eof
)

echo Git Commands Helper
echo ==================
echo Available commands:
echo   status    - Show current status
echo   add       - Add all changes
echo   commit    - Commit changes (with optional message)
echo   push      - Push to GitHub
echo   pull      - Pull from GitHub
echo   log       - Show recent commits
echo   diff      - Show changes
echo   quick     - Add, commit, and push all changes
echo.
echo Examples:
echo   git-commands.bat status
echo   git-commands.bat commit "Updated security headers"
echo   git-commands.bat quick 