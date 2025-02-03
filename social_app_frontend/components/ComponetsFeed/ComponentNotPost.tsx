import { Image } from "@heroui/react";
import { motion } from "framer-motion";

export default function ComponentNotPost() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 bg-white rounded-lg shadow-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXo0MWtjMDB2enNtZWZqMmsxb3E4azd5NG53NXJkMGE4Ymg4OWkxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xFnyJDPKOcqcH57m7e/giphy.gif"
            alt="Pikachu Animation"
            width={250}
            height={250}
            className="rounded-full"
          />
        </motion.div>
        <motion.h2
          className="text-2xl font-bold mt-6 text-center text-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ¡Ups! No hay publicaciones todavía
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-3 text-center max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Parece que aún no hay publicaciones. ¡Sé el primero en compartir algo emocionante!
        </motion.p>
      </div>
    </>
  )
}
