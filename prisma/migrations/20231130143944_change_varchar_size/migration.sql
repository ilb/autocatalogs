/*
  Warnings:

  - You are about to alter the column `name` on the `Model` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to alter the column `code` on the `Model` table. The data in that column could be lost. The data in that column will be cast from `VarChar(70)` to `VarChar(30)`.
  - You are about to alter the column `avitoCode` on the `Model` table. The data in that column could be lost. The data in that column will be cast from `VarChar(70)` to `VarChar(30)`.
  - You are about to alter the column `name` on the `Modification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `code` on the `Modification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `Body` MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `code` VARCHAR(30) NOT NULL,
    MODIFY `avitoCode` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Manufacturer` MODIFY `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Model` MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `code` VARCHAR(30) NOT NULL,
    MODIFY `avitoCode` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `Modification` MODIFY `name` VARCHAR(50) NULL,
    MODIFY `code` VARCHAR(50) NULL;
