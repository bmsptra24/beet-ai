# Gunakan image Node.js sebagai base image
FROM node:18

# Membuat direktori kerja dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Menginstal dependensi proyek
RUN npm install

# Menyalin sumber kode proyek ke dalam container
COPY . .

# Menghasilkan build proyek Next.js
# RUN npm run build

# Menjalankan proyek Next.js saat container dijalankan
CMD ["npm", "run", "dev"]
