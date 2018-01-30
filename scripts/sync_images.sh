#!/bin/bash
set -e

#Sourcing the env file
source /opt/foodbox_menu_display/.bootstraprc

#Running the rsync command
rsync -rzvh -e "ssh -p 2225" --delete-after $REMOTE_SOURCE_FOLDER $SOURCE_FOLDER
