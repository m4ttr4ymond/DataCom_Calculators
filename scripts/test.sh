# !/bin/bash

echo "Compiling ts to js..." &&
# tsc ts/*.ts --outDir js/ --module amd --moduleResolution node &&
tsc ts/*.ts --outDir js/ &&
echo "Running index.js..." &&
npm start
