import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Init1690976199206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(' <-------');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('artists');
    await queryRunner.dropTable('albums');
    await queryRunner.dropTable('tracks');
    await queryRunner.dropTable('favorites');
    await queryRunner.dropTable('favorites_albums_albums');
    await queryRunner.dropTable('favorites_artists_artists');
    await queryRunner.dropTable('favorites_tracks_tracks');
  }
}
