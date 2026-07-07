-- CreateIndex
CREATE INDEX "Comment_pictureId_idx" ON "Comment"("pictureId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Picture_collectionId_idx" ON "Picture"("collectionId");
