docker run -p 3000:3000 -d --name node-app node-app-image

3000:3000

any traffic on port 3000 will be directed to port 3000 in the container

![image](assets/ports.png)

docker exec -it < container-Name > bash - To look at the file system of the conatiner

docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image - Synces the current directory with the app directory in the container using volumes , so everytime we make changes we dont have to build the image

we still need COPY . ./ in the dockerfile despite the bind mount because in production there will be no synced volume.

- Bind Mounts - During development, we want our application’s source code to update within the container whenever we change something. This is achieved by docker using bind mounts which allows our source-code to be accessed and modified by both the running container and the host system. Simply mount your entire source code folder into a docker container and it will pick up the changes (bi-directionally!).

docker run -v $(pwd):/app -p 3000:3000 -d -v /app/node_modules --name node-app node-app-image

To avoid deleting node_modules. It overwrites the bind mount. (for node_modules anonymous volumes is used)

Useful link - https://stackoverflow.com/questions/44976571/docker-anonymous-volumes

If we add /app:ro this will make the container read-only so that the container doesn't make any changes to the host file

docker run -v $(pwd):/app -p 3000:4000 -d -v /app/node_modules -e PORT=4000 --name node-app node-app-image

With -e flag we can overwrite the env variable , and even though we have specified PORT 3000 the node app will run on port 4000, because 3000 is the port our local machine will hit.

printenv - to print the env variable inside the container

--env-file ./.env - to get env variables from the .env file

docker volume prune - deletes all unnecessary volumes

docker-compose file - to automate the process of spinning up the container

docker-compose up -d
Command for docker-compose