cd ..
call git subtree push --prefix backend heroku master
call heroku logs --tail