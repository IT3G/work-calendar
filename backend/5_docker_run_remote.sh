docker rm calendar-backend --force
docker pull 172.17.21.6:8888/calendar-backend:latest
docker run --name calendar-backend -d -p 3000:3000 -it 172.17.21.6:8888/calendar-backend:latest