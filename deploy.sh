BRANCH=$1
FILENAME=skisser.tar.gz
echo "copying .htaccess"
cp --verbose .htaccess dist/artsobservasjoner-fe/
echo "Making archive"
tar --directory=dist -zcf $FILENAME .
if [ "${BRANCH}" == "master" ]
 then
  sshpass -p $scp_pass scp -v -o StrictHostKeyChecking=no $FILENAME $scp_user@$scp_dest/
  curl -X POST -H 'Content-type: application/json' --data '{"text":"deploy skisser"}' $slackaddy
fi
