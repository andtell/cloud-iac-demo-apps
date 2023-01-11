
#  https://askubuntu.com/questions/76808/how-do-i-use-variables-in-a-sed-command
#  https://stackoverflow.com/questions/5171901/find-and-replace-in-file-and-overwrite-file-doesnt-work-it-empties-the-file

echo "** Updating to new verison '$1' **"

sed -i .bak 's+andtell/vote-app:.*$*+andtell/vote-app:'$1'+' dev/deployment.yaml