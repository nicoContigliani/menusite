# ==================== ETAPA DE CONSTRUCCIÓN ====================
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Configuración del entorno
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# 2. Copiar archivos de configuración (para caché óptima)
COPY package.json package-lock.json* ./
COPY tsconfig.json ./

# 3. Instalar dependencias con legacy-peer-deps para evitar conflictos
RUN npm ci --legacy-peer-deps --include=dev

# 4. Copiar el resto de archivos
COPY . .

# 5. Solución temporal para newbrands (comentar después de resolver)
RUN mv src/pages/newbrands src/pages/_newbrands_temp || true

# 6. Construir la aplicación
RUN npm run build

# 7. Restaurar newbrands después del build
RUN mv src/pages/_newbrands_temp src/pages/newbrands || true

# ==================== ETAPA DE PRODUCCIÓN ====================
FROM node:18-alpine AS runner

WORKDIR /app

# 1. Configuración de producción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 2. Copiar artefactos de construcción
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./

# 3. Variables de entorno (usar Docker secrets en producción)
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
ENV NEXT_PUBLIC_NODE_ENV=developer

# 4. Configuración de salud
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

# 5. Comando de inicio
CMD ["node", "server.js"]