# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

# No necesitamos el paquete devDependencies en producción
ENV NODE_ENV production

# Copiar desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts

# Variables de entorno
ENV NEXT_PUBLIC_MONGO_URI_ATLAS=mongodb+srv://nicocontigliani:ch8piRaA4WKxa3hi@clusterllakascript.tv2rm.mongodb.net/
ENV NEXT_PUBLIC_EMAIL_USER=nico.contigliani@gmail.com
ENV NEXT_PUBLIC_EMAIL_PASS=zlhixycegxoeuvdj
ENV NEXT_PUBLIC_RECIPIENT_EMAIL=nico.contigliani@gmail.com
ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCXu9fNEQkwwyKEChptQGTNBHsOyp-IqpE
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=llakascript.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=llakascript
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=llakascript.appspot.com
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=657861850105
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:657861850105:web:0c6ffd20b785715b514328
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-HM967NB15L
ENV NEXT_PUBLIC_SUPABASE_URL=https://bvzjttzvsriwmdokdupp.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2emp0dHp2c3Jpd21kb2tkdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NDI5MDgsImV4cCI6MjA1MDIxODkwOH0.kPXD3qFn0TQehX9FuGKnS4pnurl6aiDkeMb4DUza_2Y
ENV NEXT_SITE_URL=http://localhost:3000
ENV NEXT_REDIRECT_URLS=http://localhost:3000/newbrands
ENV NEXT_MERCADOPAGO_ACCESS_TOKEN=TEST-8057189801655062-031109-91715aca688c59ce07ad0d7f0f4eb298-251251283
ENV NEXT_PUBLIC_JWT_SECRET=Simon
ENV NEXT_PUBLIC_SITE_URL=https://menusitedeveloper.netlify.app/
ENV NEXT_PUBLIC_NODE_ENV=production

# Puerto expuesto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]