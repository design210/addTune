#!/bin/bash

echo ">> start of deploy ... "

# All deploy files "cp" to apache root directory
# -r 옵션을 사용하지 않으면 폴더복사를 못함
rm -rf /home/centos/addTune/js
rm -rf /home/centos/addTune/css
rm -rf /home/centos/addTune/fonts
rm -rf /home/centos/addTune/img
rm -rf /home/centos/addTune/ad
rm -rf /home/centos/addTune/main
rm -rf /home/centos/addTune/report
rm -rf /home/centos/addTune/service
\cp -rf /home/centos/deployZip/* /home/centos/addTune

echo ">> end of deploy ... "