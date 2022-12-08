/*
  Warnings:

  - You are about to drop the `_CategoryToVideo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,videoId]` on the table `VideoLike` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_B_fkey";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToVideo";

-- CreateIndex
CREATE UNIQUE INDEX "VideoLike_userId_videoId_key" ON "VideoLike"("userId", "videoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
