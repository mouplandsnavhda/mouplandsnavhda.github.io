@echo off
echo Starting HTTP server on port 8088...
echo Open your browser and go to: http://localhost:8088
echo Press Ctrl+C to stop the server
echo.
powershell -ExecutionPolicy Bypass -File start-server.ps1
pause 