FROM node:8

# Create work directory
WORKDIR /usr/src/app

# Remove the version of yarn that is coming with node:8 & Install latest yarn
RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN yarn install

# Build and run the app
CMD npm start serve
