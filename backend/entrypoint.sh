#!/bin/sh
#set -x
echo "Listening Xvfb on $DISPLAY"
Xvfb -ac -listen tcp $DISPLAY &
sleep 10
npm run start:nodeserver