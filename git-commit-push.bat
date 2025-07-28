@echo off
REM Batch script to add, commit, and push all changes

git add -A
set /p msg="Enter commit message: "
git commit -m "%msg%"
git push
pause 