import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Inisialisasi koneksi Socket.IO dengan URL server Socket.IO
const socket = io(BASE_URL);

export const initSocket = () => {
  // Koneksikan ke server Socket.IO
  socket.connect();

  // Tangani event jika terjadi koneksi berhasil
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  // Tangani event jika terjadi koneksi gagal
  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error);
  });

  // Kembalikan instance socket untuk digunakan di halaman lain
  return socket;
};