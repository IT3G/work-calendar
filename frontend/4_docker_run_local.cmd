call docker rm calendar-frontend --force
call docker run --name calendar-frontend -p 8089:80 -it 172.17.21.6:8888/calendar-frontend:latest