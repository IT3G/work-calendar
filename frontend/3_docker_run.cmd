call docker rm calendar-frontend --force
call docker run --name calendar-frontend -p 8089:80 -it calendar-frontend