// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Konfigurasi NextAuth
export const authOptions: AuthOptions = {
  // 1. Provider: Kita pakai Credentials (Login form biasa)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // LOGIKA LOGIN ADA DI SINI
      async authorize(credentials) {
        // --- NANTI BAGIAN INI DIGANTI KONEKSI MYSQL/PRISMA ---
        // Contoh nanti: const user = await prisma.user.findUnique(...)

        // SEMENTARA: Hardcode dulu
        const dummyUser = {
          id: "1",
          name: "Gemi Yudhia",
          email: "user@pilahpintar.com",
          role: "admin", // Bisa tambah properti custom
        };

        if (
          credentials?.email === dummyUser.email &&
          credentials?.password === "123456"
        ) {
          return dummyUser; // Login Berhasil
        }

        return null; // Login Gagal
      },
    }),
  ],
  // 2. Halaman Login Custom (Supaya gak pakai bawaan NextAuth yang jelek)
  pages: {
    signIn: "/login",
  },
  // 3. Secret kunci enkripsi
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Callbacks (Opsional: Jika ingin memasukkan data tambahan ke session)
  callbacks: {
    async session({ session, token }) {
      // Masukkan user id ke session agar bisa diakses di frontend
      if (session?.user) {
        // session.user.id = token.sub; // Perlu extend type definition kalau mau TS strict
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
