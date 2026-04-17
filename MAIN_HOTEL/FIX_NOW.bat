@echo off
echo Cleaning npm cache...
call npm cache clean --force

echo Removing node_modules and package-lock.json...
rmdir /s /q node_modules
del package-lock.json

echo Installing dependencies...
call npm install
call npm install framer-motion lucide-react react-router-dom

echo Starting development server...
call npm run dev
pause
