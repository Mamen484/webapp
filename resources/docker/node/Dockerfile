FROM node:latest

WORKDIR /var/www

#install java, we need it for crowdin
#RUN echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee /etc/apt/sources.list.d/webupd8team-java.list
#RUN echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
#RUN apt-get update
#RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
#RUN echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections
#RUN apt-get install oracle-java9-installer -y

#install crowdin for translations
#RUN apt-get install apt-transport-https
#RUN wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add -
#RUN echo "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list
#RUN apt-get update
#RUN apt-get install crowdin
