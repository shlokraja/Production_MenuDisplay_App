if [ $# -ne 1 ]; then
  echo "Usage: $0 <sold_image_location>"
  echo "E.g. $0 /home/agniva/sold_out.png"
  exit 1
fi

if [[ $SOURCE_FOLDER == "" ]]; then
  echo "Source the .bootstraprc file first"
  exit 1
fi

#Cleanup old sold images
echo "Cleaning up sold images first"
find $SOURCE_FOLDER -type f -name '*_sold.png' -delete

#Create copies
echo "Creating copies from original images"
node generateCopies.js

#Create superimposed
echo "Creating superimposed images"
sync
node generateSuperimposed.js $1

#Create grayscale
echo "Converting image to grayscale"
sync
node generateSoldImages.js
