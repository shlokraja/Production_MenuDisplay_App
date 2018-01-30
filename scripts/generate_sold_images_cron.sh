source /opt/foodbox_menu_display/.bootstraprc

ulimit -n 32768

if [[ $SOURCE_FOLDER == "" ]]; then
  echo "Source the .bootstraprc file first"
  exit 1
fi

#Cleanup old sold images
echo "Cleaning up sold images first"
find $SOURCE_FOLDER -type f -name '*_sold.png' -delete

#Create copies
echo "Creating copies from original images"
node /opt/foodbox_menu_display/scripts/generateCopies.js

#Create superimposed
echo "Creating superimposed images"
sync
node /opt/foodbox_menu_display/scripts/generateSuperimposed.js /home/atchayam/sold_out.png

#Create grayscale
echo "Converting image to grayscale"
sync
node /opt/foodbox_menu_display/scripts/generateSoldImages.js
