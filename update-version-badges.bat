@echo off
REM Update version badges in all HTML files (recursively) to match the current version in release-notes/VERSION.md

REM Extract version number from VERSION.md (line starting with '## Current Version:')
for /f "tokens=4 delims= " %%A in ('findstr /C:"## Current Version:" release-notes\VERSION.md') do set VERSION=%%A

if "%VERSION%"=="" (
  echo Could not find version in release-notes\VERSION.md
  exit /b 1
)

echo Updating version badges to v%VERSION% in all HTML files (recursive)...

REM Recursively update all HTML files
for /r %%F in (*.html) do (
  if exist "%%F" (
    REM Use PowerShell to replace the badge text
    powershell -Command "(Get-Content -Raw '%%F') -replace '<span class=\"badge badge-primary\">v[0-9.]+</span>', '<span class=\"badge badge-primary\">v%VERSION%</span>' | Set-Content '%%F'"
  )
)

echo Version badges updated to v%VERSION% in all HTML files (recursive). 