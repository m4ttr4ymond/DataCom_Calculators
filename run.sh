#!/bin/bash

# source
SRC="ts/"

# destination
DST="js/"

# compile javascript
tsc ${SRC}*.ts --out ${DST}out.js

# execute js
node js/out.js
