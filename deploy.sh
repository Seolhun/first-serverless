git add .
msg = "[Serverless] - "
if [ $# -eq 0 ]
	then msg="[Serverless] - Updated project at `date`"
elif [ $# -eq 1 ]
	then msg="$1"
fi

git commit -m "$msg"
git push
