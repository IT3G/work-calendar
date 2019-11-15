docker pull 172.17.21.6:8888/calendar-frontend:latest
docker rm calendar-frontend --force
docker run --name calendar-frontend -d -p 8089:80 -it 172.17.21.6:8888/calendar-frontend:latest