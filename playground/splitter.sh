#! /bin/bash

x="00:00:00"
z=0
filename=$(basename -- "$2")
ext="${filename##*.}"
filename="${filename%.*}"
initcmd="ffmpeg  -nostdin -hide_banner -loglevel error -i $2"
while read y
do
initcmd+=" -ss $x -to $y -c copy $filename$z.$ext"
let "z=z+1"
x=$y
done < $1
$initcmd