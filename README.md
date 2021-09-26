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

docker-compose looks for an image and if that image lready exists it doesnt build it again

docker-compose up --build - forces to build a brand new image

docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d

To run two different compose file

```
ARG NODE_ENV
RUN if [ "$NODE_ENV"== "development" ]; \
then npm install; \
else npm install --only==production; \
fi
```

This is needed for telling the Dockerfile which environment we are in, therefore in the docker-compose file we have to pass args in order to specify the respective enviroments (eg: production or development)

--build is important in docker-compose command if we have made changes in dockerfile

docker exec -it < container name > mongo -u "username" -p "password" -> to get inside the db in container

In database container when we give down command all the datas are lost, so to prevent this we use volumes to persist data.
We have to declare the named volume we have used

docker volume prune - deletes all unused volumes, it wont delete the running container volumes.

While connecting to the db container we have to pass the IP address of the container but everytime we restart the container the IP changes so we use DNS and pass the service name instead of the IP address.

- mongoose
  .connect("mongodb://tanay:password@mongo:27017/?authSource=admin")

  docker log < container name> - to see the logs

  We add depends_on: mongo in the node_app serive in docker-compose file so that mongo container spins up first because our node app depends on it.

  If we make changes to our docker-compose file while the containers are running then we dont need to give the down command and again the up command instead we can give the up command again and it will pull up the changes automatically.

  docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build -V

  For creating a new anonymous volume when we install a dependecy because otherwise docker will grab the old anony volume and the new dependencies will not be installed in our node_modules.

![image](assets/arch.png)

Load-Balancing

![image](assets/loadbalancer.png)
