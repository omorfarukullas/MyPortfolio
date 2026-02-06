@echo off
echo Restructuring MyPortfolio directory...

REM Remove old nested structure
rd /s /q "c:\Users\omorf\Desktop\MyPortfolio\MyPortfolio" 2>nul

REM Move all files from portfolio to MyPortfolio
xcopy "c:\Users\omorf\Desktop\portfolio\*" "c:\Users\omorf\Desktop\MyPortfolio\" /E /H /Y /I

REM Remove portfolio folder
rd /s /q "c:\Users\omorf\Desktop\portfolio"

echo Done! Your project is now at Desktop\MyPortfolio
