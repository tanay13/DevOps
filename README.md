docker run -p 3000:3000 -d --name node-app node-app-image

3000:3000

any traffic on port 3000 will be directed to port 3000 in the container

![image](assets/ports.png)

docker exec -it < container-Name > bash - To look at the file system of the conatiner

docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image - Synces the current directory with the app directory in the container using volumes , so everytime we make changes we dont have to build the image

we still need COPY . ./ in the dockerfile despite the bind mount because in production there will be no synced volume.

- Bind Mounts - During development, we want our application’s source code to update within the container whenever we change something. This is achieved by docker using bind mounts which allows our source-code to be accessed and modified by both the running container and the host system. Simply mount your entire source code folder into a docker container and it will pick up the changes (bi-directionally!).
