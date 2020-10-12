BRANCH=$1
if [ "${BRANCH}" == "master" ]
 then
  sshpass -p $scp_pass scp -v -o StrictHostKeyChecking=no ./dist/* $scp_user@$scp_dest/
  curl -X POST -H 'Content-type: application/json' --data '{"text":"deploy skisser"}' $slackaddy
fi