import { MigrationInterface, QueryRunner } from "typeorm";

export class FixWarehouseOrganizationRelation implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. NULL утгатай байгаа бичлэгүүдийг засах
        await queryRunner.query(`
            UPDATE warehouse 
            SET organization_id = 1  -- Анхны organization ID
            WHERE organization_id IS NULL
        `);

        // 2. NOT NULL constraint нэмэх
        await queryRunner.query(`
            ALTER TABLE warehouse 
            ALTER COLUMN organization_id SET NOT NULL
        `);

        // 3. Foreign key constraint нэмэх
        await queryRunner.query(`
            ALTER TABLE warehouse
            ADD CONSTRAINT fk_warehouse_organization
            FOREIGN KEY (organization_id) 
            REFERENCES organization(id)
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE warehouse
            DROP CONSTRAINT IF EXISTS fk_warehouse_organization
        `);
    }
}