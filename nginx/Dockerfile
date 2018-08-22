FROM nginx:stable-alpine

RUN apk update && \
    apk add apache2-utils 
    

ADD conf/nginx.conf /etc/nginx/nginx.conf
ADD etc/local-8000-service.conf /etc/nginx/conf.d/local-8000-service.conf
ADD etc/public-443-service.conf /etc/nginx/conf.d/public-443-service.conf
ADD etc/solr-service.srv /etc/nginx/conf.d/solr-service.srv
ADD etc/api-service.srv /etc/nginx/conf.d/api-service.srv
ADD etc/admin-service.srv /etc/nginx/conf.d/admin-service.srv
ADD etc/app-service.srv /etc/nginx/conf.d/app-service.srv

ADD home/awesome-landing-page /usr/share/nginx/html

ADD script/entrypoint.sh /entrypoint.sh
ADD script/le.sh /le.sh

RUN \
 rm /etc/nginx/conf.d/default.conf && \
 chmod +x /entrypoint.sh && \
 chmod +x /le.sh && \
 apk add  --update certbot tzdata openssl && \
 rm -rf /var/cache/apk/*

RUN ip -4 route list match 0/0 | awk '{print $3 "host.docker.internal"}' >> /etc/hosts

CMD ["/entrypoint.sh"]
