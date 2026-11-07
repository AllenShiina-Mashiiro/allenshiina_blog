CREATE TABLE "AnimeTag" ("animeId" TEXT NOT NULL, "tagId" TEXT NOT NULL, CONSTRAINT "AnimeTag_pkey" PRIMARY KEY ("animeId","tagId"));
CREATE INDEX "AnimeTag_tagId_idx" ON "AnimeTag"("tagId");
ALTER TABLE "AnimeTag" ADD CONSTRAINT "AnimeTag_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "AnimeEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AnimeTag" ADD CONSTRAINT "AnimeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
