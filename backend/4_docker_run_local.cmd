call docker rm calendar-backend --force
call docker run --name calendar-backend -p 3000:3000 -it calendar-backend:latest