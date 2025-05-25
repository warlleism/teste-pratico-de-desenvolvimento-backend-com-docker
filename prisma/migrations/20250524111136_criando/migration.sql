-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3),

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
