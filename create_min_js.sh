#!/bin/sh

TARGET=./lib/rock/webapp/ui/tasks/js/api/orocos.min.js

echo '/** Auto-generated file, do not edit */' > $TARGET

#cat ./lib/rock/webapp/ui/js/external/jquery-2.1.1.js >> $TARGET

cat ./lib/rock/webapp/ui/js/api/WebSock.js >> $TARGET
cat ./lib/rock/webapp/ui/js/api/JSON.js >> $TARGET

cat ./lib/rock/webapp/ui/tasks/js/api/orocos/Orocos.js >> $TARGET
