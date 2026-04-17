@echo off
echo ==========================================
echo      NOOK WEBSITE FIX TOOL
echo ==========================================
echo.
echo 1. Cleaning corrupted installations...
rmdir /s /q node_modules
del package-lock.json

echo.
echo 2. Installing fresh dependencies...
call npm install

echo.
echo 3. Installation Complete! 
echo.
echo Starting server...
npm run dev
pause
