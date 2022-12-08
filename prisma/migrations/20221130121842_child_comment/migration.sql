-- AlterTable
ALTER TABLE "ChildComment" ADD COLUMN     "childCommentId" INTEGER;

-- AddForeignKey
ALTER TABLE "ChildComment" ADD CONSTRAINT "ChildComment_childCommentId_fkey" FOREIGN KEY ("childCommentId") REFERENCES "ChildComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
