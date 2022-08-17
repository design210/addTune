#!/bin/sh
ssh -i ~/.ssh/addtunedev addtune@192.168.40.200 "rm -rf /home/addtune/*"
scp -i ~/.ssh/addtunedev -rp * addtune@192.168.40.200:/home/addtune
