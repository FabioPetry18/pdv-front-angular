FROM node:18-alpine

WORKDIR /app

# Instalar dependências globais
RUN npm install -g @angular/cli

# Copiar apenas os arquivos de configuração primeiro
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install

# Expor a porta que o Angular usa
EXPOSE 4200

# Comando para iniciar o servidor de desenvolvimento com acesso de rede
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--disable-host-check"]